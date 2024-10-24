import { SideLabelInput } from "@/components/SideLabelInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TIndividualData } from "./type";
import { searchIndividualSchema, TSearchIndividualSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ColumnsOfIndividualSearch } from "./column";
import { dateToyyyyMMdd, yyyyMMddToDate } from "@/lib/utils";
import { useToDoIndividualAccount } from "./useToDoIndividualAccount";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { setTestCorporateData } from "@/features/corporateTest/corporateTestSlice";
import { store } from "@/app/store";
import { FaBackward, FaForward } from "react-icons/fa";
import { mockedIndividualData } from "./lib/utils";

type TBody = {
    dateFrom: Date | null;
    dateTo: Date | null;
    registerId: string;
  };
  type CustomPaginationProps = {
    rowsPerPage: number;
    rowCount: number;
    onChangePage: (page: number, totalRows: number) => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  }

export default function SearchIndividualAccount() {
  //   if (!isAllowedPage(3001)) {
  //     return <UnAuthorize />;
  //   }

  const prev7Days = new Date();
  prev7Days.setDate(prev7Days.getDate() - 7);

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<TSearchIndividualSchema>({
    resolver: zodResolver(searchIndividualSchema),
    defaultValues: {
      dateFrom: dateToyyyyMMdd(prev7Days),
      // dateFrom: dateToyyyyMMdd(new Date()),
      dateTo: dateToyyyyMMdd(new Date()),
    },
  });

  const updatedMockedIndividualData = Array(100).fill(null).map((_, index) => ({
    ...mockedIndividualData[0],
    registerId: (index + 1).toString(),
    name: `Name ${index + 1}`,
    id: (index + 1).toString(),
  }));

  // console.log("reset:", reset);
  const [curDateSearchBody,setCurDateSearchBody] = useState<TSearchIndividualSchema>();
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchData, setFetchData] = useState<TIndividualData[]>([]);
  const [disableDate, setDisableDate] = useState<boolean>(false);
  const [disableCode, setDisableCode] = useState<boolean>(false);
  const [mockedregisterIds, setFetchedregisterIds] = useState<
      { registerId: string }[]
    >([]);
    const [searchResult, setSearchResult] = useState<TIndividualData>();

    const handleSearch = async (data: TSearchIndividualSchema) => {
      const { dateFrom, dateTo } = data;
      console.log("handle search before formatted : ",data)
      // Set invalid dates to null
      const body: TBody = {
        ...data,
        dateFrom: dateFrom ? yyyyMMddToDate(dateFrom) : null,
        dateTo: dateTo ? yyyyMMddToDate(dateTo, true) : null,
      };
      
      console.log(body);
        try {
          console.log(body);
          let formatBody
          if(body.registerId){
            formatBody = {
              registerId: body.registerId
            }
          }else{
            formatBody = body
            setCurDateSearchBody(data);
            console.log("setCurDateSearchBody:",data)
          }
          console.log("formatBody:",formatBody);
          const res = await axios.post("/api/v1/individual/list", formatBody, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookies()}`,
            },
          });
          setSearchResult(res.data);
          console.log(res);
          return res.data;
        } catch (error) {
          console.log(error);
          if (data.dateFrom === data.dateTo) {
          } else {
            alert("No data found.");
          }
          return null;
        }
    };


  const handleDisableDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDisableDate(true);
    } else {
      setDisableDate(false);
    }
  };
    const fetchregisterIds = async () => {
      try {
        const token = getCookies();

        const res = await axios.post(
          "/api/v1/individual/list/all",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          console.log(res);
          const registerIds = res.data.map((item: any) => ({
            registerId: item.id,
          }));
          setFetchedregisterIds(registerIds);

          // const dateFrom = new Date();
          // dateFrom.setDate(dateFrom.getDate() + 7);
          // const data: TCorporateAccountOpening = {
          //   registerId: "",
          //   // dateFrom: dateToyyyyMMdd(dateFrom),
          //   // dateTo: dateToyyyyMMdd(dateFrom),
          //   dateFrom: dateToyyyyMMdd(new Date()),
          //   dateTo: dateToyyyyMMdd(new Date()),
          // };
          // await handleSearch(data);
        } else {
          console.log("Failed to fetch corporate codes");
        }
      } catch (error) {
        console.log("Error fetching corporate codes:", error);
      }
    };

    const CustomPagination = ({ rowsPerPage, rowCount, onChangePage, currentPage, setCurrentPage }: CustomPaginationProps) => {
        const handleNextPage = () => {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          onChangePage(nextPage, rowCount);
          if (curDateSearchBody) {
            handleSearch({
              registerId: curDateSearchBody.registerId,
              dateFrom: curDateSearchBody.dateFrom,
              dateTo: curDateSearchBody.dateTo,
              page: currentPage + 1
            });
          }
        };
      
        const handlePreviousPage = () => {
          const prevPage = currentPage - 1;
          setCurrentPage(prevPage);
          onChangePage(prevPage, rowCount);
          if (curDateSearchBody) {
            handleSearch({
              registerId: curDateSearchBody.registerId,
              dateFrom: curDateSearchBody.dateFrom,
              dateTo: curDateSearchBody.dateTo,
              page: currentPage - 1
            });
          }
        };
      
        return (
          <div className="m-4 mt-8 flex justify-center items-center space-x-8">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <FaBackward />
            </Button>
            <span>{`Page ${currentPage} of ${Math.ceil(rowCount / rowsPerPage)}`}</span>
            <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(rowCount / rowsPerPage)}>
            <FaForward />
            </Button>
          </div>
        );
      };

  const initData = async () => {
    // await fetchregisterIds();
    const data: TSearchIndividualSchema = {
      registerId: "",
      dateFrom: dateToyyyyMMdd(new Date()),
      dateTo: dateToyyyyMMdd(new Date()),
    };
    store.dispatch(setTestCorporateData(data));
    await handleSearch({...data,page:1});
  };

  useEffect(() => {
    fetchregisterIds();
    // console.log("all-corporate Code", mockedregisterIds);
    initData();
  }, []);

  const handleDisableCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDisableCode(true);
    } else {
      setDisableCode(false);
    }
  };

  const onSubmit = async (data: TSearchIndividualSchema) => {
    console.log(data);
    setCurrentPage(1);
    await handleSearch({...data,page:1});
    //reset();
  };

  useEffect(() => {
    if (searchResult) {
      setFetchData(Array.isArray(searchResult) ? searchResult : [searchResult]);
    }
  }, [searchResult]);

  return (
    <div className="p-4 space-y-10">
      <Card>
        <CardContent>
          <form
            className="grid grid-cols-2 gap-4 pt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SideLabelInput title="Individual ID">
              <Input
                data-testid="registerId"
                {...register("registerId")}
                onChange={handleDisableDate}
                disabled={disableCode}
                list="juristicId"
                autoComplete="off"
              />
              {errors && (
                <p className="text-red-500">{errors.registerId?.message}</p>
              )}
              <datalist id="juristicId">
                {mockedregisterIds.map((code, index) => (
                  <option key={index} value={code.registerId}>
                    {code.registerId}
                  </option>
                ))}
              </datalist>
            </SideLabelInput>
            <div className="col-start-1">
              <SideLabelInput title="Date From">
                <Input
                  data-testid="dateFrom"
                  type="date"
                  {...register("dateFrom")}
                  onChange={handleDisableCode}
                  disabled={disableDate}
                />
                {errors && (
                  <p className="w-full text-red-500 py-1">
                    {errors.dateFrom?.message}
                  </p>
                )}
              </SideLabelInput>
            </div>
            <SideLabelInput title="Date To">
              <Input
                data-testid="dateTo"
                type="date"
                {...register("dateTo")}
                onChange={handleDisableCode}
                disabled={disableDate}
              />
              {errors && (
                <p className="w-full py-1 text-red-500">
                  {errors.dateTo?.message}
                </p>
              )}
            </SideLabelInput>
            <div className="col-start-2 flex justify-end">
              <Button type="submit" data-testid="searchBtn">
                {isSubmitting ? "Search..." : "Search"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Individual Account Infomations</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto h-full">
          <DataTable
           columns={ColumnsOfIndividualSearch}
           data={fetchData} 
            // data = {updatedMockedIndividualData}
           paginationPerPage={20}
           noDataComponent={
            <div className="">
                Loading Data...
            </div>
            }
           pagination
           paginationComponentOptions={{ noRowsPerPage: false }}
           paginationComponent={(props) => (
            <CustomPagination
              {...props}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
            />
        </CardContent>
      </Card>
    </div>
  );
}

import { SideLabelInput } from "@/components/SideLabelInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TCorporateData } from "./constants2/types";
import {
  corporateAccountOpeningSchema,
  TCorporateAccountOpening,
} from "./constants2/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columnsCorporateInfo } from "./components/column";
import { dateToyyyyMMdd, isAllowedPage, yyyyMMddToDate } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { FaBackward, FaForward } from "react-icons/fa";


const CustomLoader = () => (
  <div className="flex justify-center items-center p-4">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="ml-4 text-[#082c14]">Loading...</span>
  </div>
);

type TTodoCorporateAccountOpening = {
  onDataFetched?: (data: any) => void;
};
type TBody = {
    dateFrom: Date | null;
    dateTo: Date | null;
    registerId: string;
    page?:number;
  };
  
type CustomPaginationProps = {
  rowsPerPage: number;
  rowCount: number;
  onChangePage: (page: number, totalRows: number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function SearchChangeCorporateAccount({
  onDataFetched,
}: TTodoCorporateAccountOpening) {
  if (!isAllowedPage(3001)) {
    return <UnAuthorize />;
  }

  const prev7Days = new Date();
  prev7Days.setDate(prev7Days.getDate() - 7);

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<TCorporateAccountOpening>({
    resolver: zodResolver(corporateAccountOpeningSchema),
    defaultValues: {
      dateFrom: dateToyyyyMMdd(prev7Days),
      dateTo: dateToyyyyMMdd(new Date()),
    },
  });

  const [total,setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [curDateSearchBody,setCurDateSearchBody] = useState<TCorporateAccountOpening>();
  const [corporateData, setCorporateData] = useState<TCorporateData[]>([]);
  const [disableDate, setDisableDate] = useState<boolean>(false);
  const [disableCode, setDisableCode] = useState<boolean>(false);
  const [mockedregisterIds, setFetchedregisterIds] = useState<
    { registerId: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResult, setSearchResult] = useState<TCorporateData[]>();

  // const updatedMockedCorporateData = Array(40).fill(null).map((_, index) => ({
  //   ...mockedCorporateData,
  //   registerId: (index + 1).toString(),
  //   Info: {
  //     ...mockedCorporateData.Info,
  //     name: `Name ${index + 1}` 
  //   }
  // }));
  const CustomPagination = ({ rowsPerPage, rowCount, onChangePage, currentPage, setCurrentPage }: CustomPaginationProps) => {
    const handleNextPage = () => {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      onChangePage(nextPage, rowCount);
      setLoading(true);
      if (curDateSearchBody) {
        handleSearch({
          registerId: curDateSearchBody.registerId,
          dateFrom: curDateSearchBody.dateFrom,
          dateTo: curDateSearchBody.dateTo,
          page: currentPage + 1
        }).then(() =>{
            setLoading(false);
        });
      }
    };
  
    const handlePreviousPage = () => {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      onChangePage(prevPage, rowCount);
      setLoading(true);
      if (curDateSearchBody) {
        handleSearch({
          registerId: curDateSearchBody.registerId,
          dateFrom: curDateSearchBody.dateFrom,
          dateTo: curDateSearchBody.dateTo,
          page: currentPage - 1
        }).then(() =>{
            setLoading(false);
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

  const handleSearch = async (data: TCorporateAccountOpening) => {
    const { dateFrom, dateTo } = data;

    // Set invalid dates to null
    const body: TBody = {
      ...data,
      dateFrom: dateFrom ? yyyyMMddToDate(dateFrom) : null,
      dateTo: dateTo ? yyyyMMddToDate(dateTo, true) : null,
    };
      try {
        // console.log(body);
        let formatBody;
        if (body.registerId) {
          formatBody = {
            registerId: body.registerId,
          };
          setTotal(1);
        } else {
            formatBody = body;
            fetchAllRowByTime(body);
            setCurDateSearchBody(data);
            console.log("setCurDateSearchBody:",data)
        }
        console.log("formatBody:", formatBody);
        const res = await axios.post("/api/v1/corporate/query", formatBody, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookies()}`,
          },
        });
        setSearchResult(res.data);
        // console.log(res);
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

  const fetchAllRowByTime = async (data : TBody) => {
    let body = {
      dateFrom : data.dateFrom,
      dateTo : data.dateTo,
    }
    try {
        const res = await axios.post(
            "/api/v1/corporate/total",
            {body},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookies()}`,
              },
            }
          );
        setTotal(res.data.total);        
    }catch(error){
        console.log(error)
    }
  }
  const fetchregisterIds = async () => {
    try {
      const token = getCookies();

      const res = await axios.post(
        "/api/v1/corporate/query/all",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        // console.log(res);
        const registerIds = res.data.map((item: any) => ({
          registerId: item.registerId,
        }));
        setFetchedregisterIds(registerIds);
      }
    } catch (error) {
      console.log("Error fetching corporate codes:", error);
    }
  };

  const initData = async () => {
    await fetchregisterIds();
    const data: TCorporateAccountOpening = {
      registerId: "",
      dateFrom: dateToyyyyMMdd(new Date()),
      dateTo: dateToyyyyMMdd(new Date()),
    };
    setLoading(true);
    await handleSearch({...data,page:1}).then(() =>{
        setLoading(false);
    });
    if (onDataFetched) {
      onDataFetched(JSON.stringify(data));
    }
  };

  useEffect(() => {
    setLoading(true);
    initData().then(() =>{
        setLoading(false);
    });
  }, []);

  const handleDisableCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDisableCode(true);
    } else {
      setDisableCode(false);
    }
  };

  const onSubmit = async (data: TCorporateAccountOpening) => {
    setCurrentPage(1);
    setLoading(true);
    await handleSearch({...data,page:1}).then(() =>{
        setLoading(false);
    });
    //reset();
  };

  useEffect(() => {
    if (searchResult) {
      // setCorporateData(
      //   Array.isArray(searchResult) ? searchResult : [searchResult]
      // );
      setCorporateData(searchResult);
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
            <SideLabelInput title="Juristic ID">
              <Input
                data-testid="juristicId"
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
            <div className="col-start-2 flex space-x-4 justify-end">
              <Button type="submit" data-testid="searchBtn">
                {isSubmitting ? "Search..." : "Search"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Corporates Infomations</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto h-full">
            <DataTable
              className="overflow-scroll"
              columns={columnsCorporateInfo}
              data={corporateData}
            //   data={updatedMockedCorporateData}
              paginationPerPage={20}
              progressComponent={<CustomLoader />}
              progressPending={loading}
              noDataComponent={
                <div className="">
                  No Data Available
                </div>
              }
              pagination
              paginationTotalRows={total}
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

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
import { dateToyyyyMMdd } from "@/lib/utils";
import { useToDoIndividualAccount } from "./useToDoIndividualAccount";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";

export default function TodoIndividualAccount() {
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

  // console.log("reset:", reset);
  const { handleSearch, searchResult } = useToDoIndividualAccount();
  const [fetchData, setFetchData] = useState<TIndividualData[]>([]);
  const [disableDate, setDisableDate] = useState<boolean>(false);
  const [disableCode, setDisableCode] = useState<boolean>(false);
    const [mockedCorporateCodes, setFetchedCorporateCodes] = useState<
      { corporateCode: number }[]
    >([]);

  const handleDisableDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDisableDate(true);
    } else {
      setDisableDate(false);
    }
  };
    const fetchCorporateCodes = async () => {
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
          const corporateCodes = res.data.map((item: any) => ({
            corporateCode: item.id,
          }));
          setFetchedCorporateCodes(corporateCodes);

          // const dateFrom = new Date();
          // dateFrom.setDate(dateFrom.getDate() + 7);
          // const data: TCorporateAccountOpening = {
          //   corporateCode: "",
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

  const initData = async () => {
    // await fetchCorporateCodes();
    const data: TSearchIndividualSchema = {
      AccountID: "",
      dateFrom: dateToyyyyMMdd(new Date()),
      dateTo: dateToyyyyMMdd(new Date()),
    };
    await handleSearch(data);
  };

  useEffect(() => {
    fetchCorporateCodes();
    // console.log("all-corporate Code", mockedCorporateCodes);
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
    await handleSearch(data);
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
                {...register("AccountID")}
                onChange={handleDisableDate}
                disabled={disableCode}
                list="juristicId"
                autoComplete="off"
              />
              {errors && (
                <p className="text-red-500">{errors.AccountID?.message}</p>
              )}
              <datalist id="juristicId">
                {mockedCorporateCodes.map((code, index) => (
                  <option key={index} value={code.corporateCode}>
                    {code.corporateCode}
                  </option>
                ))}
              </datalist>
            </SideLabelInput>
            <div className="col-start-1">
              <SideLabelInput title="Date From">
                <Input
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
              <Button type="submit">
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
        <CardContent className="overflow-x-auto h-[360px]">
          <DataTable columns={ColumnsOfIndividualSearch} data={fetchData} />
        </CardContent>
      </Card>
    </div>
  );
}

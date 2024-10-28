import { SideLabelInput } from "@/components/SideLabelInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TCorporateData } from "@/pages/createJob/changeCorporateAccount/constants2/types";
import {
  corporateAccountOpeningSchema,
  TCorporateAccountOpening} from "../../createJob/changeCorporateAccount/constants2/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { dateToyyyyMMdd, isAllowedPage, yyyyMMddToDate } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import React from 'react'
import { mockedCorporateData } from "./utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCorporateData as setCorporateData2 } from "@/features/editCorporateData/editCorporateData";

type TBody = {
  dateFrom: Date | null;
  dateTo: Date | null;
  registerId: string;
}

const ViewCorporate = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleViewClick = (row: TCorporateData) => {
    dispatch(setCorporateData2(row));
    navigate("/enquiry/corporate/view");
    window.scrollTo(0, 0);
  }

  const columnsCorporateInfo: TableColumn<TCorporateData>[] = [
    {
      name: "Juristic ID",
      selector: (row: TCorporateData) => row.registerId || "",
    },
    {
      name: "Juristic Name",
      selector: (row: TCorporateData) => row.Info?.name || "",
    },
    {
      name: "",
      cell: (row) => (
          <Button
          className="bg-[#082c1c] hover:bg-[#5cc95c] hover:font-bold max-w-[85px] transition-all text-white hover:text-black"
          onClick={() => {
              handleViewClick(row);
          }}
          >
          View
          </Button>
      ),
      ignoreRowClick: true,
      },
  ];

  const customStyles = {
    rows: {
        style: {
            minHeight: '60px', 
        },
    },
    headCells: {
        style: {
        },
    },
    cells: {
        style: {
          
        },
    },
};

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

  const [searchResult, setSearchResult] = useState<TCorporateData[]>();

  const handleSearch = async (data: TCorporateAccountOpening) => {
    const { dateFrom, dateTo } = data;

    // Set invalid dates to null
    const body: TBody = {
      ...data,
      dateFrom: dateFrom ? yyyyMMddToDate(dateFrom) : null,
      dateTo: dateTo ? yyyyMMddToDate(dateTo, true) : null,
    };

    // console.log(body);
    if (
      body.registerId === "" &&
      body.dateFrom === null &&
      body.dateTo === null
    ) {
      try {
        const res = await axios.post(
          "/api/v1/corporate/query/all",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookies()}`,
            },
          }
        );
        setSearchResult(res.data);
        // console.log(res);
        return res.data;
      } catch (error) {
        console.log(error);
        alert("No data found.");
        return null;
      }
    } else {
      try {
        // console.log(body);
        let formatBody;
        if (body.registerId) {
          formatBody = {
            registerId: body.registerId,
          };
        } else {
          formatBody = body;
        }
        // console.log("formatBody:", formatBody);
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
    }
  };
  const [corporateData, setCorporateData] = useState<TCorporateData[]>([]);
  const [disableDate, setDisableDate] = useState<boolean>(false);
  const [disableCode, setDisableCode] = useState<boolean>(false);
  const [mockedregisterIds, setFetchedregisterIds] = useState<
    { registerId: string }[]
  >([]);

  console.log(corporateData)
  
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
    await handleSearch(data);

  };

  useEffect(() => {
    // fetchregisterIds();
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

  const onSubmit = async (data: TCorporateAccountOpening) => {
    // console.log(data);
    await handleSearch(data);
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
          <CardTitle>Corporates Infomations</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto h-[38rem]">
          <DataTable customStyles={customStyles} columns={columnsCorporateInfo} data={mockedCorporateData} />
        </CardContent>
      </Card>
    </div>
  );
}
export default ViewCorporate
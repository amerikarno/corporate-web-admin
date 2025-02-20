import { useState } from "react";
import { TCorporateAccountOpening } from "../constants2/schemas";
import { TCorporateData } from "../constants2/types";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { yyyyMMddToDate } from "@/lib/utils";
// import { useNavigate } from "react-router-dom";
// import { TCorporateAccountOpening } from "../constant/type";

type TBody = {
  dateFrom: Date | null;
  dateTo: Date | null;
  registerId: string;
};
export function useAccountOpening() {
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

  return {
    handleSearch,
    searchResult,
  };
}

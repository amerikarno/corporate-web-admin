import { useState } from "react";
import { TCorporateAccountOpening } from "../constant/schema";
import { TCorporateData } from "../constant/type";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
// import { useNavigate } from "react-router-dom";
// import { TCorporateAccountOpening } from "../constant/type";

type TBody = {
  dateFrom: Date | null;
  dateTo: Date | null;
  corporateCode: string;
};
export function useAccountOpening() {
  const [searchResult, setSearchResult] = useState<TCorporateData>();

  const handleSearch = async (data: TCorporateAccountOpening) => {
    const { dateFrom, dateTo } = data;

    const today = new Date();
    // Set invalid dates to null
    const body: TBody = {
      ...data,
      dateFrom:
        dateFrom instanceof Date && !isNaN(dateFrom.getTime())
          ? dateFrom
          : today,
      dateTo:
        dateTo instanceof Date && !isNaN(dateTo.getTime()) 
        ? dateTo 
        : today,
    };

    if (
      body.corporateCode === "" &&
      body.dateFrom === null &&
      body.dateTo === null
    ) {
      try {
        const res = await axios.post(
          "/api/v1/corporate/query/all",
          {},
          {
            headers: {
              Authorization: `Bearer ${getCookies()}`,
            },
          }
        );
        setSearchResult(res.data);
        console.log(res);
        return res.data;
      } catch (error) {
        console.log(error);
        alert("No data found.");
        return null;
      }
    } else {
      try {
        console.log(body)
        const res = await axios.post("/api/v1/corporate/query", body, {
          headers: {
            Authorization: `Bearer ${getCookies()}`,
          },
        });
        setSearchResult(res.data);
        console.log(res);
        return res.data;
      } catch (error) {
        console.log(error);
        alert("No data found.");
        return null;
      }
    }
  };

  return {
    handleSearch,
    searchResult,
  };
}

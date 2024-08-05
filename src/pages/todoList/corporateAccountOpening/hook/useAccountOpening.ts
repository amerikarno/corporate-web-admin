import { useState } from "react";
import { TCorporateAccountOpening } from "../constant/schema";
import { TCorporateData } from "../constant/type";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
// import { TCorporateAccountOpening } from "../constant/type";

export function useAccountOpening(reset: () => void) {
  const [searchResult, setSearchResult] = useState<TCorporateData>();
  const navigate = useNavigate();

  const handleSearch = async (data: TCorporateAccountOpening) => {
    const { dateFrom, dateTo } = data;

    // Set invalid dates to null
    const body = {
      ...data,
      dateFrom:
        dateFrom instanceof Date && !isNaN(dateFrom.getTime())
          ? dateFrom
          : null,
      dateTo:
        dateTo instanceof Date && !isNaN(dateTo.getTime()) ? dateTo : null,
    };

    try {
      const token = getCookies();
      const res = await axios.post("/api/v1/corporate/query", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchResult(res.data);
      console.log(res);
      reset();
      return res.data;
    } catch (error) {
      console.log(error);
      alert("No data found.");
      return null;
    }
  };

  return {
    handleSearch,
    searchResult,
  };
}

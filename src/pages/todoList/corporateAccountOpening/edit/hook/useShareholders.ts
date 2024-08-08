import { useState } from "react";
import { isExpiredToken } from "@/lib/utils";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { TIndividualsShareholders } from "../constants/types";

export function useShareholders() {
  const [shareholders, setShareholders] = useState<TIndividualsShareholders[]>(
    []
  );
  const handleSubmitShareholders = async (data: TIndividualsShareholders) => {
    if (!isExpiredToken()) {
      await saveIndividualsShareholders(data);
    } else {
      console.log("session expired");
      alert("Session expired. Please login again");
    }
  };

  const saveIndividualsShareholders = async (
    data: TIndividualsShareholders
  ) => {
    let body = {
      fullNames: data.fullNames,
      corporateCode: data.corporateCode ?? "",
      passportId: data.passportId ?? "",
      citizenId: data.citizenId ?? "",
      expiryDate: data.expiryDate.toISOString(),
      nationality: data.nationality,
      sharePercentage: data.sharePercentage,
      types: Number(data.types) ?? 301,
    };
    //console.log("body", body);
    try {
      const token = getCookies();
      const res = await axios.post("/api/v1/personals/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log("request success", res);
        setShareholders([...shareholders, data]);
      } else {
        console.log("save failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    shareholders,
    handleSubmitShareholders,
  };
}

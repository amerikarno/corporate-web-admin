import { useState } from "react";
import { isExpiredToken } from "../libs/utils";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import {
  TBodyFormIndividualsShareholders,
  TIndividualsShareholders,
} from "../constants/types";

export function useShareholders() {
  const [shareholders, setShareholders] = useState<
    TBodyFormIndividualsShareholders[]
  >([]);
  const handleSubmitShareholders = async (data: TIndividualsShareholders) => {
    if (!isExpiredToken()) {
      await saveIndividualsShareholders(data);
    } else {
      console.log("session expired");
    }
  };

  const saveIndividualsShareholders = async (
    data: TIndividualsShareholders
  ) => {
    const dt = new Date(data.expiryDate);
    let body: TBodyFormIndividualsShareholders = {
      fullNames: data.fullNames,
      corporateCode: data.corporateCode ?? "",
      passportId: data.passportId ?? "",
      citizenId: data.citizenId ?? "",
      expiryDate: dt.toISOString(),
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
        setShareholders([...shareholders, body]);
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

import { useState } from "react";
import { formatDateToIsoString, isExpiredToken } from "../libs/utils";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import {
  TBodyFormIndividualsShareholders,
  TIndividualsShareholders,
} from "../constants/types";

export function useShareholders() {
  const [shareholders, setShareholders] = useState<TIndividualsShareholders[]>(
    []
  );
  const handleSubmitShareholders = async (data: TIndividualsShareholders) => {
    if (!isExpiredToken()) {
      await saveIndividualsShareholders(data);
      setShareholders([...shareholders, data]);
    } else {
      console.log("session expired");
    }
  };

  const saveIndividualsShareholders = async (
    data: TIndividualsShareholders
  ) => {
    let body: TBodyFormIndividualsShareholders = {
      fullNames: data.fullNames,
      corporateCode: data.corporateCode ?? "",
      passportID: data.passportID ?? "",
      citizendID: data.citizendId ?? "",
      expiryDate: formatDateToIsoString(new Date(data.expiredDate)),
      nationality: data.nationality,
      sharePercentage: parseFloat(data.sharePercentage),
      types: Number(data.types) ?? 301,
    };
    console.log("body", body);
    try {
      const token = getCookies();
      const res = await axios.post("/api/v1/personals/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      if (res.status === 200) {
        console.log("request success", res.data);
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

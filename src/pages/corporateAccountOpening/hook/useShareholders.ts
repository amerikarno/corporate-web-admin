import { useState } from "react";
import { isExpiredToken } from "../libs/utils";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import {
  TIndividualsShareholders,
} from "../constants/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { addIndividualShareholder } from "@/features/individualShareholder/individualShareholderSlice";

export function useShareholders() {
  const dispatch = useDispatch();
  const individualShareholderData: TIndividualsShareholders[] = useSelector<RootState>((state) => state.contactPerson?.contactPersons || []) as TIndividualsShareholders[];

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
        console.log(res.data.personalId);
        dispatch(addIndividualShareholder({ ...body, personalID: res.data.personalId }));
        console.log(individualShareholderData)
      } else {
        console.log("save failed");
      }
    } catch (error : any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return {

    handleSubmitShareholders,

  };
}

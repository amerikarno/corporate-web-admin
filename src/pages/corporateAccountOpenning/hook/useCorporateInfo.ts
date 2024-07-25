import axios from "@/api/axios";
import { useState } from "react";
import { formatDateToIsoString } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import { jwtDecode } from "jwt-decode";
import { TCorporateInfo } from "../constants/types";

export function useCorporateInfo() {
  const token = getCookies();
  const [corporatesInfo, setCorporatesInfo] = useState<TCorporateInfo[]>([]);
  //TODO: remove key and data after testing
  const [corporateCode, setCorporateCode] = useState<string>(
    "50feb95e-d771-466d-a028-09fcee10065f"
  );

  const handleSubmitCorporateInfo = async (data: TCorporateInfo) => {
    if (!isExpiredToken()) {
      await saveCorporateInfo(data);
    } else {
      console.log("session expired");
    }
  };

  const handleSubmitJuristicType = (data: any) => {
    console.log(data);
  };

  const isExpiredToken = (): boolean => {
    let isExpired = true;
    if (token && token !== null) {
      try {
        const user = jwtDecode(token);

        if (user && user.exp) {
          const dateTime = new Date(user.exp * 1000);
          isExpired = dateTime.getTime() < new Date().getTime();
        } else {
          console.log("Invalid token: exp field is missing.");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
    return isExpired;
  };

  const saveCorporateInfo = async (data: TCorporateInfo) => {
    let body = {
      ...data,
      dateofincorporation: formatDateToIsoString(data.dateofincorporation),
    };
    // console.log("body", body);
    try {
      const res = await axios.post("/api/v1/corporate/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      setCorporatesInfo([...corporatesInfo, data]);
      setCorporateCode(res.data.referenceID);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    corporatesInfo,
    handleSubmitCorporateInfo,
    handleSubmitJuristicType,
  };
}

import { useState } from "react";
import { TBank } from "../constants/types";
import axios from "@/api/axios";
import { formatDateToIsoString } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import { jwtDecode } from "jwt-decode";

type TBankArray = {
  bank:TBank[];
  corporateCode?:string;
}

export function useBank() {
  const [bank, setBank] = useState<TBank[]>([]);

  const token = getCookies();
  const isExpiredToken = (): boolean => {
    let isExpired = true;
    if (token && token !== null) {
      try {
        const user = jwtDecode(token);

        if (user && user.exp) {
          const dateTime = new Date(user.exp * 1000);
          isExpired = dateTime.getTime() > new Date().getTime();
        } else {
          console.log("Invalid token: exp field is missing.");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
    return isExpired;
  };

  const saveBank = async (data: TBankArray) => {
    let body = {
      ...data,
    };
    // console.log("body", body);
    try {
      const res = await axios.post("/api/v1/bank/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      if (res.status === 200) {
        console.log("save successful")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitBank = async (data: TBankArray) => {
    if (!isExpiredToken()) {
      setBank(prevBank => [...prevBank, ...data.bank]);
      await saveBank(data);
    } else {
      console.log("session expired");
    }
  };

  return {
    bank,
    handleSubmitBank,
  };
}

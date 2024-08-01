import { useState } from "react";
import { TBank } from "../constants/types";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { isExpiredToken } from "../libs/utils";

type TBankArray = {
  bank: TBank[];
  corporateCode?: string;
};

export function useBank() {
  const [bank, setBank] = useState<TBank[]>([]);

  const saveBank = async (data: TBankArray) => {
    let body = {
      ...data,
    };
    console.log("body", body);
    try {
      const token = getCookies();
      const res = await axios.post("/api/v1/bank/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      if (res.status === 200) {
        console.log("save successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitBank = async (data: TBankArray) => {
    if (!isExpiredToken()) {
      setBank((prevBank) => [...prevBank, ...data.bank]);
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

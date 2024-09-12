import { TBank } from "../constants2/types";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { isExpiredToken } from "../libs/utils";
import { useDispatch } from "react-redux";
import { addBank, updateBank } from "@/features/bankSlice/bankSlice";

type TBankArray = {
  bank: TBank[];
  CorporateCode?: string;
  BankId?: string;
};

export function useBank() {
  const dispatch = useDispatch();
  const saveBank = async (data: TBankArray) => {
    let body = {
      ...data,
    };
    console.log("body", body);
    try {
      const token = getCookies();

      if (data.BankId) {
        const res = await axios.post("/api/v1/bank/update", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          console.log(res);
          console.log("update success");
          dispatch(updateBank(data));
        } else {
          console.log("update failed");
        }
      } else {
        const res = await axios.post("/api/v1/bank/create", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        if (res.status === 200) {
          console.log(body.BankId);
          console.log(res.data.BankId);
          dispatch(addBank({ ...body, BankId: res.data.BankId }));
          console.log("save successful");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitBank = async (data: TBankArray) => {
    if (!isExpiredToken()) {
      await saveBank(data);
    } else {
      console.log("session expired");
      alert("Session expired. Please login again");
    }
  };

  return {
    handleSubmitBank,
  };
}

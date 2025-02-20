//import { useState } from "react";
import { isExpiredToken } from "../libs/utils";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { TIndividualsShareholders } from "../constants2/types";
import { useDispatch } from "react-redux";
import {
  addIndividualShareholder,
  updateIndividualShareholder,
} from "@/features/individualShareholder/individualShareholderSlice";

export function useShareholders() {
  const token = getCookies();
  const dispatch = useDispatch();

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
      registerId: data.registerId ?? "",
      passportId: data.passportId ?? "",
      citizenId: data.citizenId ?? "",
      expiryDate: data.expiryDate ?? "",
      nationality: data.nationality,
      sharePercentage: data.sharePercentage,
      types: Number(data.types) ?? 301,
      personalId: data.personalId,
    };
    let dataWithStringDate = { ...body, expiryDate: new Date(data.expiryDate ?? "") };
    //console.log("body", body);
    try {
      console.log("sending data to dispatch : ", body);
      console.log("sending data to database : ", dataWithStringDate);
      if (data.personalId) {
        //ถ้าส่งแบบมี personalId แปลว่าเป็นการ update
        const res = await axios.post(
          "/api/v1/personals/update",
          dataWithStringDate,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        if (res.status === 200) {
          console.log("Edit successful");
          dispatch(updateIndividualShareholder(
           { personalId: body.personalId!,
             newPersonalId: res.data.personalId,
             individualShareholder:{...body,sharePercentage: (body.sharePercentage ?? 0)/100000}
        })); //expiryใน body  เป็น date
        } else {
          console.log("Edit failed");
        }
      } else {
        //ถ้าส่งไปแบบไม่มี personalId แปลว่าเป้นการเพิ่มใหม่

        const res = await axios.post(
          "/api/v1/personals/create",
          dataWithStringDate,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 200) {
          console.log("Save successful ", res);

          dispatch(
            addIndividualShareholder({
              ...body,
              personalId: res.data.personalId,
              sharePercentage: (data.sharePercentage ?? 0) / 100000
            })
          );
        } else {
          console.log("Save failed");
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return {
    handleSubmitShareholders,
  };
}

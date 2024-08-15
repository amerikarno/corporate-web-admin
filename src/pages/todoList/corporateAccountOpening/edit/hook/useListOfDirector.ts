import { useState } from "react";
import { TDirector } from "../constants/types";
import { TDirector as TDirectorEdit } from "../../constant/type";
import axios from "@/api/axios";
import {isExpiredToken } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { addDirector, updateDirector } from "@/features/ListOfDirectorSlice/listOfDirectorSlice";

export function useListOfDirector() {
  const dispatch = useDispatch();
  const [directors, setDirectors] = useState<TDirector[]>([]);
  
  const saveListOfDirector = async (data: TDirector) => {
    let body = {
      ...data,
      expiryDate: data.expiryDate.toISOString(),
    };
    console.log("body", body);
    const token = getCookies();
    try {
      console.log("sending data to update : ",{ ...data,personalId: data.personalId ,corporateCode:data.corporateCode})
      if (data.personalId) { //ถ้าส่งแบบมี personalId แปลว่าเป็นการ update
        const res = await axios.post("/api/v1/personals/update", { ...data,personalId: data.personalId ,corporateCode:data.corporateCode}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.status === 200) {
          console.log("Edit successful");
          dispatch(updateDirector(data));
        } else {
          console.log("Edit failed");
        }
      }else{ //ถ้าส่งไปแบบไม่มี personalId แปลว่าเป้นการเพิ่มใหม่
        const res = await axios.post("/api/v1/personals/create", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (res.status === 200) {
          console.log("Save successful ",res);

          dispatch(addDirector({ ...data, personalId: res.data.personalId, expiryDate: data.expiryDate }));
        } else {
          console.log("Save failed");
        }
      }
      }catch (error) {
        console.log("Error:", error);
      }
  };
  const handleSubmitDirectors = async (data: TDirector) => {
    if (!isExpiredToken()) {
      const payload:TDirector = {
        ...data,
        expiryDate: new Date(data.expiryDate),
      };
      await saveListOfDirector(payload);
    } else {
      console.log("session expired");
    }
  };

  return {
    directors,
    handleSubmitDirectors,
    setDirectors,
  };
}

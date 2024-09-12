import { useState } from "react";
import { TAttorney } from "../constants2/types";
import axios from "@/api/axios";
import { isExpiredToken } from "@/lib/utils";
import { getCookies } from "@/lib/Cookies";
import { addAttorney , updateAttorney } from "@/features/attorney/attorney";
//import { RootState } from "@/app/store";
import { useDispatch } from "react-redux";

export function useAttorney() {
  const [attorney, setAttorney] = useState<TAttorney[]>([]);
  const dispatch = useDispatch();

  const saveAttorney = async (data: TAttorney) => {
    let body = {
      ...data,
      expiryDate: new Date(data.expiryDate),
    };
    console.log(body);
    try {
      const token = getCookies();
      
      if(body.personalId){
        const res = await axios.post("/api/v1/personals/update",body,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          console.log(res)
          dispatch(updateAttorney({ ...data, personalId: body.personalId}));
          setAttorney([...attorney, data]);
          console.log("update successful")
        } else {
          console.log("update failed");
        }
      }
      else{
        const res = await axios.post("/api/v1/personals/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        console.log(res.data.personalId);
        dispatch(addAttorney({ ...data, personalId: res.data.personalId }));
        console.log("save successful");
      }
    }
    } catch (error : any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleSubmitAttorney = async (data: TAttorney) => {
    if (!isExpiredToken()) {
      setAttorney([...attorney, data]);
      await saveAttorney(data);
    } else {
      console.log("session expired");
      alert("Session expired. Please login again");
    }
  };
  return {
    attorney,
    handleSubmitAttorney,
    setAttorney
  };
}

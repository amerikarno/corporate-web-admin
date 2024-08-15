import { useState } from "react";
import { TJuristicsShareholders } from "../constants/types";
import { isExpiredToken } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
//import { addIndividualShareholder } from "@/features/individualShareholder/individualShareholderSlice";
import { useDispatch } from "react-redux";
//import { RootState } from "@/app/store";
import { addJuristicShareholder, updateJuristicShareholder } from "@/features/juristicShareholderSlice/juristicShareholderSlice";

export function useJuristicShareholders() {
  const [juristics, setJuristics] = useState<TJuristicsShareholders[]>([]);

  const dispatch = useDispatch();

  const handleSubmitJuristics = async (data: TJuristicsShareholders) => {
    if (!isExpiredToken()) {
      await saveJuristicShareholders(data);
    } else {
      console.log("session expired");
    }
  };

  const saveJuristicShareholders = async (data: TJuristicsShareholders) => {
    try {
      console.log(data);
      const token = getCookies();
      if(data.juristicId){
        const res = await axios.post("/api/v1/juristic/update",data,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          console.log(res)
          console.log("update success", res.data.juristicId);
          dispatch(updateJuristicShareholder({ ...data, juristicId: res.data.juristicId}));
          setJuristics([...juristics, data]);
        } else {
          console.log("update failed");
        }
      }
      else{
        const res = await axios.post("/api/v1/juristic/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        console.log(res)
        console.log("request success", res.data.juristicId);
        dispatch(addJuristicShareholder({ ...data, juristicId: res.data.juristicId}));
        setJuristics([...juristics, data]);
      } else {
        console.log("save failed");
      }
    }
    } catch (error : any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return {
    juristics,
    handleSubmitJuristics,
    setJuristics
  };
}

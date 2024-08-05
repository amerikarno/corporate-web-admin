import { useState } from "react";
import { TJuristicsShareholders } from "../constants/types";
import { isExpiredToken } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";

export function useJuristicShareholders() {
  const [juristics, setJuristics] = useState<TJuristicsShareholders[]>([]);
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
      const res = await axios.post("/api/v1/juristic/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        console.log("request success", res.data);
        setJuristics([...juristics, data]);
      } else {
        console.log("save failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    juristics,
    handleSubmitJuristics,
    setJuristics
  };
}

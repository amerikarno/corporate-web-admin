import { useState } from "react";
import { TDirector } from "../constants/types";
import axios from "@/api/axios";
import { formatDateToIsoString } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import { isExpiredToken } from "../libs/utils";

export function useListOfDirector() {
  const [directors, setDirectors] = useState<TDirector[]>([]);

  
  const saveListOfDirector = async (data: TDirector) => {
    const token = getCookies();
    let body = {
      ...data,
      expiryDate: formatDateToIsoString(data.expiryDate),
    };
    // console.log("body", body);
    try {
      const res = await axios.post("/api/v1/personals/create", body, {
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
  const handleSubmitDirectors = async (data: TDirector) => {
    if (!isExpiredToken()) {
      setDirectors([...directors, data]);
      await saveListOfDirector(data);
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

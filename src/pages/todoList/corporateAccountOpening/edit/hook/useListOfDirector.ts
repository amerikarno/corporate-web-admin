import { useState } from "react";
import { TDirector } from "../constants/types";
import axios from "@/api/axios";
import { isExpiredToken } from "@/lib/utils";
import { getCookies } from "@/lib/Cookies";

export function useListOfDirector() {
  const [directors, setDirectors] = useState<TDirector[]>([]);

  const saveListOfDirector = async (data: TDirector) => {
    let body = {
      ...data,
      expiryDate: data.expiryDate.toISOString(),
    };
    console.log("body", body);
    try {
      const token = getCookies();
      const res = await axios.post("/api/v1/personals/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res);
        console.log("save successful");
        setDirectors([...directors, data]);
      } else {
        console.log("save failed");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitDirectors = async (data: TDirector) => {
    if (!isExpiredToken()) {
      await saveListOfDirector(data);
    } else {
      console.log("session expired");
      alert("Session expired. Please login again");
    }
  };

  return {
    directors,
    handleSubmitDirectors,
    setDirectors,
  };
}

import { useState } from "react";
import { TDirector } from "../constants/types";
import axios from "@/api/axios";
import { formatDateToIsoString } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import { jwtDecode } from "jwt-decode";

export function useListOfDirector() {
  const [directors, setDirectors] = useState<TDirector[]>([]);

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
  const saveListOfDirector = async (data: TDirector) => {
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

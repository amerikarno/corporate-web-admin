import axios from "@/api/axios";
import { TCorporateInfo } from "@/pages/corporate/constants/types";
import { useEffect, useState } from "react";
import { formatDateToIsoString } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import { jwtDecode } from "jwt-decode";

export function useCorporateInfo() {
  const token = getCookies();
  const [corporates, setCorporates] = useState<TCorporateInfo[]>([]);
  const [isExpired, setIsExpired] = useState<boolean>(true);

  const handleSubmitCorporateInfo = async (data: TCorporateInfo) => {
    if (!isExpired) {
      await saveCorporateInfo(data);
      setCorporates([...corporates, data]);
    } else {
      console.log("session expired");
    }
  };

  useEffect(() => {
    if (token && token !== null) {
      try {
        const user = jwtDecode(token);

        if (user && user.exp) {
          const dateTime = new Date(user.exp * 1000);
          const isExpired = dateTime.getTime() < new Date().getTime();
          setIsExpired(isExpired);
        } else {
          console.log("Invalid token: exp field is missing.");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [token]);

  const saveCorporateInfo = async (data: TCorporateInfo) => {
    let body = {
      ...data,
      dateofincorporation: formatDateToIsoString(data.dateofincorporation),
    };
    console.log("body", body);
    try {
      const res = await axios.post("/api/v1/corporate/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    corporates,
    handleSubmitCorporateInfo,
  };
}

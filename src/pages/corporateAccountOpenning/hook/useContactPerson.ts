import { useState } from "react";
import { TContactPerson } from "../constants/types";
import axios from "@/api/axios";
import { formatDateToIsoString } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import { jwtDecode } from "jwt-decode";

type TContactPersonArray = {
  contacts:TContactPerson[];
  corporateCode?:string;
}

export function useContactPerson() {
  const [contact, setContactPerson] = useState<TContactPerson[]>([]);
  
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

  const saveContactPerson = async (data: TContactPersonArray) => {
    let body = {
      ...data,
    };
    // console.log("body", body);
    try {
      const res = await axios.post("/api/v1/corporate/create-contact", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      if (res.status === 200) {
        console.log("save successful")
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmitContactPerson = async (data: TContactPersonArray) => {
    
    if (!isExpiredToken()) {
      setContactPerson(prevContactPerson => [...prevContactPerson, ...data.contacts]);
      await saveContactPerson(data);
    } else {
      console.log("session expired");
    }
  };

  return {
    contact,
    handleSubmitContactPerson,
  };
}

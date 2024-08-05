import { useState } from "react";
import { TContactPerson } from "../constants/types";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { isExpiredToken } from "../libs/utils";

type TContactPersonArray = {
  contacts: TContactPerson[];
  corporateCode?: string;
};

export function useContactPerson() {
  const [contact, setContactPerson] = useState<TContactPerson[]>([]);

  const saveContactPerson = async (data: TContactPersonArray) => {
    let body = {
      ...data,
    };
    console.log("body", body);
    try {
      const token = getCookies();
      const res = await axios.post("/api/v1/corporate/create-contact", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res);
        console.log("save successful");
      } else {
        console.log("save failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitContactPerson = async (data: TContactPersonArray) => {
    if (!isExpiredToken()) {
      setContactPerson((prevContactPerson) => [
        ...prevContactPerson,
        ...data.contacts,
      ]);
      await saveContactPerson(data);
    } else {
      console.log("session expired");
    }
  };

  return {
    contact,
    handleSubmitContactPerson,
    setContactPerson
  };
}

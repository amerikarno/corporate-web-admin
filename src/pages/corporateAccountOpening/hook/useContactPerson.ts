import { useState } from "react";
import { TContactPerson } from "../constants/types";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { isExpiredToken } from "../libs/utils";
import { addContactPerson } from "@/features/contactPersonSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";


type TContactPersonArray = {
  contacts: TContactPerson[];
  corporateCode?: string;
};

export function useContactPerson() {
  const dispatch = useDispatch();
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
        dispatch(addContactPerson({ ...body, personalID: res.data.personalID }));
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


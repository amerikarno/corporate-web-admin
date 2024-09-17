import { TContactPerson } from "../constants/types";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { isExpiredToken } from "../libs/utils";
import {
  addContactPerson,
  updateContactPerson,
} from "@/features/contactPersonSlice";
import { useDispatch } from "react-redux";

type TContactPersonArray = {
  contacts: TContactPerson[];
  corporateCode?: string;
  personalId?: string;
};

export function useContactPerson() {
  const dispatch = useDispatch();

  const saveContactPerson = async (data: TContactPersonArray) => {
    const token = getCookies();

    try {
      console.log("sending data to update : ", data);
      if (data.contacts[0].personalId) {
        //ถ้าส่งแบบมี personalId แปลว่าเป็นการ update
        const res = await axios.post("/api/v1/corporate/update/contact", data, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          console.log("Edit successful");
          dispatch(updateContactPerson({
            personalId: data.contacts[0].personalId,
            newPersonalId: res.data.personalId,
            contactPerson: data.contacts[0],
          }));
        } else {
          console.log("Edit failed");
        }
      } else {
        //ถ้าส่งไปแบบไม่มี personalId แปลว่าเป้นการเพิ่มใหม่
        const res = await axios.post("/api/v1/corporate/create/contact", data, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          console.log("Save successful ", res);

          dispatch(
            addContactPerson({
              ...data.contacts[0],
              personalId: res.data.personalId,
            })
          );
        } else {
          console.log("Save failed");
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmitContactPerson = async (data: TContactPersonArray) => {
    if (!isExpiredToken()) {
      await saveContactPerson(data);
    } else {
      console.log("session expired");
      alert("Session expired. Please login again");
    }
  };

  return {
    handleSubmitContactPerson,
  };
}

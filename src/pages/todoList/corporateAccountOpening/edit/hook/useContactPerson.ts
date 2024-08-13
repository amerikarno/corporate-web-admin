import { TContactPerson } from "../constants/types";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { isExpiredToken } from "../libs/utils";
import { addContactPerson, removeContactPerson } from "@/features/contactPersonSlice";
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
      // if (data.personalId) {
      //   const deleteRes = await axios.post("/api/v1/corporate/delete/contact", { personalId: data.personalId }, {
      //     headers: { Authorization: `Bearer ${token}` },
      //   });
        
      //   if (deleteRes.status === 200) {
      //     console.log("Delete for update successful");
      //     dispatch(removeContactPerson(data.personalId));
      //   } else {
      //     console.log("Delete for update failed");
      //   }
      // }
      
      const res = await axios.post("/api/v1/corporate/create-contact", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        console.log("Save successful");
        dispatch(addContactPerson({ ...data, personalId: res.data.personalId }));
      } else {
        console.log("Save failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmitContactPerson = async (data: TContactPersonArray) => {
    if (!isExpiredToken()) {
      await saveContactPerson(data);
    } else {
      console.log("Session expired");
    }
  };

  return {
    handleSubmitContactPerson,
  };
}

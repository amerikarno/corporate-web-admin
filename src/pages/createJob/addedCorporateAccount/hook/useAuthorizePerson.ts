import { useState } from "react";
import { TAuthorizePerson } from "../constants2/types";
import axios from "@/api/axios";
import { isExpiredToken } from "@/lib/utils";
import { getCookies } from "@/lib/Cookies";
import { addAuthorizedPerson, updateAuthorizedPerson } from "@/features/authorizedPerson/authorizedPersonSlice";
//import { RootState } from "@/app/store";
import { useDispatch } from "react-redux";

export function useAuthorizePerson() {
  const [authorize, setAuthorize] = useState<TAuthorizePerson[]>([]);
  const dispatch = useDispatch();

  const saveAuthorizePerson = async (data: TAuthorizePerson) => {
    let body = {
      ...data,
      expiryDate: new Date(data.expiryDate),
    };
    console.log(body);
    try {
      const token = getCookies();
      
      if(body.personalId){
        const res = await axios.post("/api/v1/personals/update",body,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          console.log(res)
          dispatch(updateAuthorizedPerson({
            personalId: body.personalId,
            newPersonalId: res.data.personalId,
            authorizedPerson:{ ...data, personalId: body.personalId}}));
          setAuthorize([...authorize, data]);
          console.log("update successful")
        } else {
          console.log("update failed");
        }
      }
      else{
        const res = await axios.post("/api/v1/personals/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        console.log(res.data.personalId);
        dispatch(addAuthorizedPerson({ ...data, personalId: res.data.personalId }));
        console.log("save successful");
      }
    }
    } catch (error : any) {
      console.log(error);
      alert(error.response?.data?.message || "An error occurred but can not specify error message");
    }
  };

  const handleSubmitAuthorize = async (data: TAuthorizePerson) => {
    if (!isExpiredToken()) {
      setAuthorize([...authorize, data]);
      await saveAuthorizePerson(data);
    } else {
      console.log("session expired");
      alert("Session expired. Please login again");
    }
  };
  return {
    authorize,
    handleSubmitAuthorize,
    setAuthorize
  };
}

import { useState } from "react";
import { TAuthorizePerson } from "../constants/types";
import axios from "@/api/axios";
import { isExpiredToken } from "@/lib/utils";
import { getCookies } from "@/lib/Cookies";
import { addAuthorizedPerson } from "@/features/authorizedPerson/authorizedPersonSlice";
//import { RootState } from "@/app/store";
import { useDispatch } from "react-redux";

export function useAuthorizePerson() {
  const [authorize, setAuthorize] = useState<TAuthorizePerson[]>([]);
  const dispatch = useDispatch();

  const saveAuthorizePerson = async (data: TAuthorizePerson) => {
    let body = {
      ...data,
    };
    console.log(body);
    try {
      const token = getCookies();
      const res = await axios.post("/api/v1/personals/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        console.log(res.data.personalId);
        dispatch(
          addAuthorizedPerson({ ...body, personalId: res.data.personalId })
        );
        console.log("save successful");
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
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
    setAuthorize,
  };
}

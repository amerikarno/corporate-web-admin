import { useState } from "react";
import { TAuthorizePerson } from "../constants/types";
import axios from "@/api/axios";
import { isExpiredToken } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import { addAuthorizedPerson } from "@/features/authorizedPerson/authorizedPersonSlice";
//import { RootState } from "@/app/store";
import { useDispatch } from "react-redux";

export function useAuthorizePerson() {
  const [authorize, setAuthorize] = useState<TAuthorizePerson[]>([]);
  const dispatch = useDispatch();
  // const isExpiredToken = (): boolean => {
  //   let isExpired = true;
  //   if (token && token !== null) {
  //     try {
  //       const user = jwtDecode(token);

  //       if (user && user.exp) {
  //         const dateTime = new Date(user.exp * 1000);
  //         isExpired = dateTime.getTime() > new Date().getTime();
  //       } else {
  //         console.log("Invalid token: exp field is missing.");
  //       }
  //     } catch (error) {
  //       console.error("Failed to decode token:", error);
  //     }
  //   }
  //   return isExpired;
  // };

  const saveAuthorizePerson = async (data: TAuthorizePerson) => {
    let body = {
      ...data,
      expiryDate:data.expiryDate.toISOString(),
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
        dispatch(addAuthorizedPerson({ ...body, personalId: res.data.personalId }));
        console.log("save successful");
      }
    } catch (error : any) {
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
    }
  };
  return {
    authorize,
    handleSubmitAuthorize,
    setAuthorize
  };
}

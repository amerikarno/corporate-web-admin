import { useState } from "react";
import { TDirector } from "../constants/types";
import { TDirector as TDirectorEdit } from "../../constant/type";
import axios from "@/api/axios";
import { isExpiredToken } from "@/lib/utils";
import { getCookies } from "@/lib/Cookies";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  addDirector,
  updateDirector,
} from "@/features/ListOfDirectorSlice/listOfDirectorSlice";

export function useListOfDirector() {
  const dispatch = useDispatch();
  const [directors, setDirectors] = useState<TDirector[]>([]);

  const saveListOfDirector = async (data: TDirector) => {
    console.log("data", data);
    let body = {
      ...data,
      expiryDate: new Date(data.expiryDate),
    };
    console.log("body", body);
    const token = getCookies();
    try {
      console.log("sending data to update : ", {
        ...data,
        personalId: data.personalId,
        corporateCode: data.corporateCode,
      });
      if (data.personalId) {
        //ถ้าส่งแบบมี personalId แปลว่าเป็นการ update
        const res = await axios.post(
          "/api/v1/personals/update",
          {
            ...body,
            personalId: data.personalId,
            corporateCode: data.corporateCode,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 200) {
          console.log(body.personalId);
          console.log(res.data.personalId);
          console.log("Edit successful");
          dispatch(updateDirector(data));
        } else {
          console.log("Edit failed");
        }
      } else {
        //ถ้าส่งไปแบบไม่มี personalId แปลว่าเป้นการเพิ่มใหม่
        const res = await axios.post("/api/v1/personals/create", body, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          console.log("Save successful ", res);
          console.log("personalId", res.data.personalId);
          console.log({...data,
                      personalId: res.data.personalId
          });
          dispatch(
            addDirector({
              ...data,
              personalId: res.data.personalId,
              expiryDate: data.expiryDate,
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
  const handleSubmitDirectors = async (data: TDirector) => {
    if (!isExpiredToken()) {
      const payload: TDirector = {
        ...data,
        // expiryDate: new Date(data.expiryDate),
      };
      await saveListOfDirector(payload);
    } else {
      console.log("session expired");
      alert("Session expired. Please login again");
    }
  };

  return {
    directors,
    handleSubmitDirectors,
    setDirectors,
  };
}

import { useState } from "react";
import { TDirector } from "../constants/types";
import axios from "@/api/axios";
import { isExpiredToken } from "@/lib/utils";
import { getCookies } from "@/lib/Cookies";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { addDirector } from "@/features/ListOfDirectorSlice/listOfDirectorSlice";

export function useListOfDirector() {
  const dispatch = useDispatch();
  const [directors, setDirectors] = useState<TDirector[]>([]);
  const listOfDirectorData: TDirector[] = useSelector<RootState>(
    (state) => state.listOfDirector?.listOfDirectors || []
  ) as TDirector[];
  const saveListOfDirector = async (data: TDirector) => {
    let body = {
      ...data,
      expiryDate: data.expiryDate.toISOString(),
    };
    console.log("body", body);
    try {
      const token = getCookies();
      const res = await axios.post("/api/v1/personals/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res);
        console.log("save successful");
        dispatch(addDirector({ ...body, personalID: res.data.personalId }));
        console.log(listOfDirectorData);
        setDirectors([...directors, data]);
      } else {
        console.log("save failed");
        console.log(res);
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  const handleSubmitDirectors = async (data: TDirector) => {
    if (!isExpiredToken()) {
      await saveListOfDirector(data);
    } else {
      console.log("session expired");
    }
  };

  return {
    directors,
    handleSubmitDirectors,
    setDirectors,
  };
}

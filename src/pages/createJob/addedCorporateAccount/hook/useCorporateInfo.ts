import { useState } from "react";
import { TCorporateInfo } from "../constants2/types";
import { copy, isExpiredToken } from "@/lib/utils";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { sleep } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";
import { useDispatch } from "react-redux";
import { setCurrentCorporateInfo } from "@/features/currentSelectedCorperate/currentCorperrateInfoSlice";

export function useCorporateInfo() {
  const [corporatesInfo, setCorporatesInfo] = useState<TCorporateInfo[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmitCorporateInfo = async (data: TCorporateInfo) => {
    if (!isExpiredToken()) {
      if (data.registerId === "0" || !data.registerId) {
        await createCorporateInfo(data);
      } else {
        await saveCorporateInfo(data);
      }
    } else {
      console.log("session expired");
      alert("Session expired. Please login again");
    }
  };

  const createCorporateInfo = async (data: TCorporateInfo) => {
    console.log("Input Data:", data);

    let body = {
      ...data,
      dateOfIncorporation: new Date(data.dateOfIncorporation),
    };
    console.log("Request Body:", body);

    try {
      const token = getCookies();
      const createResponse = await axios.post(
        "/api/v1/corporate/create",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(createResponse.data);
      if (createResponse.status !== 200) {
        alert(JSON.stringify(createResponse.data));
        return;
      }

      const newData = { ...data };
      // const registerId = createResponse.data.registerId;
      localStorage.setItem(
        "registerId",
        createResponse.data.registerId.toString()
      );
      const registerId = localStorage.getItem("registerId") || "";
      newData.registerId = registerId;
      console.log("Corporate Data with registerId:", newData);

      const queryResponse = await axios.post(
        "/api/v1/corporate/query",
        { registerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (queryResponse.status === 200 && queryResponse.data.length > 0) {
        dispatch(setCorporateData(queryResponse.data[0]));

        setCorporatesInfo((prev) => [...prev, newData]);
        dispatch(setCurrentCorporateInfo(queryResponse.data[0]));
        // setCurrentCorporatesInfo(newData);

        await sleep(500);
        navigate("/create-job/added-corporate-account/2");
      } else {
        alert("Failed to retrieve corporate data after creation.");
      }
    } catch (error) {
      console.error("Error creating corporate info:", error);
      alert(
        "An error occurred while creating corporate information. Please try again."
      );
    }
  };

  const saveCorporateInfo = async (data: TCorporateInfo) => {
    console.log(data);
    let body = {
      ...data,
      dateOfIncorporation: new Date(data.dateOfIncorporation),
      registerId: data.registerId,
    };
    console.log("body", body);
    try {
      const token = getCookies();
      const res = await axios.post("/api/v1/corporate/update/info", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res);
        let newData = copy(data);
        newData.registerId = res.data.registerId;
        setCorporatesInfo([...corporatesInfo, newData]);
        dispatch(setCurrentCorporateInfo(newData));
        // setCurrentCorporatesInfo(data);
        await sleep(500);
        navigate("/create-job/added-corporate-account/2");
      } else {
        alert(JSON.stringify(res.data));
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return {
    handleSubmitCorporateInfo,
  };
}

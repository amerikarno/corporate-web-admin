import axios from "@/api/axios";
import { useState } from "react";
import { formatDateToIsoString, isExpiredToken } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import { TCorporateInfo } from "../constants/types";
import { jwtDecode } from "jwt-decode";

export function useCorporateInfo() {
  const [corporatesInfo, setCorporatesInfo] = useState<TCorporateInfo[]>([]);
  const [currentCorporatesInfo, setCurrentCorporatesInfo] =
    useState<TCorporateInfo>({
      name: "a",
      registrationNo: "a",
      taxID: "a",
      dateofincorporation: new Date("2024-07-04T00:00:00.000Z"),
      registredBusiness: {
        address :[{
          addressNo: "a",
          building:"a",
          floor:"a",
          mooNo: "a",
          soi: "a",
          road: "a",
          tambon: "a",
          amphoe: "a",
          province: "a",
          postalCode: "a",
          country: "a",
      }],
        emailAddress : "a@gmail.com",
        telephone : "1"
      },
      placeofIncorporation: {
        address : [{
          addressNo: "a",
          building:"a",
          floor:"a",
          mooNo: "a",
          soi: "a",
          road: "a",
          tambon: "a",
          amphoe: "a",
          province: "a",
          postalCode: "a",
          country: "a",
        }],
        emailAddress : "a@gmail.com",
        telephone : "1"
      },
      registeredCapital: 3,
      revenuePerYear: 0,
      netProFitLoss: 0,
      shareholderEquity: 0,
      registered: "Thailand",
      registeredOther: false,
      registeredThailand: true,
      primary: "Thailand",
      primaryCountry: true,
      primaryOther: false,
      corporateCode: "C20240725004",
    });
  //TODO: remove key and data after testing
  const [corporateCode, setCorporateCode] = useState<string>("C20240725004");

  const handleSubmitCorporateInfo = async (data: TCorporateInfo) => {
    if (!isExpiredToken()) {
      await saveCorporateInfo(data);
    } else {
      console.log("session expired");
    }
  };

  const isExpiredToken = (): boolean => {
    let isExpired = true;
    const token = getCookies();
    if (token && token !== null) {
      try {
        const user = jwtDecode(token);

        if (user && user.exp) {
          const dateTime = new Date(user.exp * 1000);
          isExpired = dateTime.getTime() < new Date().getTime();
        } else {
          console.log("Invalid token: exp field is missing.");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
    return isExpired;
  };

  const saveCorporateInfo = async (data: TCorporateInfo) => {
    let body = {
      ...data,
      dateofincorporation: formatDateToIsoString(data.dateofincorporation),
    };
    // console.log("body", body);
    try {
      const token = getCookies();
      const res = await axios.post("/api/v1/corporate/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      if (res.status === 200) {
        data.corporateCode = res.data.referenceID;
        setCorporatesInfo([...corporatesInfo, data]);
        setCorporateCode(res.data.referenceID);
        setCurrentCorporatesInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    corporatesInfo,
    corporateCode,
    currentCorporatesInfo,
    handleSubmitCorporateInfo,
  };
}

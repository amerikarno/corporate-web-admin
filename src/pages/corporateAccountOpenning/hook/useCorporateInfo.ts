import axios from "@/api/axios";
import { useState } from "react";
import { formatDateToIsoString } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import { jwtDecode } from "jwt-decode";
import { TCorporateInfo } from "../constants/types";

export function useCorporateInfo() {
  const token = getCookies();
  const [corporatesInfo, setCorporatesInfo] = useState<TCorporateInfo[]>([]);
  const [currentCorporatesInfo, setCurrentCorporatesInfo] =
    useState<TCorporateInfo>({
      name: "a",
      registrationNo: "a",
      taxID: "a",
      dateofincorporation: new Date("2024-07-04T00:00:00.000Z"),
      registredBusinessAddress: {
        AddressNo: "a",
        Building: "a",
        MooNo: "a",
        Soi: "a",
        Road: "a",
        Tambon: "a",
        Amphoe: "a",
        Province: "a",
        PostalCode: "a",
        Country: "a",
        Floor: "a",
      },
      placeIncorporateAddress: {
        AddressNo: "a",
        Building: "a",
        MooNo: "aa",
        Soi: "aa",
        Road: "a",
        Tambon: "a",
        Amphoe: "a",
        Province: "aa",
        PostalCode: "a",
        Country: "a",
        Floor: "a",
      },
      registeredCapital: 3,
      revenuePerYear: 0,
      netProFitLoss: 0,
      shareholderEquity: 0,
      placeIncorporateEmail: "a@asf.coz",
      placeIncorporateTelephone: "a",
      registredBusinessEmail: "aa@dgsd.com",
      registredBusinessTelephone: "a",
      registered: "Thailand",
      registeredOther: false,
      registeredThailand: true,
      primary: "Thailand",
      primaryCountry: true,
      primaryOther: false,
      corporateCode: "C20240725004",
    });
  //TODO: remove key and data after testing
  const [corporateCode, setCorporateCode] = useState<string>(
    "50feb95e-d771-466d-a028-09fcee10065f"
  );

  const handleSubmitCorporateInfo = async (data: TCorporateInfo) => {
    if (!isExpiredToken()) {
      await saveCorporateInfo(data);
    } else {
      console.log("session expired");
    }
  };

  const isExpiredToken = (): boolean => {
    let isExpired = true;
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

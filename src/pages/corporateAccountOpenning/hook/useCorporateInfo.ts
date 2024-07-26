import axios from "@/api/axios";
import { useState } from "react";
import { formatDateToIsoString, isExpiredToken } from "../libs/utils";
import { getCookies } from "@/lib/Cookies";
import { jwtDecode } from "jwt-decode";
import { TCorporateInfo } from "../constants/types";

export function useCorporateInfo() {
  const [corporatesInfo, setCorporatesInfo] = useState<TCorporateInfo[]>([]);
  const [currentCorporatesInfo, setCurrentCorporatesInfo] =
    useState<TCorporateInfo>({
      name: "a",
      registrationNo: "a",
      taxID: "a",
      dateofincorporation: new Date("2024-07-04T00:00:00.000Z"),
      registredBusinessAddress: {
        addressNo: "a",
        mooNo: "a",
        soi: "a",
        road: "a",
        tambon: "a",
        amphoe: "a",
        province: "a",
        postalCode: "a",
        country: "a",
      },
      placeIncorporateAddress: {
        addressNo: "a",
        mooNo: "aa",
        soi: "aa",
        road: "a",
        tambon: "a",
        amphoe: "a",
        province: "aa",
        postalCode: "a",
        country: "a",
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
  const [corporateCode, setCorporateCode] = useState<string>("C20240725004");

  const handleSubmitCorporateInfo = async (data: TCorporateInfo) => {
    if (!isExpiredToken()) {
      await saveCorporateInfo(data);
    } else {
      console.log("session expired");
    }
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

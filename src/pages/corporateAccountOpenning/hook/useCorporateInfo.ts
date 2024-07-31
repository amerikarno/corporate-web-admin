import axios from "@/api/axios";
import { useState } from "react";
import { getCookies } from "@/lib/Cookies";
import { TCorporateInfo } from "../constants/types";
import { isExpiredToken } from "../libs/utils";

export function useCorporateInfo() {
  const [corporatesInfo, setCorporatesInfo] = useState<TCorporateInfo[]>([]);
  const [currentCorporatesInfo, setCurrentCorporatesInfo] =
    useState<TCorporateInfo>({
      name: "",
      registrationNo: "",
      taxID: "",
      dateofincorporation: new Date(""),
      registeredBusiness: {
        address: [
          {
            addressNo: "",
            building: "",
            floor: "",
            mooNo: "",
            soi: "",
            road: "",
            tambon: "",
            amphoe: "",
            province: "",
            postalCode: "",
            country: "",
          },
        ],
        emailAddress: "",
        telephone: "",
      },
      placeofIncorporation: {
        address: [
          {
            addressNo: "",
            building: "",
            floor: "",
            mooNo: "",
            soi: "",
            road: "",
            tambon: "",
            amphoe: "",
            province: "",
            postalCode: "",
            country: "",
          },
        ],
        emailAddress: "",
        telephone: "",
      },
      registeredCapital: 0,
      revenuePerYear: 0,
      netProFitLoss: 0,
      shareholderEquity: 0,
      registered: "",
      registeredOther: false,
      registeredThailand: true,
      primary: "",
      primaryCountry: true,
      primaryOther: false,
      corporateCode: "",
    });

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
      dateofincorporation: data.dateofincorporation.toISOString(),
    };
    console.log("body", body);
    try {
      const token = getCookies();
      const res = await axios.post("/api/v1/corporate/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      if (res.status === 200) {
        console.log(res)
        data.corporateCode = res.data.referenceID;
        setCorporatesInfo([...corporatesInfo, data]);
        setCurrentCorporatesInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    corporatesInfo,
    currentCorporatesInfo,
    handleSubmitCorporateInfo,
  };
}

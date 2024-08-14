import axios from "@/api/axios";
import { useState } from "react";
import { getCookies } from "@/lib/Cookies";
import { TCorporateInfo } from "../constants/types";
import { isExpiredToken } from "../libs/utils";
import { useNavigate } from "react-router-dom";
import { sleep } from "@/lib/utils";

export function useCorporateInfo() {
  const [corporatesInfo, setCorporatesInfo] = useState<TCorporateInfo[]>([]);
  const [currentCorporatesInfo, setCurrentCorporatesInfo] =
    useState<TCorporateInfo>({
      name: "",
      registrationNo: "",
      taxId: "",
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

  const navigate = useNavigate();
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
        console.log(res);
        data.corporateCode = res.data.corporateCode;
        setCorporatesInfo([...corporatesInfo, data]);
        setCurrentCorporatesInfo(data);
        await sleep(500);
        navigate("/create-job/added-corporate-account/2");
      } else {
        alert("Invalid Input.");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return {
    corporatesInfo,
    currentCorporatesInfo,
    handleSubmitCorporateInfo,
  };
}

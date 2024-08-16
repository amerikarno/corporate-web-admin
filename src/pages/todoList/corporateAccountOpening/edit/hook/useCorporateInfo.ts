import { useState } from "react";
import { TCorporateInfo } from "../constants/types";
import { isExpiredToken } from "@/lib/utils";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { sleep } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleSubmitCorporateInfo = async (data: TCorporateInfo) => {
    if (!isExpiredToken()) {
      await saveCorporateInfo(data);
    } else {
      console.log("session expired");
      alert("Session expired. Please login again");
    }
  };

  const saveCorporateInfo = async (data: TCorporateInfo) => {
    console.log(data);
    let body = {
      ...data,
      dateofincorporation: data.dateofincorporation.toISOString(),
      // corporateCode: Number(
      //   data.corporateCode === "" ? "0" : data.corporateCode
      // ),
      corporateCode: data.corporateCode,
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
        data.corporateCode = res.data.CorporateCode;
        setCorporatesInfo([...corporatesInfo, data]);
        setCurrentCorporatesInfo(data);
        await sleep(500);
        navigate("/todo-list/corporate-account-opening/edit/2");
      } else {
        alert(JSON.stringify(res.data));
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
    setCurrentCorporatesInfo,
    setCorporatesInfo,
  };
}

import axios from "@/api/axios";
import { TCorporateInfo } from "@/pages/corporate/constants/types";
import { useState } from "react";
// import { TCorporateInfo } from "../constants/types";

export function useCorporateInfo() {
  const [corporates, setCorporates] = useState<TCorporateInfo[]>([]);
  const handleSubmitCorporateInfo = async (data: TCorporateInfo) => {
    await saveCorporateInfo();
    setCorporates([...corporates, data]);
  };

  const saveCorporateInfo = async () => {
    try {
      const res = await axios.post("/api/v1/corporate/create", {
        body: corporates,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    corporates,
    handleSubmitCorporateInfo,
  };
}

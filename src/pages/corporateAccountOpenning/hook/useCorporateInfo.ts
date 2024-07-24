import { useState } from "react";
import { TCorporateInfo } from "../constants/types";

export function useCorporateInfo() {
  const [corporates, setCorporates] = useState<TCorporateInfo[]>([]);
  const handleSubmitCorporateInfo = (data: TCorporateInfo) => {
    setCorporates([...corporates, data]);
  };

  return {
    corporates,
    handleSubmitCorporateInfo,
  };
}

import { useState } from "react";
import { TCorporateAccountOpening } from "../constant/schema";
// import { TCorporateAccountOpening } from "../constant/type";

export function useAccountOpening(reset: () => void) {
  const [searchParams, setSearchParams] = useState<TCorporateAccountOpening>();
  const [queryParams, setQueryParams] = useState<TCorporateAccountOpening>();

  const handleSearch = (data: TCorporateAccountOpening) => {
    console.log(data);
    setSearchParams(data);
    reset();
  };

  return {
    handleSearch,
  };
}

import { useState } from "react";
import { TAuthorizePerson } from "@/pages/corporate/constants/types";

export function useAuthorizePerson() {
  const [authorize, setAuthorize] = useState<TAuthorizePerson[]>([]);
  const handleSubmitAuthorize = (data: TAuthorizePerson) => {
    setAuthorize([...authorize, data]);
  };

  return {
    authorize,
    handleSubmitAuthorize,
  };
}

import { useState } from "react";
import { TBank } from "@/pages/corporate/constants/types";

export function useBank() {
  const [bank, setBank] = useState<TBank[]>([]);
  const handleSubmitBank = (data: TBank) => {
    setBank([...bank, data]);
  };

  return {
    bank,
    handleSubmitBank,
  };
}

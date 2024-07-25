import { useState } from "react";
import { TJuristicsShareholders } from "@/pages/corporate/constants/types";

export function useJuristicShareholders() {
  const [juristics, setJuristics] = useState<TJuristicsShareholders[]>([]);
  const handleSubmitJuristics = (data: TJuristicsShareholders) => {
    setJuristics([...juristics, data]);
  };

  return {
    juristics,
    handleSubmitJuristics,
  };
}

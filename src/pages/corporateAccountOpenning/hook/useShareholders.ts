import { useState } from "react";
import { TIndividualsShareholders } from "../constants/types";

export function useShareholders() {
  const [shareholders, setShareholders] = useState<TIndividualsShareholders[]>(
    []
  );
  const handleSubmitShareholders = (data: TIndividualsShareholders) => {
    setShareholders([...shareholders, data]);
  };

  return {
    shareholders,
    handleSubmitShareholders,
  };
}

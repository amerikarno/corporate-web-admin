import { useState } from "react";
import { TIndividualsShareholders } from "../constants/types";
import { individualShareholder } from "../constants/initialData";
import { copy } from "@/lib/utils";

export function useFormIndividualsShareholder() {
  const [shareholders, setShareholders] = useState<TIndividualsShareholders[]>(
    []
  );
  const [individualsShareholder, setIndividualsShareholder] =
    useState<TIndividualsShareholders>(copy(individualShareholder));

  const removeIndividualsShareholders = (index: number) => {
    const newShareholders = shareholders.filter((_, i) => i !== index);
    setShareholders(newShareholders);
  };

  const editIndividualsShareholders = (index: number) => {
    console.log(shareholders[index]);
    setIndividualsShareholder(shareholders[index]);
  };

  const handleSetNewShareholder = (data: TIndividualsShareholders) => {
    setShareholders([...shareholders, data]);
  };

  const mapShareholderData = (shareholder: TIndividualsShareholders) => {
    return {
      nameSurname: `${shareholder.title} ${shareholder.firstName} ${shareholder.lastName}`,
      idCard: shareholder.idCard,
      expiredDate: new Date(shareholder.expiredDate).toLocaleDateString(),
      nationality: shareholder.nationality,
      shares: shareholder.shares,
    };
  };

  const serializeData = (shareholders: TIndividualsShareholders[]) => {
    let data = [];
    for (let i = 0; i < shareholders.length; i++) {
      data.push(mapShareholderData(shareholders[i]));
    }
    return data;
  };

  return {
    shareholders,
    individualsShareholder,
    removeIndividualsShareholders,
    editIndividualsShareholders,
    handleSetNewShareholder,
    serializeData,
  };
}

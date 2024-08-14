import { useState } from "react";
import { TIndividualsShareholders } from "../constants/types";
//import { individualShareholder } from "../constants/initialData";

export function useFormIndividualsShareholder() {
  const [shareholders, setShareholders] = useState<TIndividualsShareholders[]>(
    []
  );
  // const [individualsShareholder, setIndividualsShareholder] =
  //   useState<TIndividualsShareholders>(copy(individualShareholder));

  // const removeIndividualsShareholders = (index: number) => {
  //   const newShareholders = shareholders.filter((_, i) => i !== index);
  //   setShareholders(newShareholders);
  // };

  // const editIndividualsShareholders = (index: number) => {
  //   console.log(shareholders[index]);
  //   setIndividualsShareholder(shareholders[index]);
  // };

  // const handleSetNewShareholder = (data: TIndividualsShareholders) => {
  //   setShareholders([...shareholders, data]);
  // };

  // const mapShareholderData = (shareholder: TIndividualsShareholders,i : number) => {
  //   return {
  //     fullNames: `${shareholder.fullNames[i].title} ${shareholder.fullNames[i].firstName} ${shareholder.fullNames[i].lastName}`,
  //     idCard: shareholder.idCard,
  //     passportID: shareholder.passportID,
  //     expiredDate: new Date(shareholder.expiredDate).toLocaleDateString(),
  //     nationality: shareholder.nationality,
  //     sharePercentage: shareholder.sharePercentage,
  //   };
  // };

  // const serializeData = (shareholders: TIndividualsShareholders[]) => {
  //   let data = [];
  //   for (let i = 0; i < shareholders.length; i++) {
  //     data.push(mapShareholderData(shareholders[i],i));
  //   }
  //   return data;
  // };

  return {
    shareholders,
    setShareholders,
    //individualsShareholder,
    // removeIndividualsShareholders,
    // editIndividualsShareholders,
    // handleSetNewShareholder,
    // serializeData,
  };
}

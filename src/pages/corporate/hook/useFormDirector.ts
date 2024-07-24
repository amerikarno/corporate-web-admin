import { useState } from "react";
import { TDirector } from "../constants/types";
//import { individualDirector } from "../constants/initialData";
import { copy } from "@/lib/utils";

export function useFormIndividualsDirector() {
  const [directors, setDirectors] = useState<TDirector[]>(
    []
  );
  // const [individualsDirector, setIndividualsContact] =
  //   useState<TDirector>(copy(individualDirector));

//   const removeIndividualsShareholders = (index: number) => {
//     const newShareholders = shareholders.filter((_, i) => i !== index);
//     setShareholders(newShareholders);
//   };

//   const editIndividualsShareholders = (index: number) => {
//     console.log(shareholders[index]);
//     setIndividualsShareholder(shareholders[index]);
//   };

//   const handleSetNewShareholder = (data: TIndividualsShareholders) => {
//     setShareholders([...shareholders, data]);
//   };

//   const mapShareholderData = (shareholder: TIndividualsShareholders) => {
//     return {
//       nameSurname: `${shareholder.title} ${shareholder.firstName} ${shareholder.lastName}`,
//       idCard: shareholder.idCard,
//       expiredDate: new Date(shareholder.expiredDate).toLocaleDateString(),
//       nationality: shareholder.nationality,
//       shares: shareholder.shares,
//     };
//   };

//   const serializeData = (shareholders: TIndividualsShareholders[]) => {
//     let data = [];
//     for (let i = 0; i < shareholders.length; i++) {
//       data.push(mapShareholderData(shareholders[i]));
//     }
//     return data;
//   };

  return {
    directors,
    //individualsDirector,
    // removeIndividualsShareholders,
    // editIndividualsShareholders,
    // handleSetNewShareholder,
    // serializeData,
  };
}

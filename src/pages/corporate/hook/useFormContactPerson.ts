import { useState } from "react";
import { TContactPerson } from "../constants/types";
import { individualContact } from "../constants/initialData";
import { copy } from "@/lib/utils";

export function useFormIndividualsContactPerson() {
  const [contacts, setContacts] = useState<TContactPerson[]>([]);
  const [individualsContact, setIndividualsContact] = useState<TContactPerson>(
    copy(individualContact)
  );

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
    contacts,
    individualsContact,
    setContacts,
    setIndividualsContact,
    // removeIndividualsShareholders,
    // editIndividualsShareholders,
    // handleSetNewShareholder,
    // serializeData,
  };
}

import { useState } from "react";
import { TContactPerson } from "../constants/types";

export function useContactPerson() {
  const [contact, setContactPerson] = useState<TContactPerson[]>([]);
  const handleSubmitContactPerson = (data: TContactPerson) => {
    setContactPerson([...contact, data]);
  };

  return {
    contact,
    handleSubmitContactPerson,
  };
}

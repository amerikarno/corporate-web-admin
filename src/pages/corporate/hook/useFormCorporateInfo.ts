import { useState } from "react";
import { copy } from "@/lib/utils";
import { TCorporateTypeAndIncome } from "../constants/types";
import { emptyCorporateTypeAndIncome } from "../constants/initialData";
import { boolean, z, ZodIssue } from "zod";
import { corporateTypeAndIncomeSchema } from "../constants/schemas";

export function useFormCorporateInfo() {

    const [isRegisteredCountryOfOperation,setIsRegisteredCountryOfOperation] = 
    useState<boolean>(false);


    const handleErrors = (error: ZodIssue[] | null) => {
        setErrors(error);
      };


    const getError = (
        keyName: string[],
        errors: ZodIssue[] | null
      ): ZodIssue | null => {
        if (errors === null) return null;
    
        return (
          errors.find((error) =>
            keyName.every((key) => error.path!.map(String).includes(key))
          ) || null
        );
      };

    return(

    )
}
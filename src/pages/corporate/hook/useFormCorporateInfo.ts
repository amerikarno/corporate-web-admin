import { useState } from "react";
import { copy } from "@/lib/utils";
import { TRegisteredCountryPrimaryCountryOperation } from "../constants/types";
import { emptyRegisteredCountryPrimaryCountryOperation } from "../constants/initialData";
import { boolean, z, ZodIssue } from "zod";
import { registeredCountryPrimaryCountryOperationSchema } from "../constants/schemas";

export function useFormCorporateInfo() {
    const [registeredCountryPrimaryCountryOperation, setRegisteredCountryPrimaryCountryOperation] =
    useState<TRegisteredCountryPrimaryCountryOperation>(emptyRegisteredCountryPrimaryCountryOperation);
    const [isRegisteredCountryOthers,setIsRegisteredCountryOthers] = 
    useState<boolean>(false);
    useState<TRegisteredCountryPrimaryCountryOperation>(emptyRegisteredCountryPrimaryCountryOperation);
    const [isPrimaryCountryOfOperationOthers,setIsPrimaryCountryOfOperationOthers] = 
    useState<boolean>(false);

    const [form1error, setErrors] = useState<ZodIssue[] | null>(null);

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
    const handleRegisteredCountryOthers = (e: any) => {
      const { name, checked } = e.target;
        let tmp = copy(registeredCountryPrimaryCountryOperation);
        // tmp.registeredCountryPrimaryCountryOperation = checked ? name : "";
        if (checked) {
          tmp.registeredCountry = name;
          form1error ? validateLocal(tmp) : null;
        } else {
          tmp.registeredCountry = "";
        }
        setRegisteredCountryPrimaryCountryOperation(tmp);
        if (name == "Others Countries (Please Specify)") {
          setIsRegisteredCountryOthers(checked);
        }
        // errors ? validateLocal(tmp) : null;
    };
    const handleInputRegisteredCountryOthers= (e: any) => {
      const { value } = e.target;
      let tmp = copy(registeredCountryPrimaryCountryOperation);
      tmp.registeredCountry = value;
      setRegisteredCountryPrimaryCountryOperation(tmp);
      form1error ? validateLocal(tmp) : null;
    };
    const handlePrimaryCountryOfOperationOthers = (e: any) => {
      const { name, checked } = e.target;
        let tmp = copy(registeredCountryPrimaryCountryOperation);
        // tmp.registeredCountryPrimaryCountryOperation = checked ? name : "";
        if (checked) {
          tmp.primaryCountryOfOperation = name;
          form1error ? validateLocal(tmp) : null;
        } else {
          tmp.primaryCountryOfOperation = "";
        }
        setRegisteredCountryPrimaryCountryOperation(tmp);
        if (name == "Others Countries (Please Specify)") {
          setIsPrimaryCountryOfOperationOthers(checked);
        }
        // errors ? validateLocal(tmp) : null;
    };
    const handleInputPrimaryCountryOfOperationOthers= (e: any) => {
      const { value } = e.target;
      let tmp = copy(registeredCountryPrimaryCountryOperation);
      tmp.primaryCountryOfOperation = value;
      setRegisteredCountryPrimaryCountryOperation(tmp);
      form1error ? validateLocal(tmp) : null;
    };
    const disableRegisteredCountry = (type: string): boolean => {
      if (registeredCountryPrimaryCountryOperation.registeredCountry !== "") {
        if (type === registeredCountryPrimaryCountryOperation.registeredCountry) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    };
    const disablePrimaryCountryOfOperation = (type: string): boolean => {
      if (registeredCountryPrimaryCountryOperation.primaryCountryOfOperation !== "") {
        if (type === registeredCountryPrimaryCountryOperation.primaryCountryOfOperation) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    };

    const validateForm = (): boolean => {
      try {
        registeredCountryPrimaryCountryOperationSchema.parse(registeredCountryPrimaryCountryOperation);
        return true;
      } catch (e) {
        if (e instanceof z.ZodError) {
          handleErrors(e.errors);
        } else {
          console.log(e);
        }
        return false;
      }
    };

    const validateLocal = (obj: TRegisteredCountryPrimaryCountryOperation) => {
      try {
        registeredCountryPrimaryCountryOperationSchema.parse(obj);
        handleErrors(null);
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.log(e.errors);
          handleErrors(e.errors);
        } else {
          console.log(e);
        }
      }
    };
    const handleInputOthers = (e: any, name: string) => {
      switch (name) {
        case "registeredCountry":
          handleInputRegisteredCountryOthers(e);
          break;

        case "primaryCountryOfOperation":
          handleInputPrimaryCountryOfOperationOthers(e);
          break;
        
        default:
          break;
      }
    };
    return{
      disablePrimaryCountryOfOperation,
      disableRegisteredCountry,
      handlePrimaryCountryOfOperationOthers,
      handleRegisteredCountryOthers,
      getError,
      form1error,
      isPrimaryCountryOfOperationOthers,
      isRegisteredCountryOthers,
      registeredCountryPrimaryCountryOperation,
      validateForm,
      handleInputOthers
    };
}
import { useState } from "react";
import { copy } from "@/lib/utils";
import { TRegisteredCountryPrimaryCountryOperation } from "../constants/types";
import { emptyRegisteredCountryPrimaryCountryOperation } from "../constants/initialData";
import { boolean, z, ZodIssue } from "zod";
import { registeredCountryPrimaryCountryOperationSchema } from "../constants/schemas";
import { registeredCountryKey , PrimaryCountryOfOperationKey} from "../constants/const_variables";
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
          tmp.registered = name;
          tmp.registeredThailand = true;
          tmp.registeredOther = false;
          form1error ? validateLocal(tmp) : null;
        } else {
          tmp.registered = "";
          tmp.registeredThailand = false;
          tmp.registeredOther = true;
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
      tmp.registered = value;
      tmp.registeredThailand = false;
      tmp.registeredOther = true;
      setRegisteredCountryPrimaryCountryOperation(tmp);
      form1error ? validateLocal(tmp) : null;
    };
    const handlePrimaryCountryOfOperationOthers = (e: any) => {
      const { name, checked } = e.target;
        let tmp = copy(registeredCountryPrimaryCountryOperation);
        // tmp.registeredCountryPrimaryCountryOperation = checked ? name : "";
        if (checked) {
          tmp.primary = name;
          tmp.primaryCountry = true;
          tmp.primaryOther = false;
          form1error ? validateLocal(tmp) : null;
        } else {
          tmp.primary = "";
          tmp.primaryCountry = false;
          tmp.primaryOther = true;
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
      tmp.primary = value;
      tmp.primaryCountry = false
      setRegisteredCountryPrimaryCountryOperation(tmp);
      form1error ? validateLocal(tmp) : null;
    };
    const disableRegisteredCountry = (type: string): boolean => {
      if (registeredCountryPrimaryCountryOperation.registered !== "") {
        if (type === registeredCountryPrimaryCountryOperation.registered) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    };
    const disablePrimaryCountryOfOperation = (type: string): boolean => {
      console.log(registeredCountryPrimaryCountryOperation)
      if (registeredCountryPrimaryCountryOperation.primary !== "") {
        if (type === registeredCountryPrimaryCountryOperation.primary) {
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
        case "registered":
          handleInputRegisteredCountryOthers(e);
          break;

        case "primary":
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
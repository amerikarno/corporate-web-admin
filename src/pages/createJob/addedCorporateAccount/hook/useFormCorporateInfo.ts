import { useState } from "react";
import { copy } from "@/lib/utils";
import { TRegisteredCountryPrimaryCountryOperation } from "../constants2/types";
import { emptyRegisteredCountryPrimaryCountryOperation } from "../constants2/initialData";
import { z, ZodIssue } from "zod";
import { registeredCountryPrimaryCountryOperationSchema } from "../constants2/schemas";
import { TCorporateData } from "@/pages/todoList/corporateAccountOpening/constant/type";

export function useFormCorporateInfo(corporatesInfo?: TCorporateData) {
  let resCorpRegisterCountry = corporatesInfo?.CorporateCountry.find(
    (item) => item.types === 601
  );
  let resCorpPrimaryCountry = corporatesInfo?.CorporateCountry.find(
    (item) => item.types === 602
  );

  const initCountryData = {
    registered: resCorpRegisterCountry?.other || "",
    isRegisteredThailand: resCorpRegisterCountry
      ? resCorpRegisterCountry.isThailand
      : false,
    isRegisteredOther: resCorpRegisterCountry
      ? !resCorpRegisterCountry.isThailand
      : false,
    primary: resCorpPrimaryCountry?.other || "",
    isPrimaryCountry: resCorpPrimaryCountry
      ? resCorpPrimaryCountry.isThailand
      : false,
    isPrimaryOther: resCorpPrimaryCountry
      ? !resCorpPrimaryCountry.isThailand
      : false,
  };

  const [
    registeredCountryPrimaryCountryOperation,
    setRegisteredCountryPrimaryCountryOperation,
  ] = useState<TRegisteredCountryPrimaryCountryOperation>(
    corporatesInfo
      ? initCountryData
      : emptyRegisteredCountryPrimaryCountryOperation
  );

  const [isRegisteredCountryOthers, setIsRegisteredCountryOthers] =
    useState<boolean>(resCorpPrimaryCountry?.isThailand ? false : true);
  // useState<boolean>(false);

  useState<TRegisteredCountryPrimaryCountryOperation>(
    corporatesInfo
      ? initCountryData
      : emptyRegisteredCountryPrimaryCountryOperation
  );
  const [
    isPrimaryCountryOfOperationOthers,
    setIsPrimaryCountryOfOperationOthers,
  ] = useState<boolean>(resCorpPrimaryCountry?.isThailand ? false : true);
  // ] = useState<boolean>(false);

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

    if (name === "Thailand") {
      tmp.registered = checked ? name : "";
      tmp.isRegisteredThailand = checked;
      tmp.isRegisteredOther = false;
    } else if (name === "Others Countries (Please Specify)") {
      tmp.registered = "";
      tmp.isRegisteredThailand = false;
      tmp.isRegisteredOther = checked;
    }

    setRegisteredCountryPrimaryCountryOperation(tmp);
    if (name == "Others Countries (Please Specify)") {
      setIsRegisteredCountryOthers(checked);
    }
  };
  const handleInputRegisteredCountryOthers = (e: any) => {
    const { value } = e.target;
    let tmp = copy(registeredCountryPrimaryCountryOperation);
    tmp.registered = value;
    tmp.isRegisteredThailand = false;
    tmp.isRegisteredOther = true;
    setRegisteredCountryPrimaryCountryOperation(tmp);
    // form1error ? validateLocal(tmp) : null;
    validateLocal(tmp);
    console.log(tmp);
  };
  const handlePrimaryCountryOfOperationOthers = (e: any) => {
    const { name, checked } = e.target;
    let tmp = copy(registeredCountryPrimaryCountryOperation);
    if (name === "Thailand") {
      tmp.primary = checked ? name : "";
      tmp.isPrimaryCountry = checked;
      tmp.isPrimaryOther = false;
    } else {
      tmp.primary = "";
      tmp.isPrimaryCountry = false;
      tmp.isPrimaryOther = checked;
    }
    setRegisteredCountryPrimaryCountryOperation(tmp);
    if (name == "Others Countries (Please Specify)") {
      setIsPrimaryCountryOfOperationOthers(checked);
    }
    validateLocal(tmp);
  };
  const handleInputPrimaryCountryOfOperationOthers = (e: any) => {
    const { value } = e.target;
    let tmp = copy(registeredCountryPrimaryCountryOperation);
    tmp.primary = value;
    tmp.isPrimaryCountry = false;
    setRegisteredCountryPrimaryCountryOperation(tmp);
    validateLocal(tmp);
  };

  const validateForm = (): boolean => {
    try {
      registeredCountryPrimaryCountryOperationSchema.parse(
        registeredCountryPrimaryCountryOperation
      );
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
  return {
    // disablePrimaryCountryOfOperation,
    // disableRegisteredCountry,
    handlePrimaryCountryOfOperationOthers,
    handleRegisteredCountryOthers,
    getError,
    form1error,
    isPrimaryCountryOfOperationOthers,
    isRegisteredCountryOthers,
    registeredCountryPrimaryCountryOperation,
    validateForm,
    handleInputOthers,
  };
}

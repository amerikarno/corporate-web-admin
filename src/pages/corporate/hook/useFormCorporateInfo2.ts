import { copy } from "@/lib/utils";
import {
  businessTypeKey,
  countrySourceOfIncomeKey,
  investmentObjectiveKey,
  juristicForeignKey,
  juristicOthersKey,
  juristicThaiKey,
  juristicTypeKey,
  sourceOfIncomeKey,
  juristicType,
} from "../constants/const_variables";
import { useState } from "react";
import {
  TCorporateTypeAndIncome,
  TInitailJuristicOther,
  TInitailJuristicTypeAndIncome,
} from "../constants/types";
import {
  emptyCorporateTypeAndIncome,
  initailJuristicOther,
  initailJuristicTypeAndIncome,
} from "../constants/initialData";
import { z, ZodIssue } from "zod";
import { corporateTypeAndIncomeSchema } from "../constants/schemas";

export function useFormCorporateInfo2() {
  const [corporateTypeAndIncome, setCorporateTypeAndIncome] =
    useState<TCorporateTypeAndIncome>(emptyCorporateTypeAndIncome);
  const [isBusinessTypeOthers, setIsBusinessTypeOthers] =
    useState<boolean>(false);
  const [isSourceOfIncomeOthers, setIsSourceOfIncomeOthers] =
    useState<boolean>(false);
  const [isCountrySourceOfIncomeOthers, setIsCountrySourceOfIncomeOthers] =
    useState<boolean>(false);
  const [isInvestmentObjectiveOthers, setIsInvestmentObjectiveOthers] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<ZodIssue[] | null>(null);
  const [juristicAllType, setJuristicAllType] =
    useState<TInitailJuristicTypeAndIncome>(copy(initailJuristicTypeAndIncome));
  const [juristicAllOtherType, setJuristicAllOhterType] =
    useState<TInitailJuristicOther>(copy(initailJuristicOther));

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

  const disableBusinessType = (type: string): boolean => {
    if (corporateTypeAndIncome.businessType !== "") {
      if (type === corporateTypeAndIncome.businessType) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const disableCountrySourceOfIncome = (type: string): boolean => {
    if (corporateTypeAndIncome.countrySourceOfIncome !== "") {
      if (type === corporateTypeAndIncome.countrySourceOfIncome) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const disableInvestmentObjective = (type: string): boolean => {
    if (corporateTypeAndIncome.InvestmentObject !== "") {
      if (type === corporateTypeAndIncome.InvestmentObject) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const isDiabledJuristicType = (type: string): boolean => {
    if (corporateTypeAndIncome.juristicType !== "") {
      if (type === corporateTypeAndIncome.juristicType) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const isDisableSubSelected = (type: string): boolean => {
    if (corporateTypeAndIncome.juristicType !== type) {
      return true;
    } else {
      return false;
    }
  };

  const handleCheck = (e: any, i: number) => {
    const { name, checked } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    tmp.juristicType = checked ? name : "";
    const updateKey = juristicTypeKey[i];
    setJuristicAllType({ ...juristicAllType, [updateKey]: checked });
    if (checked) {
      tmp.juristicType = name;
      errors ? validateLocal(tmp) : null;
    } else {
      tmp.juristicType = "";
    }
    setCorporateTypeAndIncome(tmp);
  };

  const handleSubSelected = (e: any, i: number, j: number) => {
    const { name, checked } = e.target;
    const [keyName, keyType] = name.split("_");
    let tmp = copy(corporateTypeAndIncome);
    switch (keyName) {
      case juristicType[0]:
        tmp.juristicThai = checked ? keyType : "";
        const updateJuristicThaiKey = juristicThaiKey[j];
        setJuristicAllType({
          ...juristicAllType,
          [updateJuristicThaiKey]: checked,
        });
        // console.log(tmp.juristicThai);
        break;

      case juristicType[1]:
        tmp.juristicForeign = checked ? keyType : "";
        const updateJuristicForeignKey = juristicForeignKey[j];
        setJuristicAllType({
          ...juristicAllType,
          [updateJuristicForeignKey]: checked,
        });
        // console.log(tmp.juristicForeign);
        break;

      case juristicType[2]:
        tmp.juristicOthers = checked ? keyType : "";
        const updateJuristicOthersKey = juristicOthersKey[j];
        setJuristicAllType({
          ...juristicAllType,
          [updateJuristicOthersKey]: checked,
        });
        // console.log(tmp.juristicOthers);
        break;

      default:
        break;
    }
    setCorporateTypeAndIncome(tmp);
  };

  const handeleBusinessType = (e: any, i: number) => {
    const { name, checked } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    const updateBusinessTypeKey = businessTypeKey[i];
    setJuristicAllType({
      ...juristicAllType,
      [updateBusinessTypeKey]: checked,
    });
    if (checked) {
      tmp.businessType = name;
      errors ? validateLocal(tmp) : null;
    } else {
      tmp.businessType = "";
    }
    setCorporateTypeAndIncome(tmp);
    if (name == "Others (Please Specify)") {
      setIsBusinessTypeOthers(checked);
    }
  };

  const handeleCountrySourceOfIncome = (e: any, i: number) => {
    const { name, checked } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    const updateCountrySourceOfIncomeKey = countrySourceOfIncomeKey[i];
    setJuristicAllType({
      ...juristicAllType,
      [updateCountrySourceOfIncomeKey]: checked,
    });
    if (checked) {
      tmp.countrySourceOfIncome = name;
      errors ? validateLocal(tmp) : null;
    } else {
      tmp.countrySourceOfIncome = "";
    }
    setCorporateTypeAndIncome(tmp);
    if (name == "Others Countries (Please Specify)") {
      setIsCountrySourceOfIncomeOthers(checked);
    }
  };

  const handeleInvestmentObjective = (e: any, i: number) => {
    const { name, checked } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    const updateInvestmentObjectiveKey = investmentObjectiveKey[i];
    setJuristicAllType({
      ...juristicAllType,
      [updateInvestmentObjectiveKey]: checked,
    });
    if (checked) {
      tmp.InvestmentObject = name;
      errors ? validateLocal(tmp) : null;
    } else {
      tmp.InvestmentObject = "";
    }
    setCorporateTypeAndIncome(tmp);
    if (name == "Others (Please Specify)") {
      setIsInvestmentObjectiveOthers(checked);
    }
  };

  const handeleSourceOfIncome = (e: any, i: number) => {
    const { name, checked } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    const updateSourceOfIncomeKey = sourceOfIncomeKey[i];
    setJuristicAllType({
      ...juristicAllType,
      [updateSourceOfIncomeKey]: checked,
    });
    if (checked) {
      if (!tmp.sourceOfIncome.includes(name)) {
        tmp.sourceOfIncome.push(name);
      }
      errors ? validateLocal(tmp) : null;
    } else {
      tmp.sourceOfIncome = tmp.sourceOfIncome.filter(
        (item: any) => item !== name
      );
    }
    setCorporateTypeAndIncome(tmp);
    if (name == "Others (Please Specify)") {
      setIsSourceOfIncomeOthers(checked);
    }
  };

  const handleInputOtherBusinessType = (e: any) => {
    const { value } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    tmp.businessType = value;
    setCorporateTypeAndIncome(tmp);
    errors ? validateLocal(tmp) : null;
  };

  const handleInputOtherSourceOfIncome = (e: any) => {
    let tmp = copy(corporateTypeAndIncome);
    tmp.sourceOfIncome = tmp.sourceOfIncome.filter(
      (item: any) => item !== "Others (Please Specify)"
    );
    const { value } = e.target;
    tmp.sourceOfIncome.push(value);
    setCorporateTypeAndIncome(tmp);
    errors ? validateLocal(tmp) : null;
  };

  const handleInputOtherCountrySourceOfIncome = (e: any) => {
    const { value } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    tmp.countrySourceOfIncome = value;
    setCorporateTypeAndIncome(tmp);
    errors ? validateLocal(tmp) : null;
  };

  const handleInputOtherInvestmentObjective = (e: any) => {
    const { value } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    tmp.InvestmentObject = value;
    setCorporateTypeAndIncome(tmp);
    errors ? validateLocal(tmp) : null;
  };

  const handleInputOthers = (e: any, name: string) => {
    switch (name) {
      case "businessType":
        handleInputOtherBusinessType(e);
        setJuristicAllOhterType({
          ...juristicAllOtherType,
          otherBusinessType: e.target.value,
        });
        break;

      case "sourceOfIncome":
        handleInputOtherSourceOfIncome(e);
        setJuristicAllOhterType({
          ...juristicAllOtherType,
          otherIncome: e.target.value,
        });
        break;

      case "countrySourceOfIncome":
        handleInputOtherCountrySourceOfIncome(e);
        setJuristicAllOhterType({
          ...juristicAllOtherType,
          otherCountry: e.target.value,
        });
        break;

      case "investmentObjective":
        handleInputOtherInvestmentObjective(e);
        setJuristicAllOhterType({
          ...juristicAllOtherType,
          otherInvestment: e.target.value,
        });
        break;

      default:
        break;
    }
  };

  const validateForm = (): boolean => {
    try {
      corporateTypeAndIncomeSchema.parse(corporateTypeAndIncome);
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
  const validateLocal = (obj: TCorporateTypeAndIncome) => {
    try {
      corporateTypeAndIncomeSchema.parse(obj);
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

  return {
    corporateTypeAndIncome,
    isBusinessTypeOthers,
    isSourceOfIncomeOthers,
    isCountrySourceOfIncomeOthers,
    isInvestmentObjectiveOthers,
    errors,
    juristicAllType,
    juristicAllOtherType,
    handleCheck,
    handleSubSelected,
    handeleBusinessType,
    handeleCountrySourceOfIncome,
    handeleInvestmentObjective,
    handeleSourceOfIncome,
    handleInputOthers,
    getError,
    disableBusinessType,
    disableCountrySourceOfIncome,
    disableInvestmentObjective,
    isDiabledJuristicType,
    isDisableSubSelected,
    validateForm,
  };
}

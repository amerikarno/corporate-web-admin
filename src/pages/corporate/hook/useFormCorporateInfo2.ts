import { copy } from "@/lib/utils";
import {
  businessType,
  countrySourceOfIncome,
  investmentObjective,
  juristicType,
  sourceOfIncome,
} from "../constants/const_variables";
import { useState } from "react";
import { TCorporateTypeAndIncome } from "../constants/types";
import { emptyCorporateTypeAndIncome } from "../constants/initailData";

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

  const handleCheck = (e: any) => {
    const { name, checked } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    tmp.juristicType = checked ? name : "";
    setCorporateTypeAndIncome(tmp);
    console.log(tmp.juristicType);
  };

  const handleSubSelected = (e: any) => {
    const { name, checked } = e.target;
    const [keyName, keyType] = name.split("_");
    let tmp = copy(corporateTypeAndIncome);
    switch (keyName) {
      case juristicType[0]:
        tmp.juristicThai = checked ? keyType : "";
        console.log(tmp.juristicThai);
        break;

      case juristicType[1]:
        tmp.juristicForeign = checked ? keyType : "";
        console.log(tmp.juristicForeign);
        break;

      case juristicType[2]:
        tmp.juristicOthers = checked ? keyType : "";
        console.log(tmp.juristicOthers);
        break;

      default:
        break;
    }
    setCorporateTypeAndIncome(tmp);
  };

  const handeleBusinessType = (e: any) => {
    const { name, checked } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    tmp.businessType = checked ? name : "";
    setCorporateTypeAndIncome(tmp);
    if (name == "Others (Please Specify)") {
      setIsBusinessTypeOthers(checked);
    }
  };

  const handeleCountrySourceOfIncome = (e: any) => {
    const { name, checked } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    tmp.countrySourceOfIncome = checked ? name : "";
    setCorporateTypeAndIncome(tmp);
    if (name == "Others Countries (Please Specify)") {
      setIsCountrySourceOfIncomeOthers(checked);
    }
  };

  const handeleInvestmentObjective = (e: any) => {
    const { name, checked } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    tmp.investmentObjective = checked ? name : "";
    setCorporateTypeAndIncome(tmp);
    if (name == "Others (Please Specify)") {
      setIsInvestmentObjectiveOthers(checked);
    }
  };

  const handeleSourceOfIncome = (e: any) => {
    const { name, checked } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    if (checked) {
      if (!tmp.sourceOfIncome.includes(name)) {
        tmp.sourceOfIncome.push(name);
      }
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
    if (corporateTypeAndIncome.investmentObjective !== "") {
      if (type === corporateTypeAndIncome.investmentObjective) {
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

  const handleInputOtherBusinessType = (e: any) => {
    const { _, value } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    tmp.businessType = value;
    setCorporateTypeAndIncome(tmp);
  };
  const handleInputOtherSourceOfIncome = (e: any) => {
    let tmp = copy(corporateTypeAndIncome);
    tmp.sourceOfIncome = tmp.sourceOfIncome.filter(
      (item: any) => item !== "Others (Please Specify)"
    );
    const { _, value } = e.target;
    tmp.sourceOfIncome.push(value);
    setCorporateTypeAndIncome(tmp);
  };
  const handleInputOtherCountrySourceOfIncome = (e: any) => {
    const { _, value } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    tmp.countrySourceOfIncome = value;
    setCorporateTypeAndIncome(tmp);
  };
  const handleInputOtherInvestmentObjective = (e: any) => {
    const { _, value } = e.target;
    let tmp = copy(corporateTypeAndIncome);
    tmp.investmentObjective = value;
    setCorporateTypeAndIncome(tmp);
  };
  const handleInputOthers = (e: any, name: string) => {
    switch (name) {
      case "businessType":
        handleInputOtherBusinessType(e);
        break;

      case "sourceOfIncome":
        handleInputOtherSourceOfIncome(e);
        break;

      case "countrySourceOfIncome":
        handleInputOtherCountrySourceOfIncome(e);
        break;

      case "investmentObjective":
        handleInputOtherInvestmentObjective(e);
        break;

      default:
        break;
    }
  };

  return {
    corporateTypeAndIncome,
    isBusinessTypeOthers,
    isSourceOfIncomeOthers,
    isCountrySourceOfIncomeOthers,
    isInvestmentObjectiveOthers,
    handleCheck,
    handleSubSelected,
    handeleBusinessType,
    handeleCountrySourceOfIncome,
    handeleInvestmentObjective,
    handeleSourceOfIncome,
    handleInputOthers,
    disableBusinessType,
    disableCountrySourceOfIncome,
    disableInvestmentObjective,
    isDiabledJuristicType,
    isDisableSubSelected,
  };
}

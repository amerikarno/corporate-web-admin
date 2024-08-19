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
  mapKeys,
} from "../constants/variables";
import { useState } from "react";
import {
  CorporateTypeBody,
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
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { CorporateResponse } from "../../constant/type";
import { getFrom2Response } from "../libs/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export function useFormCorporateInfo2() {
  const navigate = useNavigate();
  // onFormPassChange: (status: boolean) => void
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
  const [isSecondFormPass, setIsSecondFormPass] = useState<boolean>(false);
  const [resFrom2, setResForm2] = useState<CorporateResponse | null>(
    getFrom2Response()
  );
  const corp = useSelector((state: RootState) => state.editCorporate);
  // const [body, setBody] = useState<CorporateTypeBody>({
  //   isJuristicThailand: false,
  //   isTaxExempt: false,
  //   isNonTaxExempt: false,
  //   isJuristicForeign: false,
  //   isOperatingInThailand: false,
  //   isNonOperatingInThailand: false,
  //   isOther: false,
  //   isPartnership: false,
  //   isGovernmentStateEnterprise: false,
  //   isTaxExemptCompany: false,
  //   isAntiqueTrading: false,
  //   isHotelRestaurant: false,
  //   isArmament: false,
  //   isInsuranceAssurance: false,
  //   isCasinoGambling: false,
  //   isJewelryGoldTrading: false,
  //   isFoundation: false,
  //   isPropertyRealEstate: false,
  //   isMoneyTransfer: false,
  //   isEmploymentAgency: false,
  //   isEntertainment: false,
  //   isTravel: false,
  //   isFinancial: false,
  //   isEducationCenter: false,
  //   isForeignCurrencyExchange: false,
  //   isCryptoRelated: false,
  //   isOtherBusiness: false,
  //   isRevenue: false,
  //   isStock: false,
  //   isDonation: false,
  //   isLoan: false,
  //   isRevenueSelling: false,
  //   isOtherIncome: false,
  //   isThailand: false,
  //   isOtherThailand: false,
  //   isLiquidation: false,
  //   isInvestment: false,
  //   isCashManagement: false,
  //   isOtherInvestment: false,
  //   isJuristicThailand: false,
  //   isCoOperative: false,
  //   otherBusinessType: "",
  //   otherIncome: "",
  //   otherCountry: "",
  //   otherInvestment: "",
  //   corporateCode: corp.CorporateCode.toString(),
  // });

  // const handleErrors = (error: ZodIssue[] | null) => {
  //   console.log(error);
  //   setErrors(error);
  // };
  // const getError = (
  //   keyName: string[],
  //   errors: ZodIssue[] | null
  // ): ZodIssue | null => {
  //   if (errors === null) return null;

  //   return (
  //     errors.find((error) =>
  //       keyName.every((key) => error.path!.map(String).includes(key))
  //     ) || null
  //   );
  // };

  // const disableBusinessType = (type: string): boolean => {
  //   if (corporateTypeAndIncome.businessType !== "") {
  //     if (type === corporateTypeAndIncome.businessType) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   } else {
  //     return false;
  //   }
  // };
  // const disableCountrySourceOfIncome = (type: string): boolean => {
  //   if (corporateTypeAndIncome.countrySourceOfIncome !== "") {
  //     if (type === corporateTypeAndIncome.countrySourceOfIncome) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   } else {
  //     return false;
  //   }
  // };
  // const disableInvestmentObjective = (type: string): boolean => {
  //   if (corporateTypeAndIncome.investmentObjective !== "") {
  //     if (type === corporateTypeAndIncome.investmentObjective) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   } else {
  //     return false;
  //   }
  // };

  // const isDiabledJuristicType = (type: string): boolean => {
  //   if (corporateTypeAndIncome.juristicType !== "") {
  //     if (type === corporateTypeAndIncome.juristicType) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   } else {
  //     return false;
  //   }
  // };

  // const isDisableSubSelected = (type: string): boolean => {
  //   if (corporateTypeAndIncome.juristicType !== type) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // const handleCheck = (e: any, i: number) => {
  //   const { name, checked } = e.target;
  //   let tmp = copy(corporateTypeAndIncome);
  //   tmp.juristicType = checked ? name : "";
  //   const updateKey = juristicTypeKey[i];
  //   setJuristicAllType({ ...juristicAllType, [updateKey]: checked });
  //   if (checked) {
  //     tmp.juristicType = name;
  //     errors ? validateLocal(tmp) : null;
  //   } else {
  //     tmp.juristicType = "";
  //   }
  //   setCorporateTypeAndIncome(tmp);
  // };

  // const handleSubSelected = (e: any, j: number) => {
  //   const { name, checked } = e.target;
  //   const [keyName, keyType] = name.split("_");
  //   let tmp = copy(corporateTypeAndIncome);
  //   switch (keyName) {
  //     case juristicType[0]:
  //       tmp.juristicThai = checked ? keyType : "";
  //       const updateJuristicThaiKey = juristicThaiKey[j];
  //       setJuristicAllType({
  //         ...juristicAllType,
  //         [updateJuristicThaiKey]: checked,
  //       });
  //       // console.log(tmp.juristicThai);
  //       break;

  //     case juristicType[1]:
  //       tmp.juristicForeign = checked ? keyType : "";
  //       const updateJuristicForeignKey = juristicForeignKey[j];
  //       setJuristicAllType({
  //         ...juristicAllType,
  //         [updateJuristicForeignKey]: checked,
  //       });
  //       // console.log(tmp.juristicForeign);
  //       break;

  //     case juristicType[2]:
  //       tmp.juristicOthers = checked ? keyType : "";
  //       const updateJuristicOthersKey = juristicOthersKey[j];
  //       setJuristicAllType({
  //         ...juristicAllType,
  //         [updateJuristicOthersKey]: checked,
  //       });
  //       // console.log(tmp.juristicOthers);
  //       break;

  //     default:
  //       break;
  //   }
  //   setCorporateTypeAndIncome(tmp);
  // };

  // const handeleBusinessType = (e: any, i: number) => {
  //   const { name, checked } = e.target;
  //   let tmp = copy(corporateTypeAndIncome);
  //   const updateBusinessTypeKey = businessTypeKey[i];
  //   setJuristicAllType({
  //     ...juristicAllType,
  //     [updateBusinessTypeKey]: checked,
  //   });
  //   if (checked) {
  //     tmp.businessType = name;
  //     errors ? validateLocal(tmp) : null;
  //   } else {
  //     tmp.businessType = "";
  //   }
  //   setCorporateTypeAndIncome(tmp);
  //   if (name == "Others (Please Specify)") {
  //     setIsBusinessTypeOthers(checked);
  //   }
  // };

  // const handeleCountrySourceOfIncome = (e: any, i: number) => {
  //   const { name, checked } = e.target;
  //   let tmp = copy(corporateTypeAndIncome);
  //   const updateCountrySourceOfIncomeKey = countrySourceOfIncomeKey[i];
  //   setJuristicAllType({
  //     ...juristicAllType,
  //     [updateCountrySourceOfIncomeKey]: checked,
  //   });
  //   if (checked) {
  //     tmp.countrySourceOfIncome = name;
  //     errors ? validateLocal(tmp) : null;
  //   } else {
  //     tmp.countrySourceOfIncome = "";
  //   }
  //   setCorporateTypeAndIncome(tmp);
  //   if (name == "Others Countries (Please Specify)") {
  //     setIsCountrySourceOfIncomeOthers(checked);
  //   }
  // };

  // const handeleInvestmentObjective = (e: any, i: number) => {
  //   const { name, checked } = e.target;
  //   let tmp = copy(corporateTypeAndIncome);
  //   const updateInvestmentObjectiveKey = investmentObjectiveKey[i];
  //   setJuristicAllType({
  //     ...juristicAllType,
  //     [updateInvestmentObjectiveKey]: checked,
  //   });
  //   if (checked) {
  //     tmp.investmentObjective = name;
  //     errors ? validateLocal(tmp) : null;
  //   } else {
  //     tmp.investmentObjective = "";
  //   }
  //   setCorporateTypeAndIncome(tmp);
  //   if (name == "Others (Please Specify)") {
  //     setIsInvestmentObjectiveOthers(checked);
  //   }
  // };

  // const handeleSourceOfIncome = (e: any, i: number) => {
  //   const { name, checked } = e.target;
  //   let tmp = copy(corporateTypeAndIncome);
  //   const updateSourceOfIncomeKey = sourceOfIncomeKey[i];
  //   setJuristicAllType({
  //     ...juristicAllType,
  //     [updateSourceOfIncomeKey]: checked,
  //   });
  //   if (checked) {
  //     if (!tmp.sourceOfIncome.includes(name)) {
  //       tmp.sourceOfIncome.push(name);
  //     }
  //     errors ? validateLocal(tmp) : null;
  //   } else {
  //     tmp.sourceOfIncome = tmp.sourceOfIncome.filter(
  //       (item: any) => item !== name
  //     );
  //   }
  //   setCorporateTypeAndIncome(tmp);
  //   if (name == "Others (Please Specify)") {
  //     setIsSourceOfIncomeOthers(checked);
  //   }
  // };

  // const handleInputOtherBusinessType = (e: any) => {
  //   const { value } = e.target;
  //   let tmp = copy(corporateTypeAndIncome);
  //   tmp.businessType = value;
  //   setCorporateTypeAndIncome(tmp);
  //   errors ? validateLocal(tmp) : null;
  // };

  // const handleInputOtherSourceOfIncome = (e: any) => {
  //   let tmp = copy(corporateTypeAndIncome);
  //   tmp.sourceOfIncome = tmp.sourceOfIncome.filter(
  //     (item: any) => item !== "Others (Please Specify)"
  //   );
  //   const { value } = e.target;
  //   tmp.sourceOfIncome.push(value);
  //   setCorporateTypeAndIncome(tmp);
  //   errors ? validateLocal(tmp) : null;
  // };

  // const handleInputOtherCountrySourceOfIncome = (e: any) => {
  //   const { value } = e.target;
  //   let tmp = copy(corporateTypeAndIncome);
  //   tmp.countrySourceOfIncome = value;
  //   setCorporateTypeAndIncome(tmp);
  //   errors ? validateLocal(tmp) : null;
  // };

  // const handleInputOtherInvestmentObjective = (e: any) => {
  //   const { value } = e.target;
  //   let tmp = copy(corporateTypeAndIncome);
  //   tmp.investmentObjective = value;
  //   setCorporateTypeAndIncome(tmp);
  //   errors ? validateLocal(tmp) : null;
  // };

  // const handleInputOthers = (e: any, name: string) => {
  //   switch (name) {
  //     case "businessType":
  //       handleInputOtherBusinessType(e);
  //       setJuristicAllOhterType({
  //         ...juristicAllOtherType,
  //         otherBusinessType: e.target.value,
  //       });
  //       break;

  //     case "sourceOfIncome":
  //       handleInputOtherSourceOfIncome(e);
  //       setJuristicAllOhterType({
  //         ...juristicAllOtherType,
  //         otherIncome: e.target.value,
  //       });
  //       break;

  //     case "countrySourceOfIncome":
  //       handleInputOtherCountrySourceOfIncome(e);
  //       setJuristicAllOhterType({
  //         ...juristicAllOtherType,
  //         otherCountry: e.target.value,
  //       });
  //       break;

  //     case "investmentObjective":
  //       handleInputOtherInvestmentObjective(e);
  //       setJuristicAllOhterType({
  //         ...juristicAllOtherType,
  //         otherInvestment: e.target.value,
  //       });
  //       break;

  //     default:
  //       break;
  //   }
  // };

  // const validateForm = (): boolean => {
  //   try {
  //     corporateTypeAndIncomeSchema.parse(corporateTypeAndIncome);
  //     return true;
  //   } catch (e) {
  //     if (e instanceof z.ZodError) {
  //       handleErrors(e.errors);
  //     } else {
  //       console.log(e);
  //     }
  //     return false;
  //   }
  // };
  // const validateLocal = (obj: TCorporateTypeAndIncome) => {
  //   try {
  //     corporateTypeAndIncomeSchema.parse(obj);
  //     handleErrors(null);
  //   } catch (e) {
  //     if (e instanceof z.ZodError) {
  //       console.log(e.errors);
  //       handleErrors(e.errors);
  //     } else {
  //       console.log(e);
  //     }
  //   }
  // };

  const saveJuristicType = async (data: CorporateResponse | null) => {
    if (data !== null) {
      let body = {
        ...data,
        CreatedAt: undefined,
        DeletedAt: undefined,
        createBy: undefined,
        corporateCountry: undefined,
        corporateCode: corp.CorporateCode?.toString(),
        isThailand: data.corporateCountry?.isThailand ? true : false,
        otherCountry: data.corporateCountry?.otherCountry,
      };
      console.log("body", body);
      try {
        const token = getCookies();
        const res = await axios.post("/api/v1/corporate/update/type", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res);
        if (res.status === 200) {
          console.log("request success", res.data);
          navigate("/create-job/added-corporate-account/3");
          setIsSecondFormPass(true);
          // onFormPassChange(true);
          handleFormPassChange(true);
        } else {
          alert("Invalid Input.");
          console.log("save failed");
          setIsSecondFormPass(false);
          // onFormPassChange(false);
          handleFormPassChange(false);
        }
      } catch (error) {
        console.log(error);
        alert(error);
        setIsSecondFormPass(false);
        // onFormPassChange(false);
        handleFormPassChange(false);
      }
    }
  };

  const handleFormPassChange = (status: boolean) => {
    setIsSecondFormPass(status);
  };

  // const isCheckedByKeyValue = (value: string, res: CorporateResponse) => {
  //   const objs = Object.entries(mapKeys).find(([_, v]) => v === value);
  //   console.log(objs);
  //   if (objs && objs !== null) {
  //     const isChecked = res[objs[0] as keyof CorporateResponse];
  //     return isChecked;
  //   }
  // };

  const handleCheckedBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { name, checked } = e.target;

    switch (name) {
      case "juristicInfo":
        let jrType = copy(resFrom2);
        if (jrType && jrType !== null) {
          if (
            key === "isJuristicThailand" ||
            key === "isJuristicForeign" ||
            key === "isOther"
          ) {
            jrType.isJuristicThailand = false;
            jrType.isTaxExempt = false;
            jrType.isNonTaxExempt = false;
            jrType.isJuristicForeign = false;
            jrType.isOperatingInThailand = false;
            jrType.isNonOperatingInThailand = false;
            jrType.isOther = false;
            jrType.isPartnership = false;
            jrType.isGovernmentStateEnterprise = false;
            jrType.isCoOperative = false;
            jrType.isTaxExemptCompany = false;
          } else if (key === "isTaxExempt" || key === "isNonTaxExempt") {
            jrType.isJuristicThailand = true;
            jrType.isTaxExempt = false;
            jrType.isNonTaxExempt = false;
            jrType.isJuristicForeign = false;
            jrType.isOperatingInThailand = false;
            jrType.isNonOperatingInThailand = false;
            jrType.isOther = false;
            jrType.isPartnership = false;
            jrType.isGovernmentStateEnterprise = false;
            jrType.isCoOperative = false;
            jrType.isTaxExemptCompany = false;
          } else if (
            key === "isOperatingInThailand" ||
            key === "isNonOperatingInThailand"
          ) {
            jrType.isJuristicThailand = false;
            jrType.isTaxExempt = false;
            jrType.isNonTaxExempt = false;
            jrType.isJuristicForeign = true;
            jrType.isOperatingInThailand = false;
            jrType.isNonOperatingInThailand = false;
            jrType.isOther = false;
            jrType.isPartnership = false;
            jrType.isGovernmentStateEnterprise = false;
            jrType.isCoOperative = false;
            jrType.isTaxExemptCompany = false;
          } else if (
            key === "isPartnership" ||
            key === "isGovernmentStateEnterprise" ||
            key === "isCoOperative" ||
            key === "isTaxExemptCompany"
          ) {
            jrType.isJuristicThailand = false;
            jrType.isTaxExempt = false;
            jrType.isNonTaxExempt = false;
            jrType.isJuristicForeign = false;
            jrType.isOperatingInThailand = false;
            jrType.isNonOperatingInThailand = false;
            jrType.isOther = true;
            jrType.isPartnership = false;
            jrType.isGovernmentStateEnterprise = false;
            jrType.isCoOperative = false;
            jrType.isTaxExemptCompany = false;
          }

          (jrType[key as keyof typeof jrType] as boolean) = checked;
        }
        setResForm2({ ...jrType });

        break;

      case "businessType":
        let buType = copy(resFrom2);
        if (buType && buType !== null) {
          buType.isAntiqueTrading = false;
          buType.isHotelRestaurant = false;
          buType.isArmament = false;
          buType.isInsuranceAssurance = false;
          buType.isCasinoGambling = false;
          buType.isJewelryGoldTrading = false;
          buType.isFoundation = false;
          buType.isPropertyRealEstate = false;
          buType.isMoneyTransfer = false;
          buType.isEmploymentAgency = false;
          buType.isEntertainment = false;
          buType.isTravel = false;
          buType.isFinancial = false;
          buType.isEducationCenter = false;
          buType.isForeignCurrencyExchange = false;
          buType.isCryptoRelated = false;
          buType.isOtherBusiness = false;

          (buType[key as keyof typeof buType] as boolean) = checked;
        }
        setResForm2({ ...buType });

        break;

      case "sourceOfIncome":
        let srcIncome = copy(resFrom2);
        if (srcIncome && srcIncome !== null) {
          (srcIncome[key as keyof typeof srcIncome] as boolean) = checked;
        }
        setResForm2({ ...srcIncome });
        break;

      case "countrySourceOfIncome":
        let countrySrcIncome = copy(resFrom2);
        console.log(countrySrcIncome);
        console.log(key, name, checked);
        if (countrySrcIncome && countrySrcIncome.corporateCountry) {
          if (key === "isThailand") {
            countrySrcIncome.corporateCountry.isThailand = checked;
            setResForm2({ ...countrySrcIncome });
          } else {
            countrySrcIncome.corporateCountry.isThailand = checked
              ? false
              : true;
            setResForm2({
              ...countrySrcIncome,
            });
          }
        }
        break;

      case "investmentObjective":
        let invObj = copy(resFrom2);
        console.log(key, name, checked);
        if (invObj && invObj !== null) {
          invObj.isLiquidation = false;
          invObj.isInvestment = false;
          invObj.isCashManagement = false;
          invObj.isOtherInvestment = false;
          (invObj[key as keyof typeof invObj] as boolean) = checked;
        }
        setResForm2({ ...invObj });
        break;

      default:
        break;
    }
  };

  const handleInputOthersOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let form2Data = copy(resFrom2);
    switch (name) {
      case "countrySourceOfIncomeOther":
        if (form2Data && form2Data.corporateCountry) {
          form2Data.corporateCountry.otherCountry = value;
          setResForm2({ ...form2Data });
        }
        break;

      case "sourceOfIncomeOther":
        if (form2Data && form2Data !== null) {
          form2Data.otherCountry = value;
        }
        break;

      case "investmentObjectiveOther":
        if (form2Data && form2Data !== null) {
          form2Data.otherInvestment = value;
        }
        break;

      case "businessTypeOther":
        if (form2Data && form2Data !== null) {
          form2Data.otherBusinessType = value;
        }
        break;

      default:
        break;
    }
    setResForm2({ ...form2Data });
  };

  return {
    // corporateTypeAndIncome,
    // isBusinessTypeOthers,
    // isSourceOfIncomeOthers,
    // isCountrySourceOfIncomeOthers,
    // isInvestmentObjectiveOthers,
    // errors,
    // juristicAllType,
    // juristicAllOtherType,
    // isSecondFormPass,
    // handleCheck,
    // handleSubSelected,
    // handeleBusinessType,
    // handeleCountrySourceOfIncome,
    // handeleInvestmentObjective,
    // handeleSourceOfIncome,
    // handleInputOthers,
    // handleFormPassChange,
    // getError,
    // disableBusinessType,
    // disableCountrySourceOfIncome,
    // disableInvestmentObjective,
    // isDiabledJuristicType,
    // isDisableSubSelected,
    // validateForm,
    saveJuristicType,
    // isCheckedByKeyValue,
    resFrom2,
    handleCheckedBox,
    handleInputOthersOption,
  };
}

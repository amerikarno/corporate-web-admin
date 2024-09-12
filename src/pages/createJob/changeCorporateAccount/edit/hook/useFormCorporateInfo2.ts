import { copy } from "@/lib/utils";
import { useState } from "react";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { CorporateResponse } from "../../constant/type";
import { getFrom2Response } from "../libs/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";

export function useFormCorporateInfo2() {
  const navigate = useNavigate();
  // const [isSecondFormPass, setIsSecondFormPass] = useState<boolean>(false);
  const [resFrom2, setResForm2] = useState<CorporateResponse>(
    getFrom2Response()
  );
  const corp = useSelector((state: RootState) => state.editCorporate);
  const dispatch = useDispatch();

  const setStoreData = (data: CorporateResponse) => {
    let tmp = copy(corp);

    if (tmp.CorporateTypes) {
      tmp.CorporateTypes.isJuristicThailand = data.isJuristicThailand
        ? true
        : false;
      tmp.CorporateTypes.isTaxExempt = data.isTaxExempt ? true : false;
      tmp.CorporateTypes.isNonTaxExempt = data.isNonTaxExempt ? true : false;
      tmp.CorporateTypes.isJuristicForeign = data.isJuristicForeign
        ? true
        : false;
      tmp.CorporateTypes.isOperatingInThailand = data.isOperatingInThailand
        ? true
        : false;
      tmp.CorporateTypes.isNonOperatingInThailand =
        data.isNonOperatingInThailand ? true : false;
      tmp.CorporateTypes.isOther = data.isOther ? true : false;
      tmp.CorporateTypes.isPartnership = data.isPartnership ? true : false;
      tmp.CorporateTypes.isGovernmentStateEnterprise =
        data.isGovernmentStateEnterprise ? true : false;
      tmp.CorporateTypes.isCoOperative = data.isCoOperative ? true : false;
      tmp.CorporateTypes.isTaxExemptCompany = data.isTaxExemptCompany
        ? true
        : false;
    }

    if (tmp.BusinessTypes) {
      tmp.BusinessTypes.isAntiqueTrading = data.isAntiqueTrading ? true : false;
      tmp.BusinessTypes.isHotelRestaurant = data.isHotelRestaurant
        ? true
        : false;
      tmp.BusinessTypes.isArmament = data.isArmament ? true : false;
      tmp.BusinessTypes.isInsuranceAssurance = data.isInsuranceAssurance
        ? true
        : false;
      tmp.BusinessTypes.isCasinoGambling = data.isCasinoGambling ? true : false;
      tmp.BusinessTypes.isJewelryGoldTrading = data.isJewelryGoldTrading
        ? true
        : false;
      tmp.BusinessTypes.isFoundation = data.isFoundation ? true : false;
      tmp.BusinessTypes.isPropertyRealEstate = data.isPropertyRealEstate
        ? true
        : false;
      tmp.BusinessTypes.isMoneyTransfer = data.isMoneyTransfer ? true : false;
      tmp.BusinessTypes.isEmploymentAgency = data.isEmploymentAgency
        ? true
        : false;
      tmp.BusinessTypes.isEntertainment = data.isEntertainment ? true : false;
      tmp.BusinessTypes.isTravel = data.isTravel ? true : false;
      tmp.BusinessTypes.isFinancial = data.isFinancial ? true : false;
      tmp.BusinessTypes.isEducationCenter = data.isEducationCenter
        ? true
        : false;
      tmp.BusinessTypes.isForeignCurrencyExchange =
        data.isForeignCurrencyExchange ? true : false;
      tmp.BusinessTypes.isCryptoRelated = data.isCryptoRelated ? true : false;
      tmp.BusinessTypes.isOtherBusiness = data.isOtherBusiness ? true : false;
      tmp.BusinessTypes.otherBusinessType = data.otherBusinessType
        ? data.otherBusinessType
        : "";
    }

    if (tmp.SourceOfIncomes) {
      tmp.SourceOfIncomes.isRevenue = data.isRevenue ? true : false;
      tmp.SourceOfIncomes.isStock = data.isStock ? true : false;
      tmp.SourceOfIncomes.isDonation = data.isDonation ? true : false;
      tmp.SourceOfIncomes.isLoan = data.isLoan ? true : false;
      tmp.SourceOfIncomes.isRevenueSelling = data.isRevenueSelling
        ? true
        : false;
      tmp.SourceOfIncomes.isOtherIncome = data.isOtherIncome ? true : false;
      tmp.SourceOfIncomes.otherIncome = data.otherIncome
        ? data.otherIncome
        : "";
    }

    if (tmp.CountrySourceIncomes) {
      tmp.CountrySourceIncomes[0].isCashManagement = data.isCashManagement
        ? true
        : false;
      tmp.CountrySourceIncomes[0].isInvestment = data.isInvestment
        ? true
        : false;
      tmp.CountrySourceIncomes[0].isLiquidation = data.isLiquidation
        ? true
        : false;
      tmp.CountrySourceIncomes[0].isOtherInvestment = data.isOtherInvestment
        ? true
        : false;
      tmp.CountrySourceIncomes[0].otherInvestment = data.otherInvestment
        ? data.otherInvestment
        : "";
      tmp.CountrySourceIncomes[0].corporateCountry.isThailand = data.isThailand
        ? true
        : false;
      tmp.CountrySourceIncomes[0].corporateCountry.other = data.otherCountry
        ? data.otherCountry
        : "";
    }

    dispatch(setCorporateData(tmp));
    setResForm2(data);
  };

  const saveJuristicType = async (data: CorporateResponse | null) => {
    console.log(data?.corporateCountry?.isThailand)
    if (data !== null) {
      let body = {
        ...data,
        CreatedAt: undefined,
        DeletedAt: undefined,
        createBy: undefined,
        corporateCountry: undefined,
        deleteBy: undefined,
        corporateCode: corp.CorporateCode?.toString(),
        isThailand: data.corporateCountry?.isThailand ? true : false,
        otherCountry: data.corporateCountry?.isThailand ? "" :data.corporateCountry?.other,
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
          // setIsSecondFormPass(true);
          // onFormPassChange(true);
          // handleFormPassChange(true);
          // dispatch(setJuristicType(data));
          setStoreData(data);
          navigate("/create-job/change-corporate-account/edit/3");
        } else {
          alert("Invalid Input.");
          console.log("save failed");
          // setIsSecondFormPass(false);
          // onFormPassChange(false);
          // handleFormPassChange(false);
        }
      } catch (error) {
        console.log(error);
        alert(error);
        // setIsSecondFormPass(false);
        // onFormPassChange(false);
        // handleFormPassChange(false);
      }
      // dispatch(setJuristicType(data));
    }
  };

  // const handleFormPassChange = (status: boolean) => {
  //   setIsSecondFormPass(status);
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
        //console.log(countrySrcIncome);
        console.log(key, name, checked);
        if (countrySrcIncome && countrySrcIncome.corporateCountry) {
          if (key === "isThailand") {
            countrySrcIncome.corporateCountry.isThailand = checked
            
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
          // invObj.isLiquidation = false;
          // invObj.isInvestment = false;
          // invObj.isCashManagement = false;
          // invObj.isOtherInvestment = false;
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
          form2Data.corporateCountry.other = value;
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

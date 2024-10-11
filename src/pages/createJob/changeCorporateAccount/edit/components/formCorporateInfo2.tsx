import { Card } from "@/components/ui/card";
import { mapKeyLabel } from "../constants/variables";
import { CheckBox } from "@/components/Checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioCheckBox } from "@/components/ui/Radio";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { CorporateResponse, TCorporateData } from "../../constant/type";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { copy } from "@/lib/utils";
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";
import { useEffect, useState } from "react";
import { mapToForm2Create } from "../libs/utils";
import { setTestCorporateData } from "@/features/corporateTest/corporateTestSlice";

export function FormCorporateTypeAndIncome() {
  const getCheckedLabel = (corpData: TCorporateData) => {
    // console.log(corpData);
    const jrType = corpData?.CorporateTypes;
    const buType = corpData?.BusinessTypes;
    const srcOfIncome = corpData?.SourceOfIncomes;
    const countrySrcOfIncome =
      corpData?.CountrySourceIncomes && corpData.CountrySourceIncomes[0];
    const invType = corpData?.CountrySourceIncomes
      ? corpData.CountrySourceIncomes[0]
      : null;
    const countrySrcOfIncomeTh = countrySrcOfIncome?.corporateCountry;

    return {
      jrType,
      buType,
      srcOfIncome,
      countrySrcOfIncome,
      invType,
      countrySrcOfIncomeTh,
    };
  };

  const corpData = useSelector((state: RootState) => state.editCorporate);
  const getFrom2Response = () => {
    // console.log(corpData);
    const {
      jrType,
      buType,
      srcOfIncome,
      countrySrcOfIncome,
      invType,
      countrySrcOfIncomeTh,
    } = getCheckedLabel(corpData) || {};

    let res: CorporateResponse = {
      ...jrType,
      ...buType,
      ...srcOfIncome,
      ...countrySrcOfIncome,
      ...invType,
      ...countrySrcOfIncomeTh,
    };
    // console.log(res);
    // console.log(JSON.stringify(res, null, 2));
    return res;
    // } else {
    //   return juristicType;
    // }
  };
  const [resFrom2, setResForm2] = useState<CorporateResponse>(
    getFrom2Response()
  );

  const corporateData: TCorporateData = useSelector<RootState>(
    (state) => state.editCorporate
  ) as TCorporateData;
  const token = getCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setResForm2({
      ...corporateData.BusinessTypes,
      ...corporateData.CorporateTypes,
      ...corporateData.SourceOfIncomes,
      ...corporateData.CountrySourceIncomes?.[0],
    });
  }, [dispatch, corporateData.CorporateCode]);

  const setStoreData = (data: CorporateResponse) => {
    let tmp = copy(corporateData);
    // console.log(tmp);
    // console.log(data);
    // console.log(tmp?.CountrySourceIncomes?.[0]);
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
      tmp.CountrySourceIncomes[0].corporateCountry.isThailand = data
        .corporateCountry?.isThailand
        ? true
        : false;
      tmp.CountrySourceIncomes[0].corporateCountry.other = !data
        .corporateCountry?.isThailand
        ? data.corporateCountry?.other
          ? data.corporateCountry?.other
          : ""
        : "";
    }
    // console.log(tmp);
    dispatch(setCorporateData(tmp));
    setResForm2(data);
  };

  const saveJuristicType = async (data: CorporateResponse | null) => {
    // console.log(data?.corporateCountry?.isThailand);
    // console.log(data?.corporateCountry?.other);
    if (data !== null) {
      let body = {
        ...data,
        CreatedAt: undefined,
        DeletedAt: undefined,
        createBy: undefined,
        corporateCountry: undefined,
        deleteBy: undefined,
        corporateCode: corporateData.CorporateCode?.toString(),
        isThailand: data.corporateCountry?.isThailand
          ? data.corporateCountry?.isThailand
            ? true
            : false
          : false,
        otherCountry: data.corporateCountry?.isThailand
          ? ""
          : data.corporateCountry?.other,
      };
      // console.log(body.isThailand);
      // console.log(body.otherCountry);
      try {
        const res = await axios.post("/api/v1/corporate/update/type", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          // console.log("update success", res.data);
          setStoreData(data);
          navigate("/create-job/change-corporate-account/edit/3");
        } else {
          alert("Invalid Input.");
          // console.log("save failed");
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };
  const createJuristicType = async (
    data: CorporateResponse,
    corporateData: any
  ) => {
    try {
      if (data !== null) {
        let body = mapToForm2Create(data);
        body = {
          ...body,
          corporateCode: corporateData.CorporateCode.toString(),
          isThailand: data.corporateCountry?.isThailand ? true : false,
          otherCountry: data.corporateCountry?.other,
        };
        // console.log("body: ", body);
        const token = getCookies();
        const res = await axios.post("/api/v1/corporate/create/type", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          // console.log("request success", res.data);
          setStoreData(body);
          navigate("/create-job/change-corporate-account/edit/3");
        } else {
          alert("Invalid Input.");
          // console.log("create failed");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

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

        if (!countrySrcIncome.corporateCountry) {
          countrySrcIncome.corporateCountry = {};
        }

        if (key === "isThailand") {
          countrySrcIncome.corporateCountry.isThailand = checked;
        } else {
          countrySrcIncome.corporateCountry.isThailand = !checked;
        }

        setResForm2({ ...countrySrcIncome });
        break;

      case "investmentObjective":
        let invObj = copy(resFrom2);
        // console.log(key, name, checked);
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
          form2Data.otherIncome = value;
        }
        break;

      case "investmentObjectiveOther":
        if (form2Data && form2Data !== null) {
          form2Data.otherInvestment = value;
        }
        break;

      case "businessTypeOther":
        if (form2Data && form2Data !== null) {
          // console.log("value", value);
          form2Data.otherBusinessType = value;
        }
        break;

      default:
        break;
    }
    setResForm2({ ...form2Data });
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // console.log(resFrom2);
    dispatch(setTestCorporateData(resFrom2));
    // if (corporateData.CountrySourceIncomes) {
    if (corporateData.CorporateTypes.corporateCode !== 0) {
      console.log("do update");
      await saveJuristicType(resFrom2);
    } else {
      console.log("do create");
      await createJuristicType(resFrom2, corporateData);
    }
  };

  if (resFrom2 === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <div className="p-4 space-y-8">
          <div className="flex flex-row">
            <div className="w-1/3">
              <RadioCheckBox
                id="0"
                label={mapKeyLabel[0].label}
                name="juristicInfo"
                checked={resFrom2?.isJuristicThailand || false}
                onChange={(e) => handleCheckedBox(e, mapKeyLabel[0].key)}
              />
            </div>
            <div className="w-2/3 flex flex-col space-y-2">
              <RadioCheckBox
                id="1"
                label={mapKeyLabel[1].label}
                name="juristicInfo"
                checked={resFrom2?.isTaxExempt || false}
                onChange={(e) => handleCheckedBox(e, mapKeyLabel[1].key)}
              />
              <RadioCheckBox
                id="2"
                label={mapKeyLabel[2].label}
                name="juristicInfo"
                checked={resFrom2?.isNonTaxExempt || false}
                onChange={(e) => handleCheckedBox(e, mapKeyLabel[2].key)}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/3">
              <RadioCheckBox
                id="3"
                label={mapKeyLabel[3].label}
                name="juristicInfo"
                checked={resFrom2?.isJuristicForeign || false}
                onChange={(e) => handleCheckedBox(e, mapKeyLabel[3].key)}
              />
            </div>
            <div className="w-2/3 flex flex-col space-y-2">
              <RadioCheckBox
                id="4"
                label={mapKeyLabel[4].label}
                name="juristicInfo"
                checked={resFrom2?.isOperatingInThailand || false}
                onChange={(e) => handleCheckedBox(e, mapKeyLabel[4].key)}
              />
              <RadioCheckBox
                id="5"
                label={mapKeyLabel[5].label}
                name="juristicInfo"
                checked={resFrom2?.isNonOperatingInThailand || false}
                onChange={(e) => handleCheckedBox(e, mapKeyLabel[5].key)}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/3">
              <RadioCheckBox
                id="6"
                label={mapKeyLabel[6].label}
                name="juristicInfo"
                checked={resFrom2?.isOther || false}
                onChange={(e) => handleCheckedBox(e, mapKeyLabel[6].key)}
              />
            </div>
            <div className="w-2/3 flex flex-col space-y-2">
              <RadioCheckBox
                id="7"
                label={mapKeyLabel[7].label}
                name="juristicInfo"
                checked={resFrom2?.isPartnership || false}
                onChange={(e) => handleCheckedBox(e, mapKeyLabel[7].key)}
              />
              <RadioCheckBox
                id="8"
                label={mapKeyLabel[8].label}
                name="juristicInfo"
                checked={resFrom2?.isGovernmentStateEnterprise || false}
                onChange={(e) => handleCheckedBox(e, mapKeyLabel[8].key)}
              />
              <RadioCheckBox
                id="9"
                label={mapKeyLabel[9].label}
                name="juristicInfo"
                checked={resFrom2?.isCoOperative || false}
                onChange={(e) => handleCheckedBox(e, mapKeyLabel[9].key)}
              />
              <RadioCheckBox
                id="10"
                label={mapKeyLabel[10].label}
                name="juristicInfo"
                checked={resFrom2?.isTaxExemptCompany || false}
                onChange={(e) => handleCheckedBox(e, mapKeyLabel[10].key)}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h1 className="font-bold p-2">Business Type</h1>
        <div className="grid grid-cols-2 items-start gap-4 p-4">
          <RadioCheckBox
            id="11"
            label={mapKeyLabel[11].label}
            name="businessType"
            checked={resFrom2?.isAntiqueTrading || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[11].key)}
          />
          <RadioCheckBox
            id="12"
            label={mapKeyLabel[12].label}
            name="businessType"
            checked={resFrom2?.isHotelRestaurant || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[12].key)}
          />
          <RadioCheckBox
            id="13"
            label={mapKeyLabel[13].label}
            name="businessType"
            checked={resFrom2?.isArmament || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[13].key)}
          />
          <RadioCheckBox
            id="14"
            label={mapKeyLabel[14].label}
            name="businessType"
            checked={resFrom2?.isInsuranceAssurance || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[14].key)}
          />
          <RadioCheckBox
            id="15"
            label={mapKeyLabel[15].label}
            name="businessType"
            checked={resFrom2?.isCasinoGambling || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[15].key)}
          />
          <RadioCheckBox
            id="16"
            label={mapKeyLabel[16].label}
            name="businessType"
            checked={resFrom2?.isJewelryGoldTrading || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[16].key)}
          />
          <RadioCheckBox
            id="17"
            label={mapKeyLabel[17].label}
            name="businessType"
            checked={resFrom2?.isFoundation || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[17].key)}
          />
          <RadioCheckBox
            id="18"
            label={mapKeyLabel[18].label}
            name="businessType"
            checked={resFrom2?.isPropertyRealEstate || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[18].key)}
          />
          <RadioCheckBox
            id="19"
            label={mapKeyLabel[19].label}
            name="businessType"
            checked={resFrom2?.isMoneyTransfer || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[19].key)}
          />
          <RadioCheckBox
            id="20"
            label={mapKeyLabel[20].label}
            name="businessType"
            checked={resFrom2?.isEmploymentAgency || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[20].key)}
          />
          <RadioCheckBox
            id="21"
            label={mapKeyLabel[21].label}
            name="businessType"
            checked={resFrom2?.isEntertainment || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[21].key)}
          />
          <RadioCheckBox
            id="22"
            label={mapKeyLabel[22].label}
            name="businessType"
            checked={resFrom2?.isTravel || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[22].key)}
          />
          <RadioCheckBox
            id="23"
            label={mapKeyLabel[23].label}
            name="businessType"
            checked={resFrom2?.isFinancial || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[23].key)}
          />
          <RadioCheckBox
            id="24"
            label={mapKeyLabel[24].label}
            name="businessType"
            checked={resFrom2?.isEducationCenter || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[24].key)}
          />
          <RadioCheckBox
            id="25"
            label={mapKeyLabel[25].label}
            name="businessType"
            checked={resFrom2?.isForeignCurrencyExchange || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[25].key)}
          />
          <RadioCheckBox
            id="26"
            label={mapKeyLabel[26].label}
            name="businessType"
            checked={resFrom2?.isCryptoRelated || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[26].key)}
          />
          <RadioCheckBox
            id="27"
            label={mapKeyLabel[27].label}
            name="businessType"
            checked={resFrom2?.isOtherBusiness || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[27].key)}
          />
          {resFrom2?.isOtherBusiness && (
            <Input
              className="col-start-1"
              name="businessTypeOther"
              placeholder="Others Please Specific"
              onChange={handleInputOthersOption}
              value={resFrom2.otherBusinessType || ""}
            />
          )}
        </div>
      </Card>

      <Card>
        <h1 className="font-bold p-2">Source Of Income</h1>
        <div className="grid grid-cols-2 items-start gap-4 p-4">
          <CheckBox
            id="28"
            label={mapKeyLabel[28].label}
            name="sourceOfIncome"
            checked={resFrom2?.isRevenue || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[28].key)}
          />
          <CheckBox
            id="29"
            label={mapKeyLabel[29].label}
            name="sourceOfIncome"
            checked={resFrom2?.isStock || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[29].key)}
          />
          <CheckBox
            id="30"
            label={mapKeyLabel[30].label}
            name="sourceOfIncome"
            checked={resFrom2?.isDonation || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[30].key)}
          />
          <CheckBox
            id="31"
            label={mapKeyLabel[31].label}
            name="sourceOfIncome"
            checked={resFrom2?.isLoan || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[31].key)}
          />
          <CheckBox
            id="32"
            label={mapKeyLabel[32].label}
            name="sourceOfIncome"
            checked={resFrom2?.isRevenueSelling || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[32].key)}
          />
          <CheckBox
            id="33"
            label={mapKeyLabel[33].label}
            name="sourceOfIncome"
            checked={resFrom2?.isOtherIncome || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[33].key)}
            data-testid="sourceOfIncomeOther"
          />
          {resFrom2?.isOtherIncome && (
            <Input
              className="col-start-2"
              name="sourceOfIncomeOther"
              placeholder="Others Please Specific"
              onChange={handleInputOthersOption}
              value={resFrom2.otherIncome || ""}
            />
          )}
        </div>
      </Card>

      <Card>
        <h1 className="font-bold p-2">Country Source Of Income</h1>
        <div className="grid grid-cols-2 items-start gap-4 p-4">
          <RadioCheckBox
            id="34"
            label={mapKeyLabel[34].label}
            name="countrySourceOfIncome"
            checked={resFrom2?.corporateCountry?.isThailand === true}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[34].key)}
          />
          <RadioCheckBox
            id="35"
            label={mapKeyLabel[35].label}
            name="countrySourceOfIncome"
            checked={resFrom2?.corporateCountry?.isThailand === false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[35].key)}
          />
          {resFrom2?.corporateCountry?.isThailand === false && (
            <Input
              className="col-start-2"
              name="countrySourceOfIncomeOther"
              placeholder="Others Please Specify"
              onChange={handleInputOthersOption}
              value={resFrom2?.corporateCountry?.other || ""}
            />
          )}
        </div>

        <h1 className="font-bold p-2">Investment Objective</h1>
        <div className="p-4 space-y-2">
          <CheckBox
            id="36"
            label={mapKeyLabel[36].label}
            name="investmentObjective"
            checked={resFrom2?.isLiquidation || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[36].key)}
          />
          <CheckBox
            id="37"
            label={mapKeyLabel[37].label}
            name="investmentObjective"
            checked={resFrom2?.isInvestment || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[37].key)}
          />
          <CheckBox
            id="38"
            label={mapKeyLabel[38].label}
            name="investmentObjective"
            checked={resFrom2?.isCashManagement || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[38].key)}
          />
          <CheckBox
            id="39"
            label={mapKeyLabel[39].label}
            name="investmentObjective"
            checked={resFrom2?.isOtherInvestment || false}
            onChange={(e) => handleCheckedBox(e, mapKeyLabel[39].key)}
            data-testid="investmentObjectiveOther"
          />
          {resFrom2?.isOtherInvestment && (
            <Input
              className="w-1/2"
              name="investmentObjectiveOther"
              placeholder="Others Please Specific"
              onChange={handleInputOthersOption}
              value={resFrom2?.otherInvestment || ""}
              data-testid="investmentObjectiveOtherBox"
            />
          )}
        </div>

        <div className="p-4 flex justify-end relative">
          <Button
            className="absolute top-20 right-0 w-24 "
            onClick={(e) => onSubmit(e)}
          >
            Next Form
          </Button>
        </div>
      </Card>
    </>
  );
}

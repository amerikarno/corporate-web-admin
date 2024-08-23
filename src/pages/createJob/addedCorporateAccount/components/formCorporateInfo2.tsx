import { Card } from "@/components/ui/card";
import { mapKeyLabel } from "../constants2/variables";
import { CheckBox } from "@/components/Checkbox";
import { useFormCorporateInfo2 } from "../hook/useFormCorporateInfo2";
import { Input } from "@/components/ui/input";
import { TCorporateInfo } from "../constants2/types";
import { Button } from "@/components/ui/button";
import { RadioCheckBox } from "@/components/ui/Radio";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { TCorporateData } from "../../constant/type";

type TCorporateTypeAndIncomeProps = {
  corporateInfo?: TCorporateInfo;
  corporateCode?: string;
};

export function FormCorporateTypeAndIncome({}: // corporateCode,
TCorporateTypeAndIncomeProps) {
  const {
    // isBusinessTypeOthers,
    // isSourceOfIncomeOthers,
    // isCountrySourceOfIncomeOthers,
    // isInvestmentObjectiveOthers,
    // errors,
    // juristicAllType,
    // juristicAllOtherType,
    // handleCheck,
    // handleSubSelected,
    // handeleBusinessType,
    // handeleCountrySourceOfIncome,
    // handeleInvestmentObjective,
    // handeleSourceOfIncome,
    // handleInputOthers,
    // getError,
    // disableBusinessType,
    // disableCountrySourceOfIncome,
    // disableInvestmentObjective,
    // isDiabledJuristicType,
    // isDisableSubSelected,
    // validateForm,
    saveJuristicType,
    createJuristicType,
    // isCheckedByKeyValue,
    resFrom2,
    handleCheckedBox,
    handleInputOthersOption,
  } = useFormCorporateInfo2();

  
  // console.log(JSON.stringify(resFrom2, null, 2));
  const corporateData: TCorporateData = useSelector<RootState>(
    (state) => state.editCorporate
  ) as TCorporateData;
  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(resFrom2);
    
    if (corporateData.CountrySourceIncomes){
      console.log("do update")
      await saveJuristicType(resFrom2);
    }
    else{
      console.log("do create")
      await createJuristicType(resFrom2,corporateData);
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
          />
          {resFrom2?.isOtherInvestment && (
            <Input
              className="w-1/2"
              name="investmentObjectiveOther"
              placeholder="Others Please Specific"
              onChange={handleInputOthersOption}
              value={resFrom2?.otherInvestment || ""}
            />
          )}
        </div>

        <div className="p-4 flex justify-end">
          <Button onClick={(e) => onSubmit(e)}>Submit</Button>
        </div>
      </Card>
    </>
  );
}

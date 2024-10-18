import { RootState } from '@/app/store';
import { CheckBox } from '@/components/Checkbox';
import { Input } from '@/components/Input';
import { Card } from '@/components/ui/card';
import { CorporateResponse, TCorporateData, TDocuments } from '@/pages/createJob/changeCorporateAccount/constant/type';
import { mapKeyLabel, PrimaryCountryOfOperationChoices, registeredCountryChoices } from '@/pages/createJob/changeCorporateAccount/edit/constants/variables';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { columnsAttorney, columnsAuthorizePerson, columnsBank, columnsJuristicShareHolders, columnsListOfDirectors, columnsShareHolders, mapDataToTCorporateInfo, transformAttorneysToExpectedType, transformAuthorizedPersons, transformDirectorsToExpectedType, transformJuristicsToShareholders } from './utils';
import { subAddressSchema } from '@/pages/createJob/changeCorporateAccount/edit/constants/schemas';
import DataTable from 'react-data-table-component';
import { columnsContactPerson } from './utils';
import { getCheckedLabel, mapToUploadFile } from '@/pages/createJob/changeCorporateAccount/edit/libs/utils';
import { setFiles } from '@/features/uploadFile/uploadFileSlice';
import DocumentBox from '@/components/ui/BoxOfUploaded';
import { SuitTableResult } from '@/pages/createJob/changeCorporateAccount/edit/components/suitTableResult';
import { RadioCheckBox } from '@/components/ui/Radio';

const LandingPageCorporate = () => {

  const dispatch = useDispatch();
    const corporateData: TCorporateData = useSelector((state: RootState) => state.editCorporate);

    console.log(corporateData);

    const fields = Object.entries(subAddressSchema.shape);
    const newFields = [
        "Address Number",
        "Moo",
        "Soi",
        "Floor",
        "Building",
        "Road",
        "Tambon",
        "Amphoe",
        "Province",
        "PostalCode",
        "Country",
    ];

    const resCorpRegisterCountry = corporateData.CorporateCountry.find(
        (item) => item.types === 601
      );
      const resCorpPrimaryCountry = corporateData.CorporateCountry.find(
        (item) => item.types === 602
      );
      const resCorpCountrySourceOfInCome = corporateData.CorporateCountry.find(
        (item) => item.types === 603
      );
    const {
        register,
        reset,
        setValue,
      } = useForm<TCorporateData>({
      });

      const [resFrom2, setResForm2] = useState<CorporateResponse>(
        () => {
          // console.log(corpData);
          const {
            jrType,
            buType,
            srcOfIncome,
            countrySrcOfIncome,
            invType,
            countrySrcOfIncomeTh,
          } = getCheckedLabel(corporateData) || {};
      
          let res: CorporateResponse = {
            ...jrType,
            ...buType,
            ...srcOfIncome,
            ...countrySrcOfIncome,
            ...invType,
            ...countrySrcOfIncomeTh,
          };
          return res;
        }
      );

      useEffect(() => {
        console.log("reset(mapDataToTCorporateInfo(corporateData))!")
        reset(mapDataToTCorporateInfo(corporateData));
        const registeredCapitalValue =
        Number(corporateData.CorporateFinancials.registeredCapital ?? 0) / 100;
      const revenuePerYearValue = Number(corporateData.CorporateFinancials.revenuePerYear ?? 0) / 100;
      const netProfitValue = Number(corporateData.CorporateFinancials.netProfitLoss ?? 0) / 100;
      const shareholderEquityValue =
        Number(corporateData.CorporateFinancials.shareholderEquity ?? 0) / 100;
      if (!isNaN(registeredCapitalValue)) {
        setValue(
            "CorporateFinancials.registeredCapital",
            registeredCapitalValue
          );
      }
      if (!isNaN(revenuePerYearValue)) {
        setValue(
          "CorporateFinancials.revenuePerYear",
          revenuePerYearValue
        );
      }
      if (!isNaN(netProfitValue)) {
        setValue("CorporateFinancials.netProfitLoss",
             netProfitValue);
      }
      if (!isNaN(shareholderEquityValue)) {
        setValue(
          "CorporateFinancials.shareholderEquity",
          shareholderEquityValue
        );
      }
    }, []);

    const uploadFiles = (corporateData?.Documents ?? [])
    .map((uploadFile: any) => ({
      ...uploadFile,
      id: uploadFile.id,
    }))
    .map(mapToUploadFile)
    .filter((item: any) => item !== null) as TDocuments[];
  
  console.log(uploadFiles);
  dispatch(setFiles(uploadFiles));
    
  return (
    <div className="p-8 flex flex-col space-y-8">
        <Card className=" p-4 space-y-6">
          <h1 className="text-xl font-bold">Juristic Infomations</h1>
          <div className="flex">
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic ID</h1>
                <h1 className="">: {corporateData?.CorporateCode ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Juristic Investor Name</h1>
                <h1 className="">: {corporateData?.Info.name ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Commercial Number</h1>
                <h1 className="">
                  : {corporateData?.Info.registrationNo ?? ""}
                </h1>
              </div>
            </div>
            <div className="w-1/2 space-y-4">
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Tax ID</h1>
                <h1 className="">: {corporateData?.Info.taxId ?? ""}</h1>
              </div>
              <div className="flex flex-row gap-4">
                <h1 className="font-bold">Date Of Incorporation</h1>
                <h1 className="">
                  : {corporateData?.Info.dateOfIncorporation.split("T")[0]}
                </h1>
              </div>
            </div>
          </div>
        </Card>
      <Card className="w-full">
          <div className="p-4 space-y-4">
            <h1 className="col-span-4 font-bold pb-4">
              Juristic Investor Information-For Account Opening
            </h1>
            <Input
              id={"Juristic Investor Name"}
              label={"Juristic Investor Name"}
              {...register("Info.name")}
              name="name"
              disabled={true}
            />
            <Input
              id={"Commercial Registration No."}
              label={"Commercial Registration No."}
              {...register("Info.registrationNo")}
              name="registrationNo"
              disabled={true}
            />
            <Input
              id={"Juristic Investor Tax ID"}
              label={"Tax ID"}
              {...register("Info.taxId")}
              name="taxId"
              disabled={true}
            />
            <Input
              id={"Date Of Incorporation"}
              label={"Date of Incorporation"}
              {...register("Info.dateOfIncorporation")}
              name="dateOfIncorporation"
              type="date"
              disabled={true}
            />
          </div>

          <div className="p-4 space-y-4">
            <div className="p-4 border-t">
              <div className="flex flex-col space-y-4">
                <h1 className="font-bold">Registered Country</h1>
                <div className="flex items-center space-x-44">
                      <CheckBox
                      data-testid={`registeredCountry-${registeredCountryChoices[0]}`}
                      id={`checkbox-${registeredCountryChoices[0]}`}
                      key={registeredCountryChoices[0]}
                      label={registeredCountryChoices[0]}
                      checked={resCorpRegisterCountry?.isThailand || false}
                      disabled={true}
                      name={registeredCountryChoices[0]}
                      />
                  <div className="relative">
                    <CheckBox
                        data-testid={`registeredCountry-${registeredCountryChoices[1]}`}
                        id={`checkbox-${registeredCountryChoices[1]}`}
                        key={registeredCountryChoices[1]}
                        label={registeredCountryChoices[1]}
                        checked={resCorpRegisterCountry?.other !== '' || false}
                        disabled={true}
                        name={registeredCountryChoices[1]}
                    />
                    {resCorpRegisterCountry?.other && (
                      <Input
                        inputClassName="w-1/2 absolute h-8"
                        placeholder="Please Specify"
                        defaultValue={resCorpRegisterCountry?.other}
                        data-testid={`registeredCountry-otherInput`}
                        disabled={true}
                      />
                  )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="p-4 border-t">
              <div className="flex flex-col space-y-4">
                        <h1 className="font-bold">Primary Country of Operation</h1>
                          <div className="flex items-center space-x-44">
                        <CheckBox
                            data-testid={`primaryCountry-${PrimaryCountryOfOperationChoices[0]}`}
                            id={`checkbox2-${PrimaryCountryOfOperationChoices[0]}`}
                            key={PrimaryCountryOfOperationChoices[0]}
                            label={PrimaryCountryOfOperationChoices[0]}
                            checked={resCorpPrimaryCountry?.isThailand || false}
                            disabled={true}
                            name={PrimaryCountryOfOperationChoices[0]}
                        />
                  <div className="relative">
              <CheckBox
                data-testid={`primaryCountry-${PrimaryCountryOfOperationChoices[1]}`}
                id={`checkbox2-${PrimaryCountryOfOperationChoices[1]}`}
                key={PrimaryCountryOfOperationChoices[1]}
                label={PrimaryCountryOfOperationChoices[1]}
                checked={resCorpPrimaryCountry?.other !== '' || false}
                disabled={true}
                name={PrimaryCountryOfOperationChoices[1]}
              />
            {resCorpPrimaryCountry?.other && (
                <Input
                  inputClassName="w-1/2 absolute h-8"
                  placeholder="Please Specify"
                  defaultValue={resCorpPrimaryCountry?.other}
                  data-testid={`primaryCountry-otherInput`}
                  disabled={true}
                />
            )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <h1 className="font-bold pb-4">Registered/Business address </h1>
            <div className="grid md:grid-cols-2 gap-4">
                {fields.map(([fieldName], index) => {
                    return (
                    <div key={index} className="flex-col">
                        <Input
                            label={newFields[index]}
                            {...register(`CorporateAddress[0].address[0].${fieldName}` as keyof TCorporateData)}
                            name={`CorporateAddress[0].address[0].${fieldName}`}
                            id={`id-CorporateAddress[0].address[0].${fieldName}`}
                            type={"text"}
                            data-testid={`CorporateAddress[0].address[0].${fieldName}`}
                            disabled={true}
                        />
                    </div>
                    );
                })}
            </div>
            <div className="flex-col">
                <Input
                label="Email Address"
                {...register('CorporateAddress[0].emailAddress' as keyof TCorporateData)}
                name="CorporateAddress[0].emailAddress"
                id="id-CorporateAddress[0].emailAddress"
                type="text"
                data-testid="CorporateAddress[0].emailAddress"
                disabled={true}
                />
            </div>
            <div className="flex-col">
                <Input
                label="Telephone"
                {...register('CorporateAddress[0].telephone' as keyof TCorporateData)}
                name="CorporateAddress[0].telephone"
                id="id-CorporateAddress[0].telephone"
                type="text"
                data-testid="CorporateAddress[0].telephone"
                disabled={true}
                />
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex flex-col space-y-4 ">
              <h1 className="font-bold">Place Of Incorporate </h1>
              <div className="grid md:grid-cols-2 gap-4">
                {fields.map(([fieldName], index) => {
                    return (
                    <div key={index} className="flex-col">
                        <Input
                            label={newFields[index]}
                            {...register(`CorporateAddress[1].address[0].${fieldName}` as keyof TCorporateData)}
                            name={`CorporateAddress[1].address[0].${fieldName}`}
                            id={`id-CorporateAddress[1].address[0].${fieldName}`}
                            type={"text"}
                            data-testid={`CorporateAddress[1].address[0].${fieldName}`}
                            disabled={true}
                        />
                    </div>
                    );
                })}
                </div>
                <div className="flex-col">
                    <Input
                    label="Email Address"
                    {...register('CorporateAddress[1].emailAddress' as keyof TCorporateData)}
                    name="CorporateAddress[1].emailAddress"
                    id="id-CorporateAddress[1].emailAddress"
                    type="text"
                    data-testid="CorporateAddress[1].emailAddress"
                    disabled={true}
                    />
                </div>
                <div className="flex-col">
                    <Input
                    label="Telephone"
                    {...register('CorporateAddress[1].telephone' as keyof TCorporateData)}
                    name="CorporateAddress[1].telephone"
                    id="id-CorporateAddress[1].telephone"
                    type="text"
                    data-testid="CorporateAddress[1].telephone"
                    disabled={true}
                    />
                </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <h1 className="col-span-4 font-bold">Financial Information </h1>
            <Input
              step="0.01"
              id={"Registered Capital"}
              label={"Registered Capital"}
              {...register("CorporateFinancials.registeredCapital")}
              name="registeredCapital"
              data-testid="registeredCapital"
              disabled={true}
            />
            <Input
              step="0.01"
              id={"Revenue Per Year"}
              label={"Revenue Per Year"}
              {...register("CorporateFinancials.revenuePerYear")}
              name="revenuePerYear"
              data-testid="revenuePerYear"
              disabled={true}
            />
            <Input
              step="0.01"
              id={"Net Profit (Loss)"}
              label={"Net Profit (Loss)"}
              {...register("CorporateFinancials.netProfitLoss")}
              name="netProFitLoss"
              data-testid="netProFitLoss"
              disabled={true}
            />
            <Input
              step="0.01"
              id={"Operating Expense Per Year"}
              label={"Shareholder's equity"}
              {...register("CorporateFinancials.shareholderEquity")}
              name="shareholderEquity"
              data-testid="shareholderEquity"
              disabled={true}
            />
          </div>
      </Card>
      <Card>
        <div className="p-4 space-y-8">
          <div className="flex flex-row">
            <div className="w-1/3">
              <RadioCheckBox
                id="0"
                label={mapKeyLabel[0].label}
                name="juristicInfo"
                checked={resFrom2?.isJuristicThailand || false}
              />
            </div>
            <div className="w-2/3 flex flex-col space-y-2">
              <RadioCheckBox
                id="1"
                label={mapKeyLabel[1].label}
                name="juristicInfo"
                checked={resFrom2?.isTaxExempt || false}
              />
              <RadioCheckBox
                id="2"
                label={mapKeyLabel[2].label}
                name="juristicInfo"
                checked={resFrom2?.isNonTaxExempt || false}
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
              />
            </div>
            <div className="w-2/3 flex flex-col space-y-2">
              <RadioCheckBox
                id="4"
                label={mapKeyLabel[4].label}
                name="juristicInfo"
                checked={resFrom2?.isOperatingInThailand || false}
              />
              <RadioCheckBox
                id="5"
                label={mapKeyLabel[5].label}
                name="juristicInfo"
                checked={resFrom2?.isNonOperatingInThailand || false}
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
              />
            </div>
            <div className="w-2/3 flex flex-col space-y-2">
              <RadioCheckBox
                id="7"
                label={mapKeyLabel[7].label}
                name="juristicInfo"
                checked={resFrom2?.isPartnership || false}
              />
              <RadioCheckBox
                id="8"
                label={mapKeyLabel[8].label}
                name="juristicInfo"
                checked={resFrom2?.isGovernmentStateEnterprise || false}
              />
              <RadioCheckBox
                id="9"
                label={mapKeyLabel[9].label}
                name="juristicInfo"
                checked={resFrom2?.isCoOperative || false}
              />
              <RadioCheckBox
                id="10"
                label={mapKeyLabel[10].label}
                name="juristicInfo"
                checked={resFrom2?.isTaxExemptCompany || false}
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
          />
          <RadioCheckBox
            id="12"
            label={mapKeyLabel[12].label}
            name="businessType"
            checked={resFrom2?.isHotelRestaurant || false}
          />
          <RadioCheckBox
            id="13"
            label={mapKeyLabel[13].label}
            name="businessType"
            checked={resFrom2?.isArmament || false}
          />
          <RadioCheckBox
            id="14"
            label={mapKeyLabel[14].label}
            name="businessType"
            checked={resFrom2?.isInsuranceAssurance || false}
          />
          <RadioCheckBox
            id="15"
            label={mapKeyLabel[15].label}
            name="businessType"
            checked={resFrom2?.isCasinoGambling || false}
          />
          <RadioCheckBox
            id="16"
            label={mapKeyLabel[16].label}
            name="businessType"
            checked={resFrom2?.isJewelryGoldTrading || false}
          />
          <RadioCheckBox
            id="17"
            label={mapKeyLabel[17].label}
            name="businessType"
            checked={resFrom2?.isFoundation || false}
          />
          <RadioCheckBox
            id="18"
            label={mapKeyLabel[18].label}
            name="businessType"
            checked={resFrom2?.isPropertyRealEstate || false}
          />
          <RadioCheckBox
            id="19"
            label={mapKeyLabel[19].label}
            name="businessType"
            checked={resFrom2?.isMoneyTransfer || false}
          />
          <RadioCheckBox
            id="20"
            label={mapKeyLabel[20].label}
            name="businessType"
            checked={resFrom2?.isEmploymentAgency || false}
          />
          <RadioCheckBox
            id="21"
            label={mapKeyLabel[21].label}
            name="businessType"
            checked={resFrom2?.isEntertainment || false}
          />
          <RadioCheckBox
            id="22"
            label={mapKeyLabel[22].label}
            name="businessType"
            checked={resFrom2?.isTravel || false}
          />
          <RadioCheckBox
            id="23"
            label={mapKeyLabel[23].label}
            name="businessType"
            checked={resFrom2?.isFinancial || false}
          />
          <RadioCheckBox
            id="24"
            label={mapKeyLabel[24].label}
            name="businessType"
            checked={resFrom2?.isEducationCenter || false}
          />
          <RadioCheckBox
            id="25"
            label={mapKeyLabel[25].label}
            name="businessType"
            checked={resFrom2?.isForeignCurrencyExchange || false}
          />
          <RadioCheckBox
            id="26"
            label={mapKeyLabel[26].label}
            name="businessType"
            checked={resFrom2?.isCryptoRelated || false}
          />
          <div className="flex flex-col space-y-4">
            <RadioCheckBox
              id="27"
              label={mapKeyLabel[27].label}
              name="businessType"
              checked={resFrom2?.isOtherBusiness || false}
            />
            {resFrom2?.isOtherBusiness && (
              <Input
                inputClassName='w-1/3 '
                name="businessTypeOther"
                placeholder="Others Please Specific"
                value={resFrom2.otherBusinessType || ""}
              />
            )}
          </div>
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
          />
          <CheckBox
            id="29"
            label={mapKeyLabel[29].label}
            name="sourceOfIncome"
            checked={resFrom2?.isStock || false}
          />
          <CheckBox
            id="30"
            label={mapKeyLabel[30].label}
            name="sourceOfIncome"
            checked={resFrom2?.isDonation || false}
          />
          <CheckBox
            id="31"
            label={mapKeyLabel[31].label}
            name="sourceOfIncome"
            checked={resFrom2?.isLoan || false}
          />
          <CheckBox
            id="32"
            label={mapKeyLabel[32].label}
            name="sourceOfIncome"
            checked={resFrom2?.isRevenueSelling || false}
          />
          <div className="flex flex-col space-y-4">
            <CheckBox
              id="33"
              label={mapKeyLabel[33].label}
              name="sourceOfIncome"
              checked={resFrom2?.isOtherIncome || false}
              data-testid="sourceOfIncomeOther"
            />
            {resFrom2?.isOtherIncome && (
              <Input
                inputClassName="w-1/3"
                name="sourceOfIncomeOther"
                placeholder="Others Please Specific"
                value={resFrom2.otherIncome || ""}
              />
            )}
          </div>
        </div>
      </Card>

      <Card>
        <h1 className="font-bold p-2">Country Source Of Income</h1>
        <div className="grid grid-cols-2 items-start gap-4 p-4">
          <RadioCheckBox
            id="34"
            label={mapKeyLabel[34].label}
            name="countrySourceOfIncome"
            checked={resCorpCountrySourceOfInCome?.isThailand === true}
          />
          <div className="flex flex-col space-y-4">
            <RadioCheckBox
              id="35"
              label={mapKeyLabel[35].label}
              name="countrySourceOfIncome"
              checked={resCorpCountrySourceOfInCome?.isThailand === false}
            />
            {resCorpCountrySourceOfInCome?.isThailand === false && (
              <Input
                inputClassName="w-1/3"
                name="countrySourceOfIncomeOther"
                placeholder="Others Please Specify"
                value={resCorpCountrySourceOfInCome?.other || ""}
              />
            )}
          </div>
        </div>

        <h1 className="font-bold p-2">Investment Objective</h1>
        <div className="p-4 space-y-2">
          <CheckBox
            id="36"
            label={mapKeyLabel[36].label}
            name="investmentObjective"
            checked={resFrom2?.isLiquidation || false}
          />
          <CheckBox
            id="37"
            label={mapKeyLabel[37].label}
            name="investmentObjective"
            checked={resFrom2?.isInvestment || false}
          />
          <CheckBox
            id="38"
            label={mapKeyLabel[38].label}
            name="investmentObjective"
            checked={resFrom2?.isCashManagement || false}
          />
          <div className="flex flex-col space-y-4">
            <CheckBox
              id="39"
              label={mapKeyLabel[39].label}
              name="investmentObjective"
              checked={resFrom2?.isOtherInvestment || false}
              data-testid="investmentObjectiveOther"
            />
            {resFrom2?.isOtherInvestment && (
              <Input
                className="w-1/3"
                name="investmentObjectiveOther"
                placeholder="Others Please Specific"
                value={resFrom2?.otherInvestment || ""}
                data-testid="investmentObjectiveOtherBox"
              />
            )}
          </div>
        </div>
      </Card>
      <Card>
        <DataTable
            title="Contact Person"
            columns={columnsContactPerson}
            data={corporateData.Contact || []}
            clearSelectedRows
            />
      </Card>
      <Card>
          <DataTable
            title="List of Directors"
            columns={columnsListOfDirectors}
            data={transformDirectorsToExpectedType(corporateData.Directors)}
            clearSelectedRows
          />
      </Card>
      <Card>
          <DataTable
            title="List of Shareholders holding from 25% of shares"
            columns={columnsShareHolders}
            data={corporateData.IndividualShareholders || []}
            clearSelectedRows
          />
      </Card>
      <Card>
          <DataTable
            title="Juristics shareholders of juristic's owner"
            columns={columnsJuristicShareHolders}
            data={transformJuristicsToShareholders(corporateData.Juristics)}
            clearSelectedRows
          />
      </Card>
      <Card>
          <DataTable
            title="Authorized person of Juristic Investor for traction"
            columns={columnsAuthorizePerson}
            data={transformAuthorizedPersons(corporateData.AuthorizedPersons)}
          />
      </Card>
      <Card>
          <DataTable
            title="List of Attorney"
            columns={columnsAttorney}
            data={transformAttorneysToExpectedType(corporateData.Attorneys || [])}
          />
        </Card>
        <Card>
        <DataTable
          title="Bank Accounts Intended to Deposit and Withdraw Fiat Fund"
          columns={columnsBank}
          data={corporateData.Banks.map((bank) => ({ bank: [bank] }))}
          clearSelectedRows
        />
        </Card>
        <Card className="p-4">
          <span className="text-2xl">Uploaded Documents</span>
          <div className="flex p-4 gap-2">
              {uploadFiles && uploadFiles.length > 0
                ? uploadFiles.map((document, index) => (
                    <DocumentBox
                      key={index}
                      fileName={document?.fileName}
                      corporateCode={document?.corporateCode}
                      id={document?.id}
                    />
                  ))
                : "No document available"}
            </div>
        </Card>
        <Card>
        {corporateData.SuitTestResult ? 
        (<SuitTableResult totalScore={corporateData?.SuitTestResult?.totalScore ?? 0} />) 
              :
        (<div>
          no suit test done
        </div>)
        }
        </Card>
    </div>
  )
}

export default LandingPageCorporate

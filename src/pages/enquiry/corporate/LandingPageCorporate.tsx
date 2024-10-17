import { RootState } from '@/app/store';
import { CheckBox } from '@/components/Checkbox';
import { Input } from '@/components/Input';
import { Card } from '@/components/ui/card';
import { TCorporateData } from '@/pages/createJob/changeCorporateAccount/constant/type';
import { PrimaryCountryOfOperationChoices, registeredCountryChoices } from '@/pages/createJob/changeCorporateAccount/edit/constants/variables';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { mapDataToTCorporateInfo } from './utils';
import { subAddressSchema } from '@/pages/createJob/changeCorporateAccount/edit/constants/schemas';

const LandingPageCorporate = () => {

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
    const {
        register,
        reset,
        setValue,
      } = useForm<TCorporateData>({
      });

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
  return (
    <div className="p-8 flex justify-center">
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
              <div className="flex">
                <div className="">
                    <h1 className="font-bold">Registered Country</h1>
                    <CheckBox
                    data-testid={`registeredCountry-${registeredCountryChoices[0]}`}
                    id={`checkbox-${registeredCountryChoices[0]}`}
                    key={registeredCountryChoices[0]}
                    label={registeredCountryChoices[0]}
                    checked={resCorpRegisterCountry?.isThailand || false}
                    disabled={true}
                    name={registeredCountryChoices[0]}
                    />
                </div>
                <CheckBox
                    data-testid={`registeredCountry-${registeredCountryChoices[1]}`}
                    id={`checkbox-${registeredCountryChoices[1]}`}
                    key={registeredCountryChoices[1]}
                    label={registeredCountryChoices[1]}
                    checked={resCorpRegisterCountry?.other !== '' || false}
                    disabled={true}
                    name={registeredCountryChoices[1]}
                />
              </div>
            </div>
            {resCorpRegisterCountry?.other && (
              <div className="flex justify-end px-4 py-2">
                <Input
                  className="w-1/2"
                  placeholder="Please Specify"
                  defaultValue={resCorpRegisterCountry?.other}
                  data-testid={`registeredCountry-otherInput`}
                  disabled={true}
                />
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2">
                <div className="flex">
                    <div className="">
                        <h1 className="font-bold pb-4">Primary Country of Operation</h1>
                        <CheckBox
                            data-testid={`primaryCountry-${PrimaryCountryOfOperationChoices[0]}`}
                            id={`checkbox2-${PrimaryCountryOfOperationChoices[0]}`}
                            key={PrimaryCountryOfOperationChoices[0]}
                            label={PrimaryCountryOfOperationChoices[0]}
                            checked={resCorpPrimaryCountry?.isThailand || false}
                            disabled={true}
                            name={PrimaryCountryOfOperationChoices[0]}
                        />
                    </div>
              <CheckBox
                data-testid={`primaryCountry-${PrimaryCountryOfOperationChoices[1]}`}
                id={`checkbox2-${PrimaryCountryOfOperationChoices[1]}`}
                key={PrimaryCountryOfOperationChoices[1]}
                label={PrimaryCountryOfOperationChoices[1]}
                checked={resCorpPrimaryCountry?.other !== '' || false}
                disabled={true}
                name={PrimaryCountryOfOperationChoices[1]}
              />
            </div>
            {resCorpPrimaryCountry?.other && (
              <div className="flex justify-end px-4 py-2">
                <Input
                  className="w-1/2"
                  placeholder="Please Specify"
                  defaultValue={resCorpPrimaryCountry?.other}
                  data-testid={`primaryCountry-otherInput`}
                  disabled={true}
                />
              </div>
            )}
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
    </div>
  )
}

export default LandingPageCorporate

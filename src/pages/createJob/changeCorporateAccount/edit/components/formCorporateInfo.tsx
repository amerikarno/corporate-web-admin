import { useForm } from "react-hook-form";
import {
  corporateInfoSchema,
  registeredCountryPrimaryCountryOperationSchema,
  TCorporateInfoSchema,
} from "../constants/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TCorporateInfo,
  TRegisteredCountryPrimaryCountryOperation,
} from "../constants/types";
import { sleep } from "@/lib/utils";
//import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CorporateAddressForm } from "./CorporateAddressForm";
import { Input } from "@/components/Input";
import { Input as OtherInput } from "@/components/ui/input";
import { CheckBox } from "@/components/Checkbox";
// import { useFormCorporateInfo } from "@/pages/corporate/hook/useFormCorporateInfo";
import {
  registeredCountryChoices,
  PrimaryCountryOfOperationChoices,
} from "../constants/variables";
import { useState, useEffect } from "react";
import { TCorporateData } from "../../constant/type";
// import { ZodIssue } from "zod";
import { copy } from "@/lib/utils";
import { z } from "zod";
import { getCookies } from "@/lib/Cookies";
import { emptyRegisteredCountryPrimaryCountryOperation } from "../constants/initialData";
import { useDispatch } from "react-redux";
import { CommaInput } from "@/components/ui/cmmaAutoInput";

type TCorporateInfoFormProps = {
  onsubmit: (data: TCorporateInfo) => void;
  initData?: TCorporateInfoSchema;
  corporatesInfo?: TCorporateData;
};

export function FormCorporateInfo({
  onsubmit,
  initData,
  corporatesInfo,
}: TCorporateInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TCorporateInfoSchema>({
    resolver: zodResolver(corporateInfoSchema),
    defaultValues: initData,
  });

  const [shouldScrollUp, setShouldScrollUp] = useState<boolean>(false);
  const [placeIncorporateValue, setPlaceIncorporateValue] = useState<string>(
    corporatesInfo?.CorporateCode.toString() ? "place-radio-2" : "place-radio-1"
  );
  const resCorpRegisterCountry = corporatesInfo?.CorporateCountry.find(
    (item) => item.types === 601
  );
  const resCorpPrimaryCountry = corporatesInfo?.CorporateCountry.find(
    (item) => item.types === 602
  );
  const initCountryData: TRegisteredCountryPrimaryCountryOperation = {
    registered: resCorpRegisterCountry?.other || "",
    isRegisteredThailand: resCorpRegisterCountry?.isThailand ?? false,
    isRegisteredOther: resCorpRegisterCountry
      ? !resCorpRegisterCountry.isThailand
      : false,
    primary: resCorpPrimaryCountry?.other || "",
    isPrimaryCountry: resCorpPrimaryCountry?.isThailand ?? false,
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
  const token = getCookies();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(initData);
    if (initData) {
      reset(initData);
      const registeredCapitalValue =
        Number(initData.registeredCapital ?? 0) / 100;
      const revenuePerYearValue = Number(initData.revenuePerYear ?? 0) / 100;
      const netProfitValue = Number(initData.netProFitLoss ?? 0) / 100;
      const shareholderEquityValue =
        Number(initData.shareholderEquity ?? 0) / 100;
      if (!isNaN(registeredCapitalValue)) {
        setValue(
          "registeredCapital",
          registeredCapitalValue.toFixed(2).toLocaleString()
        );
      }
      if (!isNaN(revenuePerYearValue)) {
        setValue(
          "revenuePerYear",
          revenuePerYearValue.toFixed(2).toLocaleString()
        );
      }
      if (!isNaN(netProfitValue)) {
        setValue("netProFitLoss", netProfitValue.toFixed(2).toLocaleString());
      }
      if (!isNaN(shareholderEquityValue)) {
        setValue(
          "shareholderEquity",
          shareholderEquityValue.toFixed(2).toLocaleString()
        );
      }
    }
  }, [initData]);

  useEffect(() => {
    if (initData) {
      const registeredCapitalValue =
        Number(initData.registeredCapital ?? 0) / 100;
      const revenuePerYearValue = Number(initData.revenuePerYear ?? 0) / 100;
      const netProfitValue = Number(initData.netProFitLoss ?? 0) / 100;
      const shareholderEquityValue =
        Number(initData.shareholderEquity ?? 0) / 100;

      if (!isNaN(registeredCapitalValue)) {
        setValue(
          "registeredCapital",
          registeredCapitalValue.toFixed(2).toLocaleString()
        );
      }
      if (!isNaN(revenuePerYearValue)) {
        setValue(
          "revenuePerYear",
          revenuePerYearValue.toFixed(2).toLocaleString()
        );
      }
      if (!isNaN(netProfitValue)) {
        setValue("netProFitLoss", netProfitValue.toFixed(2).toLocaleString());
      }
      if (!isNaN(shareholderEquityValue)) {
        setValue(
          "shareholderEquity",
          shareholderEquityValue.toFixed(2).toLocaleString()
        );
      }
    }
  }, [placeIncorporateValue]);

  useEffect(() => {
    if (shouldScrollUp) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setShouldScrollUp(false);
    }
  }, [shouldScrollUp]);

  useEffect(() => {
    console.log(corporatesInfo?.CorporateCountry);
    const resCorpRegisterCountry = corporatesInfo?.CorporateCountry.find(
      (item) => item.types === 601
    );
    console.log(resCorpRegisterCountry);
    const resCorpPrimaryCountry = corporatesInfo?.CorporateCountry.find(
      (item) => item.types === 602
    );
    console.log(resCorpPrimaryCountry);
    setRegisteredCountryPrimaryCountryOperation({
      ...initCountryData,
      registered: resCorpRegisterCountry?.other || "",
      isRegisteredThailand: resCorpRegisterCountry?.isThailand || false,
      isRegisteredOther: resCorpRegisterCountry?.other
        ? resCorpRegisterCountry?.other === "Thailand"
          ? false
          : true
        : false,
      primary: resCorpPrimaryCountry?.other || "",
      isPrimaryCountry: resCorpPrimaryCountry?.isThailand || false,
      isPrimaryOther: resCorpPrimaryCountry?.other
        ? resCorpPrimaryCountry?.other === "Thailand"
          ? false
          : true
        : false,
    });
  }, [token, dispatch, initData]);

  const [
    // isPrimaryCountryOfOperationOthers,
    // setIsPrimaryCountryOfOperationOthers,
  ] = useState<boolean>(resCorpPrimaryCountry?.isThailand ? false : true);

  const handleRegisteredCountryOthers = (e: any) => {
    const { name, checked } = e.target;
    let tmp = copy(registeredCountryPrimaryCountryOperation);
    if (name === "Thailand") {
      tmp.registered = "";
      tmp.isRegisteredThailand = checked;
      tmp.isRegisteredOther = false;
    } else if (name === "Others Countries (Please Specify)") {
      tmp.registered = "";
      tmp.isRegisteredThailand = false;
      tmp.isRegisteredOther = checked;
    }

    setRegisteredCountryPrimaryCountryOperation(tmp);
    // if (name == "Others Countries (Please Specify)") {
    //   setIsRegisteredCountryOthers(checked);
    // }
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
      tmp.primary = "";
      tmp.isPrimaryCountry = checked;
      tmp.isPrimaryOther = false;
    } else {
      tmp.primary = "";
      tmp.isPrimaryCountry = false;
      tmp.isPrimaryOther = checked;
    }
    setRegisteredCountryPrimaryCountryOperation(tmp);
    // if (name == "Others Countries (Please Specify)") {
    //   setIsPrimaryCountryOfOperationOthers(checked);
    // }
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

  const validateLocal = (obj: TRegisteredCountryPrimaryCountryOperation) => {
    try {
      registeredCountryPrimaryCountryOperationSchema.parse(obj);
      // handleErrors(null);
    } catch (e) {
      if (e instanceof z.ZodError) {
        console.log(e.errors);
        // handleErrors(e.errors);
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

  const formatFinancialValue = (value: string | undefined): number => {
    if (!value) return 0;

    let newValue = value.replace(/,/g, "");

    if (!newValue.includes(".")) {
      newValue += ".00";
    } else {
      const [integerPart, decimalPart] = newValue.split(".");
      newValue = integerPart + "." + (decimalPart + "00").slice(0, 2);
    }

    return parseFloat(newValue) * 100;
  };
  const onSubmit = async (data: TCorporateInfoSchema) => {
    const dateData = Date.parse(data.dateofincorporation);
    const formData: TCorporateInfo = {
      ...data,
      registeredCapital: formatFinancialValue(data.registeredCapital),
      revenuePerYear: formatFinancialValue(data.revenuePerYear),
      netProFitLoss: formatFinancialValue(data.netProFitLoss),
      shareholderEquity: formatFinancialValue(data.shareholderEquity),
      corporateCode: corporatesInfo?.CorporateCode.toString(),
      dateofincorporation: new Date(dateData).toISOString(),
      registered: registeredCountryPrimaryCountryOperation.registered,
      isRegisteredOther:
        registeredCountryPrimaryCountryOperation.isRegisteredOther,
      isRegisteredThailand:
        registeredCountryPrimaryCountryOperation.isRegisteredThailand,
      primary: registeredCountryPrimaryCountryOperation.primary,
      isPrimaryCountry:
        registeredCountryPrimaryCountryOperation.isPrimaryCountry,
      isPrimaryOther: registeredCountryPrimaryCountryOperation.isPrimaryOther,
      registeredBusiness: {
        address: [
          {
            addressNo: data.registeredBusiness.address[0].addressNo,
            mooNo: data.registeredBusiness.address[0].mooNo,
            building: data.registeredBusiness.address[0].building,
            floor: data.registeredBusiness.address[0].floor,
            soi: data.registeredBusiness.address[0].soi,
            road: data.registeredBusiness.address[0].road,
            tambon: data.registeredBusiness.address[0].tambon,
            amphoe: data.registeredBusiness.address[0].amphoe,
            province: data.registeredBusiness.address[0].province,
            postalCode: data.registeredBusiness.address[0].postalCode,
            country: data.registeredBusiness.address[0].country,
          },
        ],
        emailAddress: data.registeredBusiness.emailAddress,
        telephone: data.registeredBusiness.telephone,
      },
      placeofIncorporation:
        placeIncorporateValue === "place-radio-1"
          ? {
              address: [
                {
                  addressNo:
                    data.registeredBusiness.address[0]?.addressNo ?? "",
                  mooNo: data.registeredBusiness.address[0]?.mooNo ?? "",
                  building: data.registeredBusiness.address[0]?.building ?? "",
                  floor: data.registeredBusiness.address[0]?.floor ?? "",
                  soi: data.registeredBusiness.address[0]?.soi ?? "",
                  road: data.registeredBusiness.address[0]?.road ?? "",
                  tambon: data.registeredBusiness.address[0]?.tambon ?? "",
                  amphoe: data.registeredBusiness.address[0]?.amphoe ?? "",
                  province: data.registeredBusiness.address[0]?.province ?? "",
                  postalCode:
                    data.registeredBusiness.address[0]?.postalCode ?? "",
                  country: data.registeredBusiness.address[0]?.country ?? "",
                },
              ],
              emailAddress: data.registeredBusiness.emailAddress ?? "",
              telephone: data.registeredBusiness.telephone ?? "",
            }
          : {
              address: [
                {
                  addressNo:
                    data.placeofIncorporation.address[0]?.addressNo ?? "",
                  mooNo: data.placeofIncorporation.address[0]?.mooNo ?? "",
                  building:
                    data.placeofIncorporation.address[0]?.building ?? "",
                  floor: data.placeofIncorporation.address[0]?.floor ?? "",
                  soi: data.placeofIncorporation.address[0]?.soi ?? "",
                  road: data.placeofIncorporation.address[0]?.road ?? "",
                  tambon: data.placeofIncorporation.address[0]?.tambon ?? "",
                  amphoe: data.placeofIncorporation.address[0]?.amphoe ?? "",
                  province:
                    data.placeofIncorporation.address[0]?.province ?? "",
                  postalCode:
                    data.placeofIncorporation.address[0]?.postalCode ?? "",
                  country: data.placeofIncorporation.address[0]?.country ?? "",
                },
              ],
              emailAddress: data.placeofIncorporation.emailAddress ?? "",
              telephone: data.placeofIncorporation.telephone ?? "",
            },
    };
    await sleep(500);
    reset();
    onsubmit(formData);
    setShouldScrollUp(true);
    console.log("formdata : ", formData);
  };

  return (
    <>
      <Card>
        <form
          id="corporateInfoEdit"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-row gap-y-8"
        >
          <div className="p-4 space-y-4">
            <h1 className="col-span-4 font-bold pb-4">
              Juristic Investor Information-For Account Opening
            </h1>
            <Input
              id={"Juristic Investor Name"}
              label={"Juristic Investor Name"}
              {...register("name")}
              name="name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <Input
              id={"Commercial Registration No."}
              label={"Commercial Registration No."}
              {...register("registrationNo")}
              name="registrationNo"
              disabled={isSubmitting}
            />
            {errors.registrationNo && (
              <p className="text-red-500">{errors.registrationNo.message}</p>
            )}
            <Input
              id={"Juristic Investor Tax ID"}
              label={"Tax ID"}
              {...register("taxId")}
              name="taxId"
              disabled={isSubmitting}
            />
            {errors.taxId && (
              <p className="text-red-500">{errors.taxId.message}</p>
            )}
            <Input
              id={"Date Of Incorporation"}
              label={"Date of Incorporation"}
              {...register("dateofincorporation")}
              name="dateofincorporation"
              type="date"
              disabled={isSubmitting}
            />
            {errors.dateofincorporation && (
              <p className="text-red-500">
                {errors.dateofincorporation.message}
              </p>
            )}
          </div>

          <div className="p-4 space-y-4">
            <div className="p-4 border-t">
              <div className="grid grid-cols-2 ">
                <h1 className="font-bold pb-4">Registered Country</h1>
                <div></div>
                <CheckBox
                  id={`checkbox-${registeredCountryChoices[0]}`}
                  key={registeredCountryChoices[0]}
                  label={registeredCountryChoices[0]}
                  checked={
                    registeredCountryPrimaryCountryOperation.isRegisteredThailand
                  }
                  onChange={(e) => {
                    handleRegisteredCountryOthers(e);
                  }}
                  name={registeredCountryChoices[0]}
                />
                <CheckBox
                  id={`checkbox-${registeredCountryChoices[1]}`}
                  key={registeredCountryChoices[1]}
                  label={registeredCountryChoices[1]}
                  checked={
                    registeredCountryPrimaryCountryOperation.isRegisteredOther
                  }
                  onChange={(e) => {
                    handleRegisteredCountryOthers(e);
                  }}
                  name={registeredCountryChoices[1]}
                />
              </div>
              {registeredCountryPrimaryCountryOperation.isRegisteredOther && (
                <div className="flex justify-end px-4 py-2">
                  <OtherInput
                    className="w-1/2"
                    placeholder="Please Specify"
                    onChange={(e) => handleInputOthers(e, "registered")}
                    defaultValue={resCorpRegisterCountry?.other}
                  />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 ">
                <h1 className="font-bold pb-4">Primary Country of Operation</h1>
                <div></div>
                <CheckBox
                  id={`checkbox2-${PrimaryCountryOfOperationChoices[0]}`}
                  key={PrimaryCountryOfOperationChoices[0]}
                  label={PrimaryCountryOfOperationChoices[0]}
                  checked={
                    registeredCountryPrimaryCountryOperation.isPrimaryCountry
                  }
                  onChange={(e) => {
                    handlePrimaryCountryOfOperationOthers(e);
                  }}
                  name={PrimaryCountryOfOperationChoices[0]}
                />
                <CheckBox
                  id={`checkbox2-${PrimaryCountryOfOperationChoices[1]}`}
                  key={PrimaryCountryOfOperationChoices[1]}
                  label={PrimaryCountryOfOperationChoices[1]}
                  checked={
                    registeredCountryPrimaryCountryOperation.isPrimaryOther
                  }
                  onChange={(e) => {
                    handlePrimaryCountryOfOperationOthers(e);
                  }}
                  name={PrimaryCountryOfOperationChoices[1]}
                />
              </div>
              {registeredCountryPrimaryCountryOperation.isPrimaryOther && (
                <div className="flex justify-end px-4 py-2">
                  <OtherInput
                    className="w-1/2"
                    placeholder="Please Specify"
                    onChange={(e) => handleInputOthers(e, "primary")}
                    defaultValue={resCorpPrimaryCountry?.other}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="p-4 space-y-4">
            <h1 className="font-bold pb-4">Registered/Business address </h1>

            <CorporateAddressForm
              errors={errors.registeredBusiness?.address?.[0]}
              register={register}
              isSubmitting={isSubmitting}
              keyType="registeredBusiness"
            />
          </div>
          <div className="p-4 space-y-4">
            <div className="flex flex-col space-y-4 ">
              <h1 className="font-bold">Place Of Incorporate </h1>
              <div className="flex space-x-6">
                <div className="space-x-2">
                  <input
                    id="radio-1"
                    name="radio-for-placeincorporate"
                    type="radio"
                    checked={placeIncorporateValue === "place-radio-1"}
                    onChange={() => setPlaceIncorporateValue("place-radio-1")}
                  />
                  <label htmlFor="radio-1">
                    Use Registered/Business Address
                  </label>
                </div>
                <div className="space-x-2">
                  <input
                    id="radio-2"
                    name="radio-for-placeincorporate"
                    type="radio"
                    checked={placeIncorporateValue === "place-radio-2"}
                    onChange={() => setPlaceIncorporateValue("place-radio-2")}
                  />
                  <label htmlFor="radio-2">
                    Others Address (Please Specify)
                  </label>
                </div>
              </div>
            </div>
            {placeIncorporateValue === "place-radio-2" && (
              <CorporateAddressForm
                isSubmitting={isSubmitting}
                errors={errors.placeofIncorporation?.address?.[0]}
                register={register}
                keyType="placeofIncorporation"
              />
            )}
          </div>

          <div className="p-4 space-y-4">
            <h1 className="col-span-4 font-bold">Financial Information </h1>
            <CommaInput
              step="0.01"
              id={"Registered Capital"}
              label={"Registered Capital"}
              {...register("registeredCapital")}
              name="registeredCapital"
              disabled={isSubmitting}
            />
            {errors.registeredCapital && (
              <p className="text-red-500">{errors.registeredCapital.message}</p>
            )}
            <CommaInput
              step="0.01"
              id={"Revenue Per Year"}
              label={"Revenue Per Year"}
              {...register("revenuePerYear")}
              name="revenuePerYear"
              disabled={isSubmitting}
            />
            {errors.revenuePerYear && (
              <p className="text-red-500">{errors.revenuePerYear.message}</p>
            )}
            <CommaInput
              step="0.01"
              id={"Net Profit (Loss)"}
              label={"Net Profit (Loss)"}
              {...register("netProFitLoss")}
              name="netProFitLoss"
              disabled={isSubmitting}
            />
            {errors.netProFitLoss && (
              <p className="text-red-500">{errors.netProFitLoss.message}</p>
            )}
            <CommaInput
              step="0.01"
              id={"Operating Expense Per Year"}
              label={"Shareholder's equity"}
              {...register("shareholderEquity")}
              name="shareholderEquity"
              disabled={isSubmitting}
            />
            {errors.shareholderEquity && (
              <p className="text-red-500">{errors.shareholderEquity.message}</p>
            )}
            {/* <div className="flex justify-end">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div> */}
          </div>
        </form>
      </Card>
    </>
  );
}

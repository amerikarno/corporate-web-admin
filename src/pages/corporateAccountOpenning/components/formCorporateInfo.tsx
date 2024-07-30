import { useForm } from "react-hook-form";
import {
  corporateInfoSchema,
  TCorporateInfoSchema,
} from "../constants/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCorporateInfo } from "../constants/types";
import { sleep } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CorporateAddressForm } from "./CorporateAddressForm";
import { Input } from "@/components/Input";
import { Input as OtherInput } from "@/components/ui/input";
import { CheckBox } from "@/components/Checkbox";
import { useFormCorporateInfo } from "@/pages/corporate/hook/useFormCorporateInfo";
import {
  registeredCountryChoices,
  PrimaryCountryOfOperationChoices,
} from "../constants/variables";
import { useState, useEffect } from "react";

type TCorporateInfoFormProps = {
  onsubmit: (data: TCorporateInfo) => void;
};

export function FormCorporateInfo({ onsubmit }: TCorporateInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCorporateInfoSchema>({
    resolver: zodResolver(corporateInfoSchema),
  });

  const [registeredCountryError, setRegisteredCountryError] =
    useState<boolean>(false);
  const [primaryCountryOfOperationError, setPrimaryCountryOfOperationError] =
    useState<boolean>(false);
  const [shouldScrollUp, setShouldScrollUp] = useState<boolean>(false);

  useEffect(() => {
    if (shouldScrollUp) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setShouldScrollUp(false);
    }
  }, [shouldScrollUp]);

  const onSubmit = async (data: TCorporateInfoSchema) => {
    const formData: TCorporateInfo = {
      ...data,
      registered: registeredCountryPrimaryCountryOperation.registered,
      registeredOther: registeredCountryPrimaryCountryOperation.registeredOther,
      registeredThailand:
        registeredCountryPrimaryCountryOperation.registeredThailand,
      primary: registeredCountryPrimaryCountryOperation.primary,
      primaryCountry: registeredCountryPrimaryCountryOperation.primaryCountry,
      primaryOther: registeredCountryPrimaryCountryOperation.primaryOther,
      registredBusiness: {
        address: [
          {
            addressNo: data.registredBusiness.address[0].addressNo,
            mooNo: data.registredBusiness.address[0].mooNo,
            building: data.registredBusiness.address[0].building,
            floor: data.registredBusiness.address[0].floor,
            soi: data.registredBusiness.address[0].soi,
            road: data.registredBusiness.address[0].road,
            tambon: data.registredBusiness.address[0].tambon,
            amphoe: data.registredBusiness.address[0].amphoe,
            province: data.registredBusiness.address[0].province,
            postalCode: data.registredBusiness.address[0].postalCode,
            country: data.registredBusiness.address[0].country,
          },
        ],
        emailAddress: data.registredBusiness.emailAddress,
        telephone: data.registredBusiness.telephone,
      },
      placeofIncorporation: {
        address: [
          {
            addressNo: data.placeofIncorporation.address[0].addressNo,
            mooNo: data.placeofIncorporation.address[0].mooNo,
            building: data.placeofIncorporation.address[0].building,
            floor: data.placeofIncorporation.address[0].floor,
            soi: data.placeofIncorporation.address[0].soi,
            road: data.placeofIncorporation.address[0].road,
            tambon: data.placeofIncorporation.address[0].tambon,
            amphoe: data.placeofIncorporation.address[0].amphoe,
            province: data.placeofIncorporation.address[0].province,
            postalCode: data.placeofIncorporation.address[0].postalCode,
            country: data.placeofIncorporation.address[0].country,
          },
        ],
        emailAddress: data.placeofIncorporation.emailAddress,
        telephone: data.placeofIncorporation.telephone,
      },
    };

    if (handleCheckboxError()) {
      await sleep(500);
      reset();
      // console.log(formData);
      onsubmit(formData);
    } else {
      setShouldScrollUp(true);
    }
  };

  const handleCheckboxError = () => {
    let isValid = true;

    if (!registeredCountryPrimaryCountryOperation.registered) {
      setRegisteredCountryError(true);
      isValid = false;
    } else {
      setRegisteredCountryError(false);
    }

    if (!registeredCountryPrimaryCountryOperation.primary) {
      setPrimaryCountryOfOperationError(true);
      isValid = false;
    } else {
      setPrimaryCountryOfOperationError(false);
    }

    return isValid;
  };

  const {
    disablePrimaryCountryOfOperation,
    disableRegisteredCountry,
    handlePrimaryCountryOfOperationOthers,
    handleRegisteredCountryOthers,
    isPrimaryCountryOfOperationOthers,
    isRegisteredCountryOthers,
    registeredCountryPrimaryCountryOperation,
    handleInputOthers,
  } = useFormCorporateInfo();

  return (
    <>
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-row gap-y-8"
        >
          <div className="p-4 space-y-4">
            <h1 className="col-span-4 font-bold pb-4">
              Juristic Investor Information-For Account Opening
            </h1>
            {/* <SideLabelInput title="Juristic Investor Name"> */}
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
            {/* </SideLabelInput>
            <SideLabelInput title="Juristic Investor Address"> */}
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
            {/* </SideLabelInput>
            <SideLabelInput title="Juristic Investor Tax ID"> */}
            <Input
              id={"Juristic Investor Tax ID"}
              label={"Tax ID"}
              {...register("taxID")}
              name="taxID"
              disabled={isSubmitting}
            />
            {errors.taxID && (
              <p className="text-red-500">{errors.taxID.message}</p>
            )}
            {/* </SideLabelInput>
            <SideLabelInput title="Juristic Investor Email"> */}
            <Input
              id={"Date Of Incorporation"}
              label={"Date of Incorporation"}
              {...register("dateofincorporation")}
              type="date"
              disabled={isSubmitting}
            />
            {errors.dateofincorporation && (
              <p className="text-red-500">
                {errors.dateofincorporation.message}
              </p>
            )}
            {/* </SideLabelInput> */}
          </div>

          <div className="p-4 space-y-4">
            <div className="p-4 border-t">
              <div className="grid grid-cols-2 ">
                <h1 className="font-bold pb-4">Registered Country</h1>
                <div></div>
                {registeredCountryChoices.map((item, i) => (
                  <CheckBox
                    id={`checkbox-${i}`}
                    key={i}
                    label={item}
                    onChange={(e) => {
                      handleRegisteredCountryOthers(e);
                      if (
                        registeredCountryPrimaryCountryOperation.registered ==
                        ""
                      ) {
                        setRegisteredCountryError(false);
                      } else {
                        setRegisteredCountryError(true);
                      }
                    }}
                    name={item}
                    disabled={disableRegisteredCountry(item)}
                  />
                ))}
              </div>
              {isRegisteredCountryOthers && (
                <div className="flex justify-end px-4 py-2">
                  <OtherInput
                    className="w-1/2"
                    placeholder="Please Specify"
                    onChange={(e) => handleInputOthers(e, "registered")}
                  />
                </div>
              )}
              {registeredCountryError && (
                <p className="text-red-500 px-4">
                  Register Country must be filled.
                </p>
              )}
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 ">
                <h1 className="font-bold pb-4">Primary Country of Operation</h1>
                <div></div>
                {PrimaryCountryOfOperationChoices.map((item, i) => (
                  <CheckBox
                    id={`checkbox2-${i}`}
                    key={i}
                    label={item}
                    onChange={(e) => {
                      handlePrimaryCountryOfOperationOthers(e);
                      if (
                        registeredCountryPrimaryCountryOperation.primary == ""
                      ) {
                        setPrimaryCountryOfOperationError(false);
                      } else {
                        setPrimaryCountryOfOperationError(true);
                      }
                    }}
                    name={item}
                    disabled={disablePrimaryCountryOfOperation(item)}
                  />
                ))}
              </div>
              {isPrimaryCountryOfOperationOthers && (
                <div className="flex justify-end px-4 py-2">
                  <OtherInput
                    className="w-1/2"
                    placeholder="Please Specify"
                    onChange={(e) => handleInputOthers(e, "primary")}
                  />
                </div>
              )}
              {primaryCountryOfOperationError && (
                <p className="text-red-500 px-4">
                  Primary Country of Operation must be filled.
                </p>
              )}
            </div>
          </div>

          <div className="p-4 space-y-4">
            <h1 className="font-bold">Place Of Incorporate :</h1>
            <div className="flex flex-row space-x-4 "></div>
            <CorporateAddressForm
              isSubmitting={isSubmitting}
              errors={errors.placeofIncorporation?.address?.[0]}
              register={register}
              keyType="placeofIncorporation"
            />
          </div>

          <div className="p-4 space-y-4">
            <h1 className="font-bold pb-4">Registered/Business address :</h1>

            <CorporateAddressForm
              errors={errors.registredBusiness?.address?.[0]}
              register={register}
              isSubmitting={isSubmitting}
              keyType="registredBusiness"
            />
          </div>

          <div className="p-4 space-y-4">
            <h1 className="col-span-4 font-bold">Financial Information :</h1>
            {/* <SideLabelInput title="Registered Capital"> */}
            <Input
              id={"Registered Capital"}
              label={"Registered Capital"}
              {...register("registeredCapital")}
              name="registeredCapital"
              disabled={isSubmitting}
            />
            {errors.registeredCapital && (
              <p className="text-red-500">{errors.registeredCapital.message}</p>
            )}
            {/* </SideLabelInput>
            <SideLabelInput title="Net Profit (Loss)"> */}
            <Input
              id={"Net Profit (Loss)"}
              label={"Net Profit (Loss)"}
              {...register("netProFitLoss")}
              name="financial.NetProFitLoss"
              disabled={isSubmitting}
            />
            {errors.netProFitLoss && (
              <p className="text-red-500">{errors.netProFitLoss.message}</p>
            )}
            {/* </SideLabelInput>
            <SideLabelInput title="Revenue Per Year"> */}
            <Input
              id={"Revenue Per Year"}
              label={"Revenue Per Year"}
              {...register("revenuePerYear")}
              name="financial.RevenuePerYear"
              disabled={isSubmitting}
            />
            {errors.revenuePerYear && (
              <p className="text-red-500">{errors.revenuePerYear.message}</p>
            )}
            {/* </SideLabelInput>
            <SideLabelInput title="Operating Expense Per Year"> */}
            <Input
              id={"Operating Expense Per Year"}
              label={"Operating Expense Per Year"}
              {...register("shareholderEquity")}
              name="financial.ShareholderEquity"
              disabled={isSubmitting}
            />
            {errors.shareholderEquity && (
              <p className="text-red-500">{errors.shareholderEquity.message}</p>
            )}
          </div>
          <div className="flex justify-end pb-4 pr-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}

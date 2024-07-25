import { useForm } from "react-hook-form";
import {
  corporateInfoSchema,
  TCorporateInfoSchema,
} from "../constants/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCorporateInfo } from "../constants/types";
import { sleep } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { SideLabelInput } from "@/components/SideLabelInput";
import { CorporateAddressForm } from "./CorporateAddressForm";
import { Input } from "@/components/Input";
import { Input as OtherInput } from "@/components/ui/input";
import { CheckBox } from "@/components/Checkbox";
import { useFormCorporateInfo } from "../hook/useFormCorporateInfo";
import {
  registeredCountryChoices,
  PrimaryCountryOfOperationChoices,
} from "../constants/const_variables";
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
      Registered: registeredCountryPrimaryCountryOperation.Registered,
      RegisteredOther: registeredCountryPrimaryCountryOperation.RegisteredOther,
      RegisteredThailand:
        registeredCountryPrimaryCountryOperation.RegisteredThailand,
      Primary: registeredCountryPrimaryCountryOperation.Primary,
      PrimaryCountry: registeredCountryPrimaryCountryOperation.PrimaryCountry,
      PrimaryOther: registeredCountryPrimaryCountryOperation.PrimaryOther,
    };

    if (handleCheckboxError()) {
      await sleep(500);
      reset();
      console.log(formData);
      onsubmit(formData);
    } else {
      setShouldScrollUp(true);
    }
  };

  const handleCheckboxError = () => {
    let isValid = true;

    if (!registeredCountryPrimaryCountryOperation.Registered) {
      setRegisteredCountryError(true);
      isValid = false;
    } else {
      setRegisteredCountryError(false);
    }

    if (!registeredCountryPrimaryCountryOperation.Primary) {
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
              {...register("Name")}
              name="Name"
              disabled={isSubmitting}
            />
            {errors.Name && (
              <p className="text-red-500">{errors.Name.message}</p>
            )}
            {/* </SideLabelInput>
            <SideLabelInput title="Juristic Investor Address"> */}
            <Input
              id={"Commercial Registration No."}
              label={"Commercial Registration No."}
              {...register("RegistrationNo")}
              name="RegistrationNo"
              disabled={isSubmitting}
            />
            {errors.RegistrationNo && (
              <p className="text-red-500">{errors.RegistrationNo.message}</p>
            )}
            {/* </SideLabelInput>
            <SideLabelInput title="Juristic Investor Tax ID"> */}
            <Input
              id={"Juristic Investor Tax ID"}
              label={"Tax ID"}
              {...register("TaxID")}
              name="TaxID"
              disabled={isSubmitting}
            />
            {errors.TaxID && (
              <p className="text-red-500">{errors.TaxID.message}</p>
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
                        registeredCountryPrimaryCountryOperation.Registered ==
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
                    onChange={(e) => handleInputOthers(e, "Registered")}
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
                        registeredCountryPrimaryCountryOperation.Primary == ""
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
                    onChange={(e) => handleInputOthers(e, "Primary")}
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
            <h1 className="font-bold pb-4">Place Of Incorporate :</h1>
            <div className="flex flex-row space-x-4 pb-8">
              <div className="w-1/2">
                <Input
                  {...register("placeIncorporateEmail")}
                  label="E-mail Address"
                  id="placeIncorporateEmail"
                  disabled={isSubmitting}
                />
                {errors.placeIncorporateEmail && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.placeIncorporateEmail.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <Input
                  {...register("placeIncorporateTelephone")}
                  label="Telephone"
                  id="placeIncorporateTelephone"
                  disabled={isSubmitting}
                />
                {errors.placeIncorporateTelephone && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.placeIncorporateTelephone.message}
                  </p>
                )}
              </div>
            </div>
            <CorporateAddressForm
              isSubmitting={isSubmitting}
              errors={errors.RegistredBusinessAddress}
              register={register}
              keyType="PlaceIncorporateAddress"
            />
            <Input
              {...register("placeIncorporateEmail")}
              label="E-mail Address"
              id="placeIncorporateEmail"
              disabled={isSubmitting}
            />
            {errors.placeIncorporateEmail && (
              <p className="text-red-500">
                {errors.placeIncorporateEmail.message}
              </p>
            )}
            <Input
              {...register("placeIncorporateTelephone")}
              label="Telephone"
              id="placeIncorporateTelephone"
              disabled={isSubmitting}
            />
            {errors.placeIncorporateTelephone && (
              <p className="text-red-500">
                {errors.placeIncorporateTelephone.message}
              </p>
            )}
          </div>

          <div className="p-4 space-y-4">
            <h1 className="font-bold pb-4">Registered/Business address :</h1>
            <div className="flex flex-row space-x-4 pb-8">
              <div className="w-1/2">
                <Input
                  {...register("RegistredBusinessEmail")}
                  label="E-mail Address"
                  id="RegistredBusinessEmail"
                  disabled={isSubmitting}
                />
                {errors.RegistredBusinessEmail && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.RegistredBusinessEmail.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <Input
                  {...register("RegistredBusinessTelephone")}
                  label="Telephone"
                  id="RegistredBusinessTelephone"
                  disabled={isSubmitting}
                />
                {errors.RegistredBusinessTelephone && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.RegistredBusinessTelephone.message}
                  </p>
                )}
              </div>
            </div>
            <CorporateAddressForm
              errors={errors.RegistredBusinessAddress}
              register={register}
              isSubmitting={isSubmitting}
              keyType="RegistredBusinessAddress"
            />
            <Input
              {...register("RegistredBusinessEmail")}
              label="E-mail Address"
              id="RegistredBusinessEmail"
              disabled={isSubmitting}
            />
            {errors.RegistredBusinessAddress && (
              <p className="text-red-500">
                {errors.RegistredBusinessAddress.message}
              </p>
            )}
            <Input
              {...register("RegistredBusinessTelephone")}
              label="Telephone"
              id="RegistredBusinessTelephone"
              disabled={isSubmitting}
            />
            {errors.RegistredBusinessTelephone && (
              <p className="text-red-500">
                {errors.RegistredBusinessTelephone.message}
              </p>
            )}
          </div>

          <div className="p-4 space-y-4">
            <h1 className="col-span-4 font-bold">Financial Information :</h1>
            {/* <SideLabelInput title="Registered Capital"> */}
            <Input
              id={"Registered Capital"}
              label={"Registered Capital"}
              {...register("RegisteredCapital")}
              name="RegisteredCapital"
              disabled={isSubmitting}
            />
            {errors.RegisteredCapital && (
              <p className="text-red-500">{errors.RegisteredCapital.message}</p>
            )}
            {/* </SideLabelInput>
            <SideLabelInput title="Net Profit (Loss)"> */}
            <Input
              id={"Net Profit (Loss)"}
              label={"Net Profit (Loss)"}
              {...register("NetProFitLoss")}
              name="financial.NetProFitLoss"
              disabled={isSubmitting}
            />
            {errors.NetProFitLoss && (
              <p className="text-red-500">{errors.NetProFitLoss.message}</p>
            )}
            {/* </SideLabelInput>
            <SideLabelInput title="Revenue Per Year"> */}
            <Input
              id={"Revenue Per Year"}
              label={"Revenue Per Year"}
              {...register("RevenuePerYear")}
              name="financial.RevenuePerYear"
              disabled={isSubmitting}
            />
            {errors.RevenuePerYear && (
              <p className="text-red-500">{errors.RevenuePerYear.message}</p>
            )}
            {/* </SideLabelInput>
            <SideLabelInput title="Operating Expense Per Year"> */}
            <Input
              id={"Operating Expense Per Year"}
              label={"Operating Expense Per Year"}
              {...register("ShareholderEquity")}
              name="financial.ShareholderEquity"
              disabled={isSubmitting}
            />
            {errors.ShareholderEquity && (
              <p className="text-red-500">{errors.ShareholderEquity.message}</p>
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

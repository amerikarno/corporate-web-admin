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
// import { AddressForm } from "./addressForm";
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
      registered: registeredCountryPrimaryCountryOperation.registered,
      registeredOther: registeredCountryPrimaryCountryOperation.registeredOther,
      registeredThailand:
        registeredCountryPrimaryCountryOperation.registeredThailand,
      primary: registeredCountryPrimaryCountryOperation.primary,
      primaryCountry: registeredCountryPrimaryCountryOperation.primaryCountry,
      primaryOther: registeredCountryPrimaryCountryOperation.primaryOther,
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
            <Input
              id={"Juristic Investor Name"}
              label={"Juristic Investor Name"}
              {...register("name")}
              name="Name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <Input
              id={"Commercial Registration No."}
              label={"Commercial Registration No."}
              {...register("registrationNo")}
              name="RegistrationNo"
              disabled={isSubmitting}
            />
            {errors.registrationNo && (
              <p className="text-red-500">{errors.registrationNo.message}</p>
            )}
            <Input
              id={"Juristic Investor Tax ID"}
              label={"Tax ID"}
              {...register("taxID")}
              name="TaxID"
              disabled={isSubmitting}
            />
            {errors.taxID && (
              <p className="text-red-500">{errors.taxID.message}</p>
            )}
            <Input
              id={"Date Of Incorporation"}
              label={"Date of Incorporation"}
              {...register("dateofincorporation")}
              type="date"
              disabled={isSubmitting}
              // type="date"
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
              errors={errors.registredBusinessAddress}
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
                  {...register("registredBusinessEmail")}
                  label="E-mail Address"
                  id="RegistredBusinessEmail"
                  disabled={isSubmitting}
                />
                {errors.registredBusinessEmail && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.registredBusinessEmail.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <Input
                  {...register("registredBusinessTelephone")}
                  label="Telephone"
                  id="RegistredBusinessTelephone"
                  disabled={isSubmitting}
                />
                {errors.registredBusinessTelephone && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.registredBusinessTelephone.message}
                  </p>
                )}
              </div>
            </div>
            <CorporateAddressForm
              errors={errors.registredBusinessAddress}
              register={register}
              isSubmitting={isSubmitting}
              keyType="RegistredBusinessAddress"
            />
            <Input
              {...register("registredBusinessEmail")}
              label="E-mail Address"
              id="RegistredBusinessEmail"
              disabled={isSubmitting}
            />
            {errors.registredBusinessAddress && (
              <p className="text-red-500">
                {errors.registredBusinessAddress.message}
              </p>
            )}
            <Input
              {...register("registredBusinessTelephone")}
              label="Telephone"
              id="RegistredBusinessTelephone"
              disabled={isSubmitting}
            />
            {errors.registredBusinessTelephone && (
              <p className="text-red-500">
                {errors.registredBusinessTelephone.message}
              </p>
            )}
          </div>

          <div className="p-4 space-y-4">
            <h1 className="col-span-4 font-bold">Financial Information :</h1>
            <Input
              type="number"
              id={"Registered Capital"}
              label={"Registered Capital"}
              {...register("registeredCapital")}
              name="RegisteredCapital"
              disabled={isSubmitting}
            />
            {errors.registeredCapital && (
              <p className="text-red-500">{errors.registeredCapital.message}</p>
            )}
            <Input
              type="number"
              id={"Net Profit (Loss)"}
              label={"Net Profit (Loss)"}
              {...register("netProFitLoss")}
              name="financial.NetProFitLoss"
              disabled={isSubmitting}
            />
            {errors.netProFitLoss && (
              <p className="text-red-500">{errors.netProFitLoss.message}</p>
            )}
            <Input
            type="number"
              id={"Revenue Per Year"}
              label={"Revenue Per Year"}
              {...register("revenuePerYear")}
              name="financial.RevenuePerYear"
              disabled={isSubmitting}
            />
            {errors.revenuePerYear && (
              <p className="text-red-500">{errors.revenuePerYear.message}</p>
            )}
            <Input
            type="number"
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

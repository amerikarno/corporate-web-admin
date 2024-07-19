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
import { AddressForm } from "./addressForm";
import { Input } from "@/components/Input";

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

  const onSubmit = async (data: TCorporateInfoSchema) => {
    await sleep(500);
    reset();
    onsubmit(data);
  };

  return (
    <>
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-row gap-y-8"
        >
          <div className="p-4 space-y-4">
            <h1 className="col-span-4 font-bold pb-4">
              Juristic Investor Informations :
            </h1>
            {/* <SideLabelInput title="Juristic Investor Name"> */}
              <Input
                id={"Juristic Investor Name"}
                label={"Juristic Investor Name"}
                {...register("name")}
                name="name"
                disabled={isSubmitting}
                required
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            {/* </SideLabelInput>
            <SideLabelInput title="Juristic Investor Address"> */}
              <Input
                id={"Juristic Investor Address"}
                label={"Juristic Investor Address"}
                {...register("commercialRegisteredNo")}
                name="commercialRegisteredNo"
                required
                disabled={isSubmitting}
              />
              {errors.commercialRegisteredNo && (
                <p className="text-red-500">
                  {errors.commercialRegisteredNo.message}
                </p>
              )}
            {/* </SideLabelInput>
            <SideLabelInput title="Juristic Investor Tax ID"> */}
              <Input
                id={"Juristic Investor Tax ID"}
                label={"Juristic Investor Tax ID"}
                {...register("taxId")}
                name="taxId"
                required
                disabled={isSubmitting}
              />
              {errors.taxId && (
                <p className="text-red-500">{errors.taxId.message}</p>
              )}
            {/* </SideLabelInput>
            <SideLabelInput title="Juristic Investor Email"> */}
              <Input
                id={"Juristic Investor Email"}
                label={"Juristic Investor Email"}
                {...register("dateIncorporation")}
                name="dateIncorporation"
                required
                disabled={isSubmitting}
              />
              {errors.dateIncorporation && (
                <p className="text-red-500">
                  {errors.dateIncorporation.message}
                </p>
              )}
            {/* </SideLabelInput> */}
          </div>

          <div className="p-4 space-y-4">
            <h1 className="font-bold pb-4">Registered / Business Address :</h1>
            {/* <SideLabelInput title="Registered Country"> */}
              <Input
                id={"Registered Country"}
                label={"Registered Country"}
                {...register("registeredCountry")}
                name="registeredCountry"
                required
                disabled={isSubmitting}
              />
              {errors.registeredCountry && (
                <p className="text-red-500">
                  {errors.registeredCountry.message}
                </p>
              )}
            {/* </SideLabelInput> */}
            <AddressForm
              isSubmitting={isSubmitting}
              errors={errors.registeredAddress}
              register={register}
              keyType="registeredAddress"
            />
          </div>

          <div className="p-4 space-y-4">
            <h1 className="font-bold pb-4">Place Of Incorporate :</h1>
            {/* <SideLabelInput title="Primary Country Of Operation"> */}
              <Input
                id={"Primary Country Of Operation"}
                label={"Primary Country Of Operation"}
                {...register("operateCountry")}
                name="operateCountry"
                required
                disabled={isSubmitting}
              />
              {errors.operateCountry && (
                <p className="text-red-500">{errors.operateCountry.message}</p>
              )}
            {/* </SideLabelInput> */}
            <AddressForm
              errors={errors.incorporatedAddress}
              register={register}
              isSubmitting={isSubmitting}
              keyType="incorporatedAddress"
            />
          </div>

          <div className="p-4 space-y-4">
            <h1 className="col-span-4 font-bold">Financial Information :</h1>
            {/* <SideLabelInput title="Registered Capital"> */}
              <Input
                id={"Registered Capital"}
                label={"Registered Capital"}
                {...register("financial.registeredCapital")}
                name="financial.registeredCapital"
                disabled={isSubmitting}
              />
              {errors.financial && (
                <p className="text-red-500">{errors.financial.message}</p>
              )}
            {/* </SideLabelInput>
            <SideLabelInput title="Net Profit (Loss)"> */}
              <Input
                id={"Net Profit (Loss)"}
                label={"Net Profit (Loss)"}
                {...register("financial.netProfit")}
                name="financial.netProfit"
                disabled={isSubmitting}
              />
              {errors.financial && (
                <p className="text-red-500">{errors.financial.message}</p>
              )}
            {/* </SideLabelInput>
            <SideLabelInput title="Revenue Per Year"> */}
              <Input
                id={"Revenue Per Year"}
                label={"Revenue Per Year"}
                {...register("financial.revenuePerYear")}
                name="financial.revenuePerYear"
                disabled={isSubmitting}
              />
              {errors.financial && (
                <p className="text-red-500">{errors.financial.message}</p>
              )}
            {/* </SideLabelInput>
            <SideLabelInput title="Operating Expense Per Year"> */}
              <Input
                id={"Operating Expense Per Year"}
                label={"Operating Expense Per Year"}
                {...register("financial.shareholderEquity")}
                name="financial.shareholderEquity"
                disabled={isSubmitting}
              />
              {errors.financial && (
                <p className="text-red-500">{errors.financial.message}</p>
              )}
            {/* </SideLabelInput> */}
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

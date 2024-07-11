import { useForm } from "react-hook-form";
import {
  corporateInfoSchema,
  TCorporateInfoSchema,
} from "../constants/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCorporateInfo } from "../constants/types";
import Input from "@/components/Input";
import { sleep } from "@/lib/utils";

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
    await sleep(2000);
    reset();
    // console.log(data);
    onsubmit(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name")}
          title="name"
          name="name"
          required
          disabled={isSubmitting}
        />
        <Input
          {...register("commercialRegisteredNo")}
          title="commercialRegisteredNo"
          name="commercialRegisteredNo"
          required
          disabled={isSubmitting}
        />
        <Input
          {...register("taxId")}
          title="taxId"
          name="taxId"
          required
          disabled={isSubmitting}
        />
        <Input
          {...register("dateIncorporation")}
          title="dateIncorporation"
          name="dateIncorporation"
          required
          disabled={isSubmitting}
        />
        <Input
          {...register("registeredCountry")}
          title="registeredCountry"
          name="registeredCountry"
          required
          disabled={isSubmitting}
        />
        <Input
          {...register("operateCountry")}
          title="operateCountry"
          name="operateCountry"
          required
          disabled={isSubmitting}
        />
        <Input
          {...register("registeredAddress")}
          title="registeredAddress"
          name="registeredAddress"
          required
          disabled={isSubmitting}
        />
        <Input
          {...register("incorporatedAddress")}
          title="incorporatedAddress"
          name="incorporatedAddress"
          required
          disabled={isSubmitting}
        />
        <Input
          {...register("financial.registeredCapital")}
          title="financial.registeredCapital"
          name="financial.registeredCapital"
          required
          disabled={isSubmitting}
        />
        <Input
          {...register("financial.netProfit")}
          title="financial.netProfit"
          name="financial.netProfit"
          required
          disabled={isSubmitting}
        />
        <Input
          {...register("financial.revenuePerYear")}
          title="financial.revenuePerYear"
          name="financial.revenuePerYear"
          required
          disabled={isSubmitting}
        />
        <Input
          {...register("financial.shareholderEquity")}
          title="financial.shareholderEquity"
          name="financial.shareholderEquity"
          required
          disabled={isSubmitting}
        />
        <div className="flex justify-end items-end">
          <button type="submit" className="w-1/2 h-1/2" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

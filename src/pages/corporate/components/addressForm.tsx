import { SideLabelInput } from "@/components/SideLabelInput";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  addressSchema,
  TAddressSchema,
  TCorporateInfoSchema,
} from "../constants/schemas";
import { Input } from "@/components/ui/input";
import { mapAddress } from "@/lib/constant";

export type TAddressFormProps = {
  isSubmitting: boolean;
  errors?: FieldErrors<TAddressSchema>;
  register: UseFormRegister<TCorporateInfoSchema>;
  keyType: string;
};

export function AddressForm({
  isSubmitting,
  errors,
  register,
  keyType,
}: TAddressFormProps) {
  const fields = Object.entries(addressSchema.shape);
  return (
    <div className="grid grid-cols-2 gap-4">
      {fields.map(([fieldName], index) => {
        return (
          <div key={index} className="flex-col">
            <SideLabelInput title={mapAddress[fieldName]}>
              <Input
                {...register(`${keyType}.${fieldName}` as any)}
                name={`${keyType}.${fieldName}`}
                id={fieldName}
                required
                disabled={isSubmitting}
              />
            </SideLabelInput>
            {errors && errors[fieldName as keyof TAddressSchema] && (
              <p className="text-red-500">
                {errors[fieldName as keyof TAddressSchema]?.message}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

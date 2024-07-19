import { SideLabelInput } from "@/components/SideLabelInput";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  addressSchema,
  TAddressSchema,
  TCorporateInfoSchema,
} from "../constants/schemas";
import { mappingAddress } from "../constants/const_variables";
import { Input } from "@/components/Input";

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
  const optionalFields = ["building", "moo", "soi", "road"];
  const isOptional = (name: string) => {
    if (optionalFields.includes(name)) {
      return false;
    }
    return true;
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      {fields.map(([fieldName], index) => {
        return (
          <div key={index} className="flex-col">
            {/* <SideLabelInput title={mappingAddress[fieldName]}> */}
              <Input
                label={fieldName}
                {...register(`${keyType}.${fieldName}` as any)}
                name={`${keyType}.${fieldName}`}
                id={fieldName}
                //required={isOptional(fieldName)}
                disabled={isSubmitting}
                type={fieldName == "email" ? "email" : "text"}
              />
            {/* </SideLabelInput> */}
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

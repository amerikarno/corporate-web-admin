import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  subAddressSchema,
  TSubAddressSchema,
  TAttorneySchema,
} from "../constants2/schemas";
import { Input } from "@/components/Input";

export type TSubAddressFormProps = {
  isSubmitting: boolean;
  errors?: FieldErrors<TSubAddressSchema>;
  register: UseFormRegister<TAttorneySchema>;
  keyType: string;
};

export function AddressFormAttorney({
  isSubmitting,
  errors,
  register,
  keyType,
}: TSubAddressFormProps) {
  const fields = Object.entries(subAddressSchema.shape);
  // const optionalFields = ["Building", "MooNo", "Soi", "Road"];
  // const isOptional = (name: string) => {
  //   if (optionalFields.includes(name)) {
  //     return false;
  //   }
  //   return true;
  // };
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
    "Country"
  ]
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {fields.map(([fieldName], index) => {
        return (
          <div key={index} className="flex-col">
            {/* <SideLabelInput title={mappingAddress[fieldName]}> */}
              <Input
                label={newFields[index]}
                {...register(`${keyType}.0.${fieldName}` as any)}
                name={`${keyType}.0.${fieldName}`}
                id={fieldName}
                //required={isOptional(fieldName)}
                disabled={isSubmitting}
                type={"text"}
              />
            {/* </SideLabelInput> */}
            {errors && errors[fieldName as keyof TSubAddressSchema] && (
              <p className="text-red-500">
                {errors[fieldName as keyof TSubAddressSchema]?.message}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

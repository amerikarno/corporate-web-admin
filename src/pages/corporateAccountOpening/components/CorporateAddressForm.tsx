import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  subAddressSchema,
  TSubAddressSchema,
  TCorporateInfoSchema,
} from "../constants/schemas";
import { Input } from "@/components/Input";

export type TSubAddressFormProps = {
  isSubmitting: boolean;
  errors?: FieldErrors<TSubAddressSchema>;
  register: UseFormRegister<TCorporateInfoSchema>;
  keyType: string;
};

export function CorporateAddressForm({
  isSubmitting,
  errors,
  register,
  keyType,
}: TSubAddressFormProps) {
  const fields = Object.entries(subAddressSchema.shape);
  const newFields = [
    "Address No",
    "Moo No",
    "Building/Moban",
    "Floor",
    "Soi",
    "Road",
    "Sub-district/Tambon",
    "District/Amphur",
    "Province",
    "Postal Code",
    "Country",
  ];
  // const optionalFields = ["Building", "MooNo", "Soi", "Road"];
  // const isOptional = (name: string) => {
  //   if (optionalFields.includes(name)) {
  //     return false;
  //   }
  //   return true;
  // };
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        {fields.map(([fieldName], index) => {
          return (
            <div key={index} className="flex-col">
              {/* <SideLabelInput title={mappingAddress[fieldName]}> */}
              <Input
                label={newFields[index]}
                {...register(`${keyType}.address[0].${fieldName}` as any)}
                name={`${keyType}.address[0].${fieldName}`}
                id={keyType+fieldName}
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


    </>
  );
}

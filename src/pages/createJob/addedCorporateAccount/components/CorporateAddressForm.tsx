import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  subAddressSchema,
  TSubAddressSchema,
  TCorporateInfoSchema,
} from "../constants2/schemas";
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
              <Input
                label={newFields[index]}
                {...register(`${keyType}.address[0].${fieldName}` as any)}
                name={`${keyType}.address[0].${fieldName}`}
                id={`id-${keyType}.address[0].${fieldName}`}
                disabled={isSubmitting}
                type={"text"}
                data-testid={`${keyType}-${index}`}
              />
              {errors && errors[fieldName as keyof TSubAddressSchema] && (
                <p className="text-red-500">
                  {errors[fieldName as keyof TSubAddressSchema]?.message}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex-col">
        <Input
          label="Email Address"
          {...register(`${keyType}.emailAddress` as keyof TCorporateInfoSchema)}
          name={`${keyType}.emailAddress`}
          id={`id-${keyType}.emailAddress`}
          disabled={isSubmitting}
          type="text"
          data-testid={`${keyType}-emailAddress`}
        />
      </div>

      {/* Render telephone field */}
      <div className="flex-col">
        <Input
          label="Telephone"
          {...register(`${keyType}.telephone` as keyof TCorporateInfoSchema)}
          name={`${keyType}.telephone`}
          id={`id-${keyType}.telephone`}
          disabled={isSubmitting}
          type="text"
          data-testid={`${keyType}-telephone`}
        />
      </div>
    </>
  );
}

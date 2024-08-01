import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  addressSchema,
  TAddressSchema,
  TCorporateInfoSchema,
} from "../constants/schemas";
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
  const fields = Object.entries(addressSchema.shape.address.shape);
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
              {...register(`${keyType}.address.${fieldName}` as any)}
              name={`${keyType}.address.${fieldName}`}
              id={fieldName}
              //required={isOptional(fieldName)}
              disabled={isSubmitting}
              type={"text"}
            />
            {/* </SideLabelInput> */}
            {errors?.address &&
              errors.address[fieldName as keyof TAddressSchema["address"]] && (
                <p className="text-red-500">
                  {
                    errors.address[fieldName as keyof TAddressSchema["address"]]
                      ?.message
                  }
                </p>
              )}
          </div>
        );
      })}
      <div className="flex-col">
        <Input
          label="Telephone"
          {...register(`${keyType}.Telephone` as any)}
          name={`${keyType}.Telephone`}
          id="Telephone"
          disabled={isSubmitting}
          type="text"
        />
        {errors?.Telephone && (
          <p className="text-red-500">{errors.Telephone.message}</p>
        )}
      </div>
      <div className="flex-col">
        <Input
          label="Email Address"
          {...register(`${keyType}.EmailAddress` as any)}
          name={`${keyType}.EmailAddress`}
          id="EmailAddress"
          disabled={isSubmitting}
          type="email"
        />
        {errors?.EmailAddress && (
          <p className="text-red-500">{errors.EmailAddress.message}</p>
        )}
      </div>
    </div>
  );
}

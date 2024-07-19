import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sleep } from "@/lib/utils";
import {
  authorizedPersonSchema,
  TAuthorizedPersonSchema,
} from "../constants/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TAuthorizePerson } from "../constants/types";
import { AddressFormAuthorizedPerson } from "./addressFormAuthorizedPerson";

export function FormAuthorizedPerson() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAuthorizePerson>({
    resolver: zodResolver(authorizedPersonSchema),
  });

  const onSubmit = async (data: TAuthorizedPersonSchema) => {
    await sleep(500);
    console.log(data);
    reset();
  };

  return (
    <Card className="p-4">
      <h1 className="font-bold text-xl py-4">Authorized Person :</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("title")}
              label="Title"
              id="Title"
              disabled={isSubmitting}
              
            />
            {errors.title && (
              <p className="text-red-500 text-sm px-2">{errors.title.message}</p>
            )}
          </div>
          <div className="w-1/2">
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("firstName")}
              label="First Name"
              id="First Name"
              disabled={isSubmitting}
              
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm px-2">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <Input
              {...register("lastName")}
              label="Surname"
              id="Surname"
              disabled={isSubmitting}
              
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm px-2">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("idCard")}
              label="ID Card / Passport"
              id="ID Card / Passport"
              disabled={isSubmitting}
              
            />
            {errors.idCard && (
              <p className="text-red-500 text-sm px-2">
                {errors.idCard.message}
              </p>
            )}
          </div>

          <div className="w-1/2">
            <Input
              {...register("expiredDate")}
              label="Expiration Date"
              id="Expiration Date"
              type="date"
              disabled={isSubmitting}
              
            />
            {errors.expiredDate && (
              <p className="text-red-500 text-sm px-2">
                {errors.expiredDate.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("nationality")}
              label="Nationality"
              id="Nationality"
              disabled={isSubmitting}
              
            />
            {errors.nationality && (
              <p className="text-red-500 text-sm px-2">
                {errors.nationality.message}
              </p>
            )}
          </div>
          <div className="w-1/2"></div>
        </div>
        <h1 className="font-bold text-xl py-4">
          Authorized Person's Address :
        </h1>
        <AddressFormAuthorizedPerson
          isSubmitting={isSubmitting}
          keyType="address"
          register={register}
          errors={errors.address}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

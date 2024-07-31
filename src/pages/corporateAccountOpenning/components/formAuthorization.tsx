import { useState } from "react";
import { TAuthorizePerson } from "../constants/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  authorizedPersonSchema,
  TAuthorizedPersonSchema,
} from "../constants/schemas";
import { sleep } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/Input";
import Dropbox from "@/components/Dropbox";
import { AddressFormAuthorizedPerson } from "./addressFormAuthorizedPerson";
import { Button } from "@/components/ui/button";

type TAuthorizePersonFormProps = {
  onsubmit: (data: TAuthorizePerson) => void;
  corporateCode: string;
};
export function FormAuthorizedPerson({
  onsubmit,
  corporateCode,
}: TAuthorizePersonFormProps) {
  const [initError, setInitError] = useState<boolean>(false);
  const [curInput, setCurInput] = useState<boolean>(false);
  const [dropDownChoosed, setDropDownChoosed] = useState<string>("ID");
  const handleDropboxChoice = (choice: string) => {
    setDropDownChoosed(choice);
  };

  const handleChange = (e: any) => {
    setInitError(false);
    setCurInput(e.target.value !== "");
  };

  const validateData = (data: TAuthorizePerson): TAuthorizePerson => {
    let tmp = { ...data };
    if (tmp.citizendId) {
      tmp = { ...tmp, passportID: "" };
    }
    if (tmp.passportID) {
      tmp = { ...tmp, citizendId: "" };
    }
    //tmp = { ...tmp, types: "201" };
    return tmp;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAuthorizedPersonSchema>({
    resolver: zodResolver(authorizedPersonSchema),
  });

  const onSubmit = async (data: TAuthorizedPersonSchema) => {
    if (curInput) {
      const formData = validateData(data);
      await sleep(500);
      reset();
      let body: TAuthorizePerson = {
        ...formData,
        types: 201,
        addresses: data.addresses,
        fullNames: data.fullNames,
        corporateCode: corporateCode,
      };
      console.log(body);
      onsubmit(body);
    } else {
      setInitError(true);
    }
  };

  return (
    <Card className="p-4">
      <h1 className="font-bold text-xl py-4">
        Authorized person of Juristic Investor for traction
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("fullNames.0.title")}
              label="Title"
              id="Title"
              disabled={isSubmitting}
            />
            {errors.fullNames?.[0]?.title && (
              <p className="text-red-500 text-sm px-2">
                {errors.fullNames?.[0]?.title.message}
              </p>
            )}
          </div>
          <div className="w-1/2"></div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("fullNames.0.firstName")}
              label="First Name"
              id="First Name"
              disabled={isSubmitting}
            />
            {errors.fullNames?.[0]?.firstName && (
              <p className="text-red-500 text-sm px-2">
                {errors.fullNames?.[0]?.firstName.message}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <Input
              {...register("fullNames.0.lastName")}
              label="Surname"
              id="Surname"
              disabled={isSubmitting}
            />
            {errors.fullNames?.[0]?.lastName && (
              <p className="text-red-500 text-sm px-2">
                {errors.fullNames?.[0]?.lastName.message}
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
          <div className="w-1/2">
            <Input
              {...register("position")}
              label="Position"
              id="position"
              disabled={isSubmitting}
            />
            {errors.position && (
              <p className="text-red-500 text-sm px-2">
                {errors.position.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row space-x-4">
          <div className="w-1/3">
            <Dropbox onDropdownSelect={handleDropboxChoice} />
          </div>
          <div className="w-1/3">
            {dropDownChoosed ? (
              dropDownChoosed === "ID" ? (
                <>
                  <Input
                    {...register("citizendId")}
                    label="Please fill ID"
                    id="idCard"
                    disabled={isSubmitting}
                    onChange={handleChange}
                  />
                  {initError && !curInput && (
                    <p className="text-red-500 text-sm px-2">
                      Please Insert ID
                    </p>
                  )}
                </>
              ) : (
                <>
                  <Input
                    {...register("passportID")}
                    label="Please fill Passport"
                    id="passportID"
                    disabled={isSubmitting}
                    onChange={handleChange}
                  />
                  {initError && !curInput && (
                    <p className="text-red-500 text-sm px-2">
                      Please Insert Passport
                    </p>
                  )}
                </>
              )
            ) : (
              <>
                <div className="relative w-full">
                  <Input
                    {...register("citizendId")}
                    label="Please fill ID"
                    id="idCard"
                    disabled={isSubmitting}
                    onChange={handleChange}
                  />
                </div>
                {initError && !curInput && (
                  <p className="text-red-500 text-sm px-2">Please Insert ID</p>
                )}
              </>
            )}
          </div>
          <div className="w-1/3">
            <Input
              {...register("expiryDate")}
              label="Date of Expired"
              id="Date of Expired"
              disabled={isSubmitting}
              type="date"
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm px-2">
                {errors.expiryDate.message}
              </p>
            )}
          </div>
        </div>
        <h1 className="font-bold text-xl py-4">
          Authorized Person's Address :
        </h1>
        <AddressFormAuthorizedPerson
          isSubmitting={isSubmitting}
          keyType="addresses"
          register={register}
          errors={errors.addresses?.[0]}
        />
        {errors.addresses?.[0] && (
          <p className="text-red-500 text-sm px-2">
            {errors.addresses?.[0]?.message}
          </p>
        )}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

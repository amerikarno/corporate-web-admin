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
import { useState,useEffect } from "react";
import Dropbox from "@/components/Dropbox"

type TAuthorizePersonFormProps = {
  onsubmit: (data: TAuthorizePerson) => void;
};
export function FormAuthorizedPerson({onsubmit}:TAuthorizePersonFormProps) {


  const [dropBoxHadChoosed,setDropBoxHadChoosed] = useState<boolean>(false);
  const [triggerDropboxError,setTriggerDropboxError] = useState<boolean>(false)
  const [dropDownChoosed,setDropDownChoosed] = useState<string>("");
  const handleDropboxChoice = (choice:string)=>{
    setDropDownChoosed(choice)
    setDropBoxHadChoosed(true)
  }

  const validateData = (data: TAuthorizePerson): TAuthorizePerson => {
    let tmp = { ...data };
    if (tmp.citizendId) {
      tmp = { ...tmp, passportID: "" };
    }
    if (tmp.passportID) {
      tmp = { ...tmp, citizendId: "" };
    }
    tmp = { ...tmp, Types: "201" };
    return tmp;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAuthorizePerson>({
    resolver: zodResolver(authorizedPersonSchema),
  });

  const onSubmit = async (data: TAuthorizedPersonSchema) => {
    //const formData: TAuthorizePerson={ ...data,Types:"201"}
    if (dropBoxHadChoosed){
      setTriggerDropboxError(false)
      const formData = validateData(data)
      await sleep(500);
      reset();
      console.log(formData)
      onsubmit(formData)
    }else{
      setTriggerDropboxError(true)
    }
  };


  return (
    <Card className="p-4">
      <h1 className="font-bold text-xl py-4">Authorized person of Juristic Investor for traction</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("fullNames.title")}
              label="Title"
              id="Title"
              disabled={isSubmitting}
              
            />
            {errors.fullNames?.title && (
              <p className="text-red-500 text-sm px-2">{errors.fullNames?.title.message}</p>
            )}
          </div>
          <div className="w-1/2">
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("fullNames.firstName")}
              label="First Name"
              id="First Name"
              disabled={isSubmitting}
              
            />
            {errors.fullNames?.firstName && (
              <p className="text-red-500 text-sm px-2">
                {errors.fullNames?.firstName.message}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <Input
              {...register("fullNames.lastName")}
              label="Surname"
              id="Surname"
              disabled={isSubmitting}
              
            />
            {errors.fullNames?.lastName && (
              <p className="text-red-500 text-sm px-2">
                {errors.fullNames?.lastName.message}
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
                    <Dropbox onDropdownSelect={handleDropboxChoice}/>
                    {triggerDropboxError && (
              <p className="text-red-500 text-sm px-2">Please Choose IDCard or Passport</p>)}
                  </div>
                  <div className="w-1/3">
                  {dropDownChoosed ? (
                dropDownChoosed === "IDCard" ? (
                  <>
                    <Input
                        {...register("citizendId")}
                        label="IDCard"
                        id="idCard"
                        disabled={isSubmitting}
                    />
                    {triggerDropboxError && (
                      <p className="text-red-500 text-sm px-2">
                        Please Insert IDcard
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <Input
                        {...register("passportID")}
                        label="Passport"
                        id="passportID"
                        disabled={isSubmitting}
                    />
                    {triggerDropboxError && (
                      <p className="text-red-500 text-sm px-2">
                        Please Insert Passport
                      </p>
                    )}
                  </>
                )
            ) : (
                <><div className="relative w-full"><Input label="IDCard or Passport" id="passportID"/></div>
                {triggerDropboxError && (
                      <p className="text-red-500 text-sm px-2">
                        Please Insert IDCard or Passport
                      </p>
                    )}
                </>
            )}
                  </div>
                  <div className="w-1/3">
                    <Input
                        {...register("expiredDate")}
                        label="Date of Expired"
                        id="Date of Expired"
                        disabled={isSubmitting}
                        type="date"
                      />
                      {errors.expiredDate && (
                      <p className="text-red-500 text-sm px-2">
                        {errors.expiredDate.message}
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
          errors={errors.addresses}
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

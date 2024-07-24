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

export function FormAuthorizedPerson() {

  const [idCardError,setIdCardError] = useState<boolean>(true);
  const [passportError,setPassportError] = useState<boolean>(true);
  const [idcardInput,setIdCardInput] = useState<string>("");
  const [passportInput,setPassportInput] = useState<string>("");


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAuthorizePerson>({
    resolver: zodResolver(authorizedPersonSchema),
  });

  const onSubmit = async (data: TAuthorizedPersonSchema) => {
    const formData: TAuthorizePerson={ ...data,Types:"201"}
    if(validateIDcardPassport(formData)){
      await sleep(500);
      reset();
      console.log(formData)
    }else{

    }
  };


  const validateIDcardPassport = (data : any) => {
    let isValid = false;  

    if (data.idCard || data.passportID) {
      setIdCardError(false);   
      setPassportError(false); 
      isValid = true;          
    } else {
      setIdCardError(true);    
      setPassportError(true);  
    }
    return isValid;
  };


  const handleDeleteError = () =>{

    if (idcardInput || passportInput ){
      setIdCardError(false);    
      setPassportError(false);
    }else{
      setIdCardError(!idCardError);    
      setPassportError(!passportError);
    }
  }
  useEffect(() => {  

      handleDeleteError()
  }, [idcardInput,passportInput]);


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
            {errors.fullNames && (
              <p className="text-red-500 text-sm px-2">{errors.fullNames.message}</p>
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
            {errors.fullNames && (
              <p className="text-red-500 text-sm px-2">
                {errors.fullNames.message}
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
            {errors.fullNames && (
              <p className="text-red-500 text-sm px-2">
                {errors.fullNames.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Input
              {...register("idCard")}
              label="ID Card"
              id="ID Card"
              disabled={isSubmitting}
              onChange={(e)=>setIdCardInput(e.target.value)}
            />
            {idCardError &&  (
                <p className="text-red-500 px-4">
                  IDCard must be filled
                </p>
              )}
          </div>

          <div className="w-1/2">
                <Input
                    {...register("passportID")}
                    label="Passport"
                    id="Passport"
                    disabled={isSubmitting}
                    onChange={(e)=>setPassportInput(e.target.value)}
                    />
                    {passportError &&  (
                <p className="text-red-500 px-4">
                  Passport must be filled
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
          <div className="w-1/2">
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

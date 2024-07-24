import { Input } from "@/components/Input";
import { Card } from "@/components/ui/card";
import { CircleX, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  individualsShareholdersSchema,
  TIndividualsShareholdersSchema,
} from "../constants/schemas";
import { sleep } from "@/lib/utils";
import { useFormIndividualsShareholder } from "../hook/useFormIndividualsShareholder";
import { TIndividualsShareholders } from "../constants/types";
import { Table } from "./dataTable";
import { useState,useEffect } from "react";

export function FormIndividualsShareholders() {

  const [idCardError,setIdCardError] = useState<boolean>(true);
  const [passportError,setPassportError] = useState<boolean>(true);
  const [idcardInput,setIdCardInput] = useState<string>("");
  const [passportInput,setPassportInput] = useState<string>("");

  const {
    shareholders,
    individualsShareholder,
    removeIndividualsShareholders,
    editIndividualsShareholders,
    handleSetNewShareholder,
    serializeData,
  } = useFormIndividualsShareholder();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TIndividualsShareholdersSchema>({
    resolver: zodResolver(individualsShareholdersSchema),
    values: individualsShareholder,
  });


  const onSubmit = async (data: TIndividualsShareholdersSchema) => {
    const formData: TIndividualsShareholders={ ...data,Types:"301"}
    if(validateIDcardPassport(formData)){
      await sleep(500);
      reset();
      console.log(formData)
    }else{

    }
  };

  const validateIDcardPassport = (data : any) => {
    let isValid = false;
  
    if (data.idCard || data.passPort) {
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
    <>
      <div id="Individuals Shareholders" className="space-y-10">
        {/* <Card className="p-4">
          <h1 className="font-bold text-xl py-4">Individuals Shareholders</h1>
          <Table
            columns={columns}
            data={serializeData(shareholders)}
            onEdit={editIndividualsShareholders}
            onDelete={removeIndividualsShareholders}
          />
        </Card> */}

        <Card className="p-4">
          <h1 className="font-bold text-xl py-4">Individuals who shareholders of juristic's owner</h1>
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
                  <p className="text-red-500 text-sm px-2">
                    {errors.fullNames.message}
                  </p>
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
                  {...register("sharePercentage")}
                  label="Shares"
                  id="Shares"
                  disabled={isSubmitting}
                  
                  />
                  {errors.sharePercentage && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.sharePercentage.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">

                </div>
              </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}

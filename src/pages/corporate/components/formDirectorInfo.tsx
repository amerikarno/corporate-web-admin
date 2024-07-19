import { Input } from "@/components/Input";
import { Card } from "@/components/ui/card";
//import { CircleX, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  individualsDirectorSchema,
  TIndividualsDirectorSchema,
} from "../constants/schemas";
import { sleep } from "@/lib/utils";
import { TDirector } from "../constants/types";
import { Table } from "./dataTable";
import { AddressForm } from "./directorAddressForm";
import { useState,useEffect } from "react";


export function FormIndividualsDirector() {
//   const {
//     directors,
//     individualsDirector,
//     // removeIndividualsShareholders,
//     // editIndividualsShareholders,
//     // handleSetNewShareholder,
//     // serializeData,
//   } = useFormIndividualsDirector();
  const [idCardError,setIdCardError] = useState<boolean>(false);
  const [passportError,setPassportError] = useState<boolean>(false);
  const [directorInput,setDirectorInput] = useState<boolean>(true);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TDirector>({
    resolver: zodResolver(individualsDirectorSchema),
    //values: individualsDirector,
  });

  const validateIDcardPassport = (data : any) => {
    let isValid = false;
  
    if (data.directoridcard || data.directorpassport) {
      setIdCardError(false);   
      setPassportError(false); 
      isValid = true;          
    } else {
      setIdCardError(true);    
      setPassportError(true);  
    }
    return isValid;
  };
  const handleDeleteError = (e : React.ChangeEvent<HTMLInputElement>) =>{
    if (e.target.value){
      setIdCardError(false);    
      setPassportError(false);
    }else{
      setIdCardError(true);    
      setPassportError(true);
    }
  }

  const onSubmit = async (data: TIndividualsDirectorSchema) => {
    
    if(validateIDcardPassport(data)){
      await sleep(500);
      reset();
      console.log(data)
    }else{

    }
  };

  return (
    <>
      <div id="Director Infomation" className="space-y-10">
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
          <h1 className="font-bold text-xl py-4">Director Infomation :</h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                    <Input
                    {...register("directortitle")}
                    label="Title"
                    id="Title"
                    disabled={isSubmitting}
                />
                {errors.directortitle && (
                    <p className="text-red-500 text-sm px-2">
                    {errors.directortitle.message}
                    </p>
                )}
              </div>
              <div className="w-1/2">
                
              </div>
            </div>
            <div className="flex flex-row space-x-4">
                <div className="w-1/2">
                    <Input
                        {...register("directorname")}
                        label="Name"
                        id="Name"
                        disabled={isSubmitting}
                    />
                    {errors.directorname && (
                        <p className="text-red-500 text-sm px-2">
                        {errors.directorname.message}
                        </p>
                    )}
                </div>
                <div className="w-1/2">
                    <Input
                        {...register("directorsurname")}
                        label="Surname"
                        id="Surname"
                        disabled={isSubmitting}
                    />
                    {errors.directorsurname && (
                        <p className="text-red-500 text-sm px-2">
                        {errors.directorsurname.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                <Input
                  {...register("directoridcard")}
                  label="ID Number"
                  id="ID Number"
                  disabled={isSubmitting}
                  onChange={handleDeleteError}
                />
                {idCardError &&  (
                <p className="text-red-500 px-4">
                  IDCard must be fill
                </p>
              )}
              </div>
              <div className="w-1/2">
                <Input
                    {...register("directorpassport")}
                    label="Passport"
                    id="Passport"
                    disabled={isSubmitting}
                    onChange={handleDeleteError}
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
                  {...register("directornationality")}
                  label="Nationality"
                  id="Nationality"
                  disabled={isSubmitting}
                />
                {errors.directornationality && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.directornationality.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <Input
                    {...register("directorexpireddate")}
                    label="Date of Expired"
                    id="Date of Expired"
                    type="date"
                    disabled={isSubmitting}
                    />
                    {errors.directorexpireddate && (
                    <p className="text-red-500 text-sm px-2">
                        {errors.directorexpireddate.message}
                    </p>
                    )}
              </div>
            </div>

            <h1 className="font-bold text-xl py-4">Director's Address</h1>
            <AddressForm
              isSubmitting={isSubmitting}
              errors={errors.directoraddress}
              register={register}
              keyType="directoraddress"
            />
            {errors.directoraddress && (
              <p className="text-red-500 text-sm px-2">
                {errors.directoraddress.message}
              </p>
            )}
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

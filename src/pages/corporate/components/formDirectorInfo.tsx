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
import { DirectorAddressForm } from "./directorAddressForm";
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
  const [idCardError,setIdCardError] = useState<boolean>(true);
  const [passportError,setPassportError] = useState<boolean>(true);
  const [idcardInput,setIdCardInput] = useState<string>("");
  const [passportInput,setPassportInput] = useState<string>("");


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

  const onSubmit = async (data: TIndividualsDirectorSchema) => {
    const formData: TDirector={ ...data,Types:"101"}
    if(validateIDcardPassport(formData)){
      await sleep(500);
      reset();
      console.log(formData)
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
          <h1 className="font-bold text-xl py-4">List of Director</h1>
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
                        label="Name"
                        id="Name"
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
                  label="ID Number"
                  id="ID Number"
                  disabled={isSubmitting}
                  onChange={(e)=>setIdCardInput(e.target.value)}
                />
                {idCardError &&  (
                <p className="text-red-500 px-4">
                  IDCard must be fill
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
                    {...register("expiryDate")}
                    label="Date of Expired"
                    id="Date of Expired"
                    type="date"
                    disabled={isSubmitting}
                    />
                    {errors.expiryDate && (
                    <p className="text-red-500 text-sm px-2">
                        {errors.expiryDate.message}
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
                <div>

                </div>
            </div>

            <h1 className="font-bold text-xl py-4">Director's Address</h1>
            <DirectorAddressForm
              isSubmitting={isSubmitting}
              errors={errors.addresses}
              register={register}
              keyType="addresses"
            />
            {errors.addresses && (
              <p className="text-red-500 text-sm px-2">
                {errors.addresses.message}
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

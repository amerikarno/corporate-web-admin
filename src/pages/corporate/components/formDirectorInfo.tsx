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
import Dropbox from "@/components/Dropbox";


export function FormIndividualsDirector() {
//   const {
//     directors,
//     individualsDirector,
//     // removeIndividualsShareholders,
//     // editIndividualsShareholders,
//     // handleSetNewShareholder,
//     // serializeData,
//   } = useFormIndividualsDirector();

  const [dropBoxHadChoosed,setDropBoxHadChoosed] = useState<boolean>(false);
  const [dropDownChoosed,setDropDownChoosed] = useState<string>("");
  const handleDropboxChoice = (choice:string)=>{
    setDropDownChoosed(choice)
    setDropBoxHadChoosed(true)
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TDirector>({
    resolver: zodResolver(individualsDirectorSchema),
    //values: individualsDirector,
  });



  const onSubmit = async (data: TIndividualsDirectorSchema) => {
    const formData: TDirector={ ...data,Types:"101"}
    
      await sleep(500);
      reset();
      console.log(formData)

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
                  </div>
                  <div className="w-1/3">
                  {dropDownChoosed ? (
                dropDownChoosed === "IDCard" ? (
                    <Input
                        {...register("citizendId")}
                        label="IDCard"
                        id="idCard"
                        disabled={isSubmitting}
                    />
                ) : (
                    <Input
                        {...register("passportID")}
                        label="Passport"
                        id="passportID"
                        disabled={isSubmitting}
                    />
                )
            ) : (
                <><div className="relative w-full"><Input label="IDCard or Passport" id="passportID"/></div></>
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

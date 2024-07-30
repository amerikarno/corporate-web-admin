import { Input } from "@/components/Input";
import { Card } from "@/components/ui/card";
//import { CircleX, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  individualsContactPersonSchema,
  TIndividualsContactPersonSchema,
} from "../constants/schemas";
import { sleep } from "@/lib/utils";
import { useFormIndividualsContactPerson } from "../hook/useFormContactPerson";
//import { Table } from "./dataTable";
import { TContactPerson } from "../constants/types";

type TContactPersonArray = {
  contacts:TContactPerson[];
  corporateCode?:string;
}

type TContactPersonFormProps = {
  onsubmit: (data: TContactPersonArray) => void;
  corporateCode: string;
};

export function FormIndividualsContactPerson({
  onsubmit,
  corporateCode,
}: TContactPersonFormProps) {
  // const {
  //   contacts,
  //   individualsContact,
  //   // removeIndividualsShareholders,
  //   // editIndividualsShareholders,
  //   // handleSetNewShareholder,
  //   // serializeData,
  // } = useFormIndividualsContactPerson();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TIndividualsContactPersonSchema>({
    resolver: zodResolver(individualsContactPersonSchema),
    //values: individualsContact,
  });

  //   const columns = [
  //     { header: "Name-Surname", accessor: "nameSurname" },
  //     { header: "ID Card / Passport", accessor: "idCard" },
  //     { header: "Expiration Date", accessor: "expiredDate" },
  //     { header: "Nationality", accessor: "nationality" },
  //     { header: "% Shares", accessor: "shares" },
  //   ];

  const onSubmit = async (data: TContactPerson) => {
    let formData:TContactPersonArray = {
      contacts:[data],
      corporateCode:corporateCode
    }
    await sleep(500);
    reset();
    console.log(formData);
    onsubmit(formData);
  };

  return (
    <>
      <div id="Contact Person" className="space-y-10">
        <Card className="p-4">
          <h1 className="font-bold text-xl py-4">Contact Person</h1>
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
                  label="Name"
                  id="Name"
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
                  {...register("position")}
                  label="Position"
                  id="Position"
                  disabled={isSubmitting}
                />
                {errors.position && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.position.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <Input
                  {...register("division")}
                  label="division"
                  id="division"
                  disabled={isSubmitting}
                />
                {errors.division && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.division.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                <Input
                  {...register("email")}
                  label="email"
                  id="email"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <Input
                  {...register("telephone")}
                  label="Telephone"
                  id="Telephone"
                  disabled={isSubmitting}
                />
                {errors.telephone && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.telephone.message}
                  </p>
                )}
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

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

type TContactPersonFormProps = {
  onsubmit: (data: TContactPerson) => void;
  corporateCode: string;
};

export function FormIndividualsContactPerson({
  onsubmit,
}: TContactPersonFormProps) {
  const {
    // contacts,
    individualsContact,
    // removeIndividualsShareholders,
    // editIndividualsShareholders,
    // handleSetNewShareholder,
    // serializeData,
  } = useFormIndividualsContactPerson();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TIndividualsContactPersonSchema>({
    resolver: zodResolver(individualsContactPersonSchema),
    values: individualsContact,
  });

  const onSubmit = async (data: TIndividualsContactPersonSchema) => {
    await sleep(500);
    reset();
    console.log(data);
    onsubmit(data);
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
                  {...register("fullNames.title")}
                  label="Title"
                  id="Title"
                  disabled={isSubmitting}
                />
                {errors.fullNames?.title && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.fullNames?.title.message}
                  </p>
                )}
              </div>
              <div className="w-1/2"></div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                <Input
                  {...register("fullNames.firstName")}
                  label="Name"
                  id="Name"
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
                  {...register("Position")}
                  label="Position"
                  id="Position"
                  disabled={isSubmitting}
                />
                {errors.Position && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.Position.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <Input
                  {...register("Division")}
                  label="Division"
                  id="Division"
                  disabled={isSubmitting}
                />
                {errors.Division && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.Division.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                <Input
                  {...register("Email")}
                  label="Email"
                  id="Email"
                  disabled={isSubmitting}
                />
                {errors.Email && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.Email.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <Input
                  {...register("Telephone")}
                  label="Telephone"
                  id="Telephone"
                  disabled={isSubmitting}
                />
                {errors.Telephone && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.Telephone.message}
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

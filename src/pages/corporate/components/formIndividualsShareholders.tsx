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

export function FormIndividualsShareholders() {
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

  const columns = [
    { header: "Name-Surname", accessor: "nameSurname" },
    { header: "ID Card / Passport", accessor: "idCard" },
    { header: "Expiration Date", accessor: "expiredDate" },
    { header: "Nationality", accessor: "nationality" },
    { header: "% Shares", accessor: "shares" },
  ];

  const onSubmit = async (data: TIndividualsShareholdersSchema) => {
    await sleep(500);
    handleSetNewShareholder(data);
    reset();
  };

  return (
    <>
      <div id="Individuals Shareholders" className="space-y-10">
        <Card className="p-4">
          <h1 className="font-bold text-xl py-4">Individuals Shareholders</h1>
          <Table
            columns={columns}
            data={serializeData(shareholders)}
            onEdit={editIndividualsShareholders}
            onDelete={removeIndividualsShareholders}
          />
        </Card>

        <Card className="p-4">
          <h1 className="font-bold text-xl py-4">
            New Individual Shareholder :
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-1/4">
              <Input
                {...register("title")}
                label="Title"
                id="Title"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="text-red-500 text-sm px-2">
                  {errors.title.message}
                </p>
              )}
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
              <div className="w-1/2">
                <Input
                  {...register("shares")}
                  label="Shares"
                  id="Shares"
                  disabled={isSubmitting}
                />
                {errors.shares && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.shares.message}
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

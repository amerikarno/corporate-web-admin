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
import { useFormIndividualsDirector} from "../hook/useFormDirector"
import { TDirector } from "../constants/types";
import { Table } from "./dataTable";
import { AddressForm } from "./directorAddressForm";

export function FormIndividualsDirector() {
  const {
    directors,
    individualsDirector,
    // removeIndividualsShareholders,
    // editIndividualsShareholders,
    // handleSetNewShareholder,
    // serializeData,
  } = useFormIndividualsDirector();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TIndividualsDirectorSchema>({
    resolver: zodResolver(individualsDirectorSchema),
    values: individualsDirector,
  });

//   const columns = [
//     { header: "Name-Surname", accessor: "nameSurname" },
//     { header: "ID Card / Passport", accessor: "idCard" },
//     { header: "Expiration Date", accessor: "expiredDate" },
//     { header: "Nationality", accessor: "nationality" },
//     { header: "% Shares", accessor: "shares" },
//   ];

//   const onSubmit = async (data: TIndividualsContactPersonSchema) => {
//     await sleep(500);
//     handleSetNewShareholder(data);
//     reset();
//   };

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
          <h1 className="font-bold text-xl py-4">
            Director Infomation :
          </h1>
          {/* <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}> */}
          <form className="space-y-4">
            <div className="w-1/4">
              <Input
                {...register("directorname")}
                label="Name-Surname"
                id="Name-Surname"
                disabled={isSubmitting}
              />
              {errors.directorname && (
                <p className="text-red-500 text-sm px-2">
                  {errors.directorname.message}
                </p>
              )}
            </div>
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                <Input
                  {...register("directoridcard")}
                  label="Passport/ID Number"
                  id="Passport/ID Number"
                  disabled={isSubmitting}
                />
                {errors.directoridcard && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.directoridcard.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <Input
                  {...register("directorexpireddate")}
                  label="Date of Expired"
                  id="Date of Expired"
                  disabled={isSubmitting}
                />
                {errors.directorexpireddate && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.directorexpireddate.message}
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

            </div>
              {/* <div className="w-1/2">
              </div> */}
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

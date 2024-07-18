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
import { useFormIndividualsContactPerson} from "../hook/useFormContactPerson"
import { TContactPerson } from "../constants/types";
import { Table } from "./dataTable";

export function FormIndividualsContactPerson() {
  const {
    contacts,
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

//   const columns = [
//     { header: "Name-Surname", accessor: "nameSurname" },
//     { header: "ID Card / Passport", accessor: "idCard" },
//     { header: "Expiration Date", accessor: "expiredDate" },
//     { header: "Nationality", accessor: "nationality" },
//     { header: "% Shares", accessor: "shares" },
//   ];

  const onSubmit = async (data: TIndividualsContactPersonSchema) => {
    await sleep(500);
    //handleSetNewShareholder(data);
    reset();
    console.log(data)
  };

  return (
    <>
      <div id="Contact Person" className="space-y-10">
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
            Contact Person Infomation :
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                    <Input
                    {...register("contacttitle")}
                    label="Title"
                    id="Title"
                    disabled={isSubmitting}
                />
                {errors.contacttitle && (
                    <p className="text-red-500 text-sm px-2">
                    {errors.contacttitle.message}
                    </p>
                )}
              </div>
              <div className="w-1/2">
                
              </div>
            </div>
            <div className="flex flex-row space-x-4">
                <div className="w-1/2">
                    <Input
                        {...register("contactname")}
                        label="Name"
                        id="Name"
                        disabled={isSubmitting}
                    />
                    {errors.contactname && (
                        <p className="text-red-500 text-sm px-2">
                        {errors.contactname.message}
                        </p>
                    )}
                </div>
                <div className="w-1/2">
                    <Input
                        {...register("contactsurname")}
                        label="Surname"
                        id="Surname"
                        disabled={isSubmitting}
                    />
                    {errors.contactsurname && (
                        <p className="text-red-500 text-sm px-2">
                        {errors.contactsurname.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                <Input
                  {...register("contactposition")}
                  label="Position"
                  id="Position"
                  disabled={isSubmitting}
                />
                {errors.contactposition && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.contactposition.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <Input
                  {...register("contactdivision")}
                  label="Division"
                  id="Division"
                  disabled={isSubmitting}
                />
                {errors.contactdivision && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.contactdivision.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                <Input
                  {...register("contactphone")}
                  label="Telephone"
                  id="Telephone"
                  disabled={isSubmitting}
                />
                {errors.contactphone && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.contactphone.message}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <Input
                  {...register("contactemail")}
                  label="Email"
                  id="Email"
                  disabled={isSubmitting}
                />
                {errors.contactemail && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.contactemail.message}
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

// import { Input } from "@/components/Input";
// import { Card } from "@/components/ui/card";
// //import { CircleX, Pencil } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//     individualsJuristicShareholdersSchema,
//     TIndividualsJuristicShareholdersSchema,
// } from "../constants/schemas";
// import { sleep } from "@/lib/utils";
// import { useFormJuristicShareholders} from "../hook/useFormJuristicShareholders"
// import { TJuristicsShareholders } from "../constants/types";

import { useForm } from "react-hook-form";
import { TJuristicsShareholders } from "../constants/types";
import { useFormJuristicShareholders } from "../hook/useFormJuristicShareholders";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  individualsJuristicShareholdersSchema,
  TIndividualsJuristicShareholdersSchema,
} from "../constants/schemas";
import { sleep } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";

// import { Table } from "./dataTable";
type TJuristicsShareholdersFormProps = {
  onsubmit: (data: TJuristicsShareholders) => void;
};
export function FormJuristicShareholders({
  onsubmit,
}: TJuristicsShareholdersFormProps) {
  const {
    juristics,
    juristicShareholders,
    // removeIndividualsShareholders,
    // editIndividualsShareholders,
    // handleSetNewShareholder,
    // serializeData,
  } = useFormJuristicShareholders();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TJuristicsShareholders>({
    resolver: zodResolver(individualsJuristicShareholdersSchema),
    values: juristicShareholders,
  });

  //   const columns = [
  //     { header: "Name-Surname", accessor: "nameSurname" },
  //     { header: "ID Card / Passport", accessor: "idCard" },
  //     { header: "Expiration Date", accessor: "expiredDate" },
  //     { header: "Nationality", accessor: "nationality" },
  //     { header: "% Shares", accessor: "shares" },
  //   ];

  const onSubmit = async (data: TIndividualsJuristicShareholdersSchema) => {
    await sleep(500);
    //handleSetNewShareholder(data);
    reset();
    console.log(data);
    onsubmit(data);
  };

  return (
    <>
      <div
        id="Juristics who shareholders of juristic's owner"
        className="space-y-10"
      >
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
            Juristics who shareholders of juristic's owner :
          </h1>
          {/* <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}> */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                <Input
                  {...register("juristicName")}
                  label="Juristic-Name"
                  id="Juristic-Name"
                  disabled={isSubmitting}
                />
                {errors.juristicName && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.juristicName.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <Input
                  {...register("registrationNo")}
                  label="Commercial Registration No."
                  id="Commercial Registration No."
                  disabled={isSubmitting}
                />
                {errors.registrationNo && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.registrationNo.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                <Input
                  {...register("registeredCountry")}
                  label="Registration Country"
                  id="Registration Country"
                  disabled={isSubmitting}
                />
                {errors.registeredCountry && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.registeredCountry.message}
                  </p>
                )}
              </div>
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

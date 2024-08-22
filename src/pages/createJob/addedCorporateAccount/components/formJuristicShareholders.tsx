import { useForm } from "react-hook-form";
import { TJuristicsShareholders } from "../constants2/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  individualsJuristicShareholdersSchema,
  TIndividualsJuristicShareholdersSchema,
} from "../constants2/schemas";
import { sleep } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type TJuristicsShareholdersFormProps = {
  onsubmit: (data: TJuristicsShareholders) => void;
  corporateCode: string;
  choosedEditData?: TJuristicsShareholders | null;
  clearChoosedEditData: () => void;
};
export function FormJuristicShareholders({
  onsubmit,
  corporateCode,
  choosedEditData,
  clearChoosedEditData,
}: TJuristicsShareholdersFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TJuristicsShareholders>({
    resolver: zodResolver(individualsJuristicShareholdersSchema),
    //values: juristicShareholders,
  });

  const onSubmit = async (data: TIndividualsJuristicShareholdersSchema) => {
    await sleep(500);
    const body = {
      ...data,
      corporateCode: corporateCode,
      juristicId: choosedEditData?.juristicId,
    };
    reset();
    clearChoosedEditData();
    onsubmit(body);
  };

  useEffect(() => {
    const juristicData = choosedEditData || {
      juristicName: "",
      registrationNo: "",
      registeredCountry: "",
      sharePercentage: 0,
    };
    reset(juristicData);
    console.log("use effect", juristicData);
  }, [choosedEditData]);

  // const debug = (event: React.FormEvent<HTMLFormElement>) => {
  //   const formData = new FormData(event.currentTarget);
  //   const data: TJuristicsShareholders = {
  //     juristicName: formData.get("juristicName") as string,
  //     registrationNo: formData.get("registrationNo") as string,
  //     registeredCountry: formData.get("registeredCountry") as string,
  //     sharePercentage: Number(formData.get("sharePercentage")),
  //   };
  //   console.log(data);
  // };

  return (
    <>
      <div
        id="Juristics shareholders of juristic's owner"
        className="space-y-10"
      >
        <Card className="p-4">
          <h1 className="font-bold text-xl py-4">
            Juristics shareholders of juristic's owner
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* <form id="note" className="space-y-4" onSubmit={debug}> */}
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                <Input
                  {...register("juristicName")}
                  label="Juristic-Name"
                  id="Juristic-Name"
                  name="juristicName"
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
                  name="registrationNo"
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
                  name="registeredCountry"
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
                  type="number"
                  step="0.01"
                  disabled={isSubmitting}
                  name="sharePercentage"
                  //inputClassName="text-white focus:text-black"
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

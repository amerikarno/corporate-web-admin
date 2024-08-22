import { Input } from "@/components/Input";
import { Card } from "@/components/ui/card";
//import { CircleX, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  individualsContactPersonSchema,
  TIndividualsContactPersonSchema,
} from "../constants2/schemas";
import { sleep } from "@/lib/utils";
//import { Table } from "./dataTable";
import { TContactPerson } from "../constants2/types";
import { TContact } from "../../constant/type";
import { mapDataToTContactPerson } from "../libs/utils";
import { useEffect } from "react";
type TContactPersonArray = {
  contacts: TContactPerson[];
  corporateCode?: string;
  personalId?: string;
};

type TContactPersonFormProps = {
  onsubmit: (data: TContactPersonArray) => void;
  corporateCode: string;
  choosedEditData?: TContact | null;
  clearChoosedEditData: () => void;
};

export function FormIndividualsContactPerson({
  onsubmit,
  corporateCode,
  choosedEditData,
  clearChoosedEditData
}: TContactPersonFormProps) {

  console.log(choosedEditData)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TIndividualsContactPersonSchema>({
    resolver: zodResolver(individualsContactPersonSchema),
  });

  useEffect(() => {
      const contactPersonData = mapDataToTContactPerson(choosedEditData || null) || {
        fullNames: [{ title: '', firstName: '', lastName: '' }],
        position: '',
        division: '',
        telephone: '',
        email: '',
        personalId:''
      };
    console.log(contactPersonData)
    reset(contactPersonData);
  }, [choosedEditData, reset]);


  const onSubmit = async (data: TContactPerson) => {
    console.log(data)
    let formData: TContactPersonArray = {
      contacts: [{...data,personalId:choosedEditData?.personalId}],
      corporateCode: corporateCode,
    };
    await sleep(500);
    reset();
    console.log(formData);
    clearChoosedEditData();
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
                  label="Division"
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
              <div className="w-1/2">
                <Input
                  {...register("email")}
                  label="Email"
                  id="email"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.email.message}
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

import { Input } from "@/components/Input";
import { TIndividualsShareholders } from "../constants/types";
import { useState } from "react";
import {
  mockIndividualsShareholders1,
  mockIndividualsShareholders2,
} from "../constants/_mock/_data";
import { Card } from "@/components/ui/card";
import { CircleX, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  individualsShareholdersSchema,
  TIndividualsShareholdersSchema,
} from "../constants/schemas";
import { copy, sleep } from "@/lib/utils";
import { individualShareholder } from "../constants/initialData";

export function FormIndividualsShareholders() {
  const [shareholders, setShareholders] = useState<TIndividualsShareholders[]>(
    []
  );
  //   const [shareholders, setShareholders] = useState<TIndividualsShareholders[]>([
  //     mockIndividualsShareholders1,
  //     mockIndividualsShareholders2,
  //   ]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [individualsShareholder, setIndividualsShareholder] =
    useState<TIndividualsShareholders>(copy(individualShareholder));

  const removeIndividualsShareholders = (index: number) => {
    const newShareholders = shareholders.filter((_, i) => i !== index);
    setShareholders(newShareholders);
  };

  const editIndividualsShareholders = (index: number) => {
    console.log(shareholders[index]);
    setIsEdit(true);
    setIndividualsShareholder(shareholders[index]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TIndividualsShareholdersSchema>({
    resolver: zodResolver(individualsShareholdersSchema),
    values: individualsShareholder,
  });

  const onSubmit = async (data: TIndividualsShareholdersSchema) => {
    await sleep(500);
    reset();
    setShareholders([...shareholders, data]);
  };

  return (
    <>
      <div id="Individuals Shareholders" className="space-y-10">
        <Card className="p-4">
          <h1 className="font-bold text-xl py-4">Individuals Shareholders</h1>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name-Surname
                </th>
                <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Card / Passport
                </th>
                <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration Date
                </th>
                <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nationality
                </th>
                <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % Shares
                </th>
                <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Edit
                </th>
                <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shareholders.map((shareholder, index) => (
                <tr key={index}>
                  <td className="p-2 overflow-hidden whitespace-nowrap text-sm font-medium text-gray-900">
                    {`${shareholder.title} ${shareholder.firstName} ${shareholder.lastName}`}
                  </td>
                  <td className="p-2 overflow-hidden whitespace-nowrap text-sm text-gray-500">
                    {shareholder.idCard}
                  </td>
                  <td className="p-2 overflow-hidden whitespace-nowrap text-sm text-gray-500">
                    {shareholder.expiredDate}
                  </td>
                  <td className="p-2 overflow-hidden whitespace-nowrap text-sm text-gray-500">
                    {shareholder.nationality}
                  </td>
                  <td className="p-2 overflow-hidden whitespace-nowrap text-sm text-gray-500">
                    {shareholder.shares}
                  </td>
                  <td className="p-2 overflow-hidden whitespace-nowrap text-sm text-gray-500">
                    <Pencil
                      className="h-4 hover:cursor-pointer"
                      onClick={() => editIndividualsShareholders(index)}
                    />
                  </td>
                  <td className="p-2 overflow-hidden whitespace-nowrap text-sm text-gray-500">
                    <CircleX
                      className="h-4 hover:cursor-pointer"
                      color="red"
                      onClick={() => removeIndividualsShareholders(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

import { useEffect, useState } from "react";
import {
  // TBodyFormIndividualsShareholders,
  TIndividualsShareholders,
} from "../constants/types";
import { useForm } from "react-hook-form";
import {
  individualsShareholdersSchema,
  TIndividualsShareholdersSchema,
} from "../constants/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { sleep } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/Input";
import Dropbox from "@/components/Dropbox";
import { Button } from "@/components/ui/button";

type TShareHoldersFormProps = {
  onsubmit: (data: TIndividualsShareholders) => void;
  corporateCode: string;
};

export function FormIndividualsShareholders({
  onsubmit,
  corporateCode,
}: TShareHoldersFormProps) {
  const [initError, setInitError] = useState<boolean>(false);
  const [curInput, setCurInput] = useState<boolean>(false);
  const [dropDownChoosed, setDropDownChoosed] = useState<string>("ID");
  const handleDropboxChoice = (choice: string) => {
    setDropDownChoosed(choice);
  };

  const handleChange = (e: any) => {
    setInitError(false);
    setCurInput(e.target.value !== "");
  };

  const reformattedData = (
    data: TIndividualsShareholders
  ): TIndividualsShareholders => {
    let tmp = { ...data };
    if (tmp.citizendId) {
      tmp = { ...tmp, citizendId: "" };
    }
    if (tmp.passportId) {
      tmp = { ...tmp, passportId: "" };
    }
    tmp.types = 301;
    tmp.corporateCode = corporateCode;
    return tmp;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TIndividualsShareholdersSchema>({
    resolver: zodResolver(individualsShareholdersSchema),
  });

  const onSubmit = async (data: TIndividualsShareholders) => {
    if (curInput) {
      const formData = reformattedData(data);
      await sleep(500);
      reset();
      // console.log(formData);
      onsubmit(formData);
    } else {
      setInitError(true);
    }
  };

  return (
    <>
      <div id="Individuals Shareholders" className="space-y-10">
        <Card className="p-4">
          <h1 className="font-bold text-xl py-4">
            Individuals shareholders of juristic's owner
          </h1>
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
                    {errors.fullNames?.[0]?.message}
                  </p>
                )}
              </div>
              <div className="w-1/2"></div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="w-1/2">
                <Input
                  {...register("fullNames.0.firstName")}
                  label="First Name"
                  id="First Name"
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
                  {...register("sharePercentage")}
                  label="Shares"
                  id="Shares"
                  type="number"
                  step="0.01"
                  disabled={isSubmitting}
                />
                {errors.sharePercentage && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.sharePercentage.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="w-1/3">
                <Dropbox onDropdownSelect={handleDropboxChoice} />
              </div>
              <div className="w-1/3">
                {dropDownChoosed ? (
                  dropDownChoosed === "ID" ? (
                    <>
                      <Input
                        {...register("citizendId")}
                        label="Please fill ID"
                        id="idCard"
                        disabled={isSubmitting}
                        onChange={handleChange}
                      />
                      {initError && !curInput && (
                        <p className="text-red-500 text-sm px-2">
                          Please Insert ID
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <Input
                        {...register("passportID")}
                        label="Please fill Passport"
                        id="passportID"
                        disabled={isSubmitting}
                        onChange={handleChange}
                      />
                      {initError && !curInput && (
                        <p className="text-red-500 text-sm px-2">
                          Please Insert Passport
                        </p>
                      )}
                    </>
                  )
                ) : (
                  <>
                    <div className="relative w-full">
                      <Input
                        {...register("citizendId")}
                        label="Please fill ID"
                        id="idCard"
                        disabled={isSubmitting}
                        onChange={handleChange}
                      />
                    </div>
                    {initError && !curInput && (
                      <p className="text-red-500 text-sm px-2">
                        Please Insert ID
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="w-1/3">
                <Input
                  {...register("expiryDate")}
                  label="Date of Expired"
                  id="Date of Expired"
                  disabled={isSubmitting}
                  type="date"
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.expiryDate.message}
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

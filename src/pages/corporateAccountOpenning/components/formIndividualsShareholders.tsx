import { useState } from "react";
import {
  TBodyFormIndividualsShareholders,
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
import { formatDateToIsoString } from "../libs/utils";

type TShareHoldersFormProps = {
  onsubmit: (data: TIndividualsShareholders) => void;
  corporateCode: string;
};

export function FormIndividualsShareholders({
  onsubmit,
  corporateCode,
}: TShareHoldersFormProps) {
  const [dropBoxHadChoosed, setDropBoxHadChoosed] = useState<boolean>(false);
  const [triggerDropboxError, setTriggerDropboxError] =
    useState<boolean>(false);
  const [dropDownChoosed, setDropDownChoosed] = useState<string>("");
  const handleDropboxChoice = (choice: string) => {
    setDropDownChoosed(choice);
    setDropBoxHadChoosed(true);
  };

  const validateData = (
    data: TIndividualsShareholders
  ): TIndividualsShareholders => {
    let tmp = { ...data };
    if (tmp.citizendID) {
      tmp = { ...tmp, passportID: "" };
    }
    if (tmp.passportID) {
      tmp = { ...tmp, citizendID: "" };
    }
    tmp.types = "301";
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
    if (dropBoxHadChoosed) {
      setTriggerDropboxError(false);
      const formData = validateData(data);
      await sleep(500);
      reset();
      onsubmit(formData);
    } else {
      setTriggerDropboxError(true);
    }
  };

  return (
    <>
      <div id="Individuals Shareholders" className="space-y-10">
        <Card className="p-4">
          <h1 className="font-bold text-xl py-4">
            Individuals who shareholders of juristic's owner
          </h1>
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
                  label="First Name"
                  id="First Name"
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
                {triggerDropboxError && (
                  <p className="text-red-500 text-sm px-2">
                    Please Choose IDCard or Passport
                  </p>
                )}
              </div>
              <div className="w-1/3">
                {dropDownChoosed ? (
                  dropDownChoosed === "IDCard" ? (
                    <>
                      <Input
                        {...register("citizendId")}
                        label="IDCard"
                        id="idCard"
                        disabled={isSubmitting}
                      />
                      {triggerDropboxError && (
                        <p className="text-red-500 text-sm px-2">
                          Please Insert IDcard
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <Input
                        {...register("passportID")}
                        label="Passport"
                        id="passportID"
                        disabled={isSubmitting}
                      />
                      {triggerDropboxError && (
                        <p className="text-red-500 text-sm px-2">
                          Please Insert Passport
                        </p>
                      )}
                    </>
                  )
                ) : (
                  <>
                    <div className="relative w-full">
                      <Input label="IDCard or Passport" id="passportID" />
                    </div>
                    {triggerDropboxError && (
                      <p className="text-red-500 text-sm px-2">
                        Please Insert IDCard or Passport
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="w-1/3">
                <Input
                  {...register("expiredDate")}
                  label="Date of Expired"
                  id="Date of Expired"
                  disabled={isSubmitting}
                  type="date"
                />
                {errors.expiredDate && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.expiredDate.message}
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

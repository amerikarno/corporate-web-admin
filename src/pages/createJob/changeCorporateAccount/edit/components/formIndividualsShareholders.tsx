import { useEffect, useState } from "react";
import { TIndividualsShareholders } from "../constants/types";
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
import { checkFormatIDCard } from "@/lib/utils";
import { TIndividualShareholder as TIndividualShareholderEdit } from "../../constant/type";
import { mapDataToTIndividualShareholder } from "../libs/utils";
import { useDispatch } from "react-redux";
import { setTestCorporateData } from "@/features/corporateTest/corporateTestSlice";

type TShareHoldersFormProps = {
  onsubmit: (data: TIndividualsShareholders) => void;
  registerId: string;
  choosedEditData?: TIndividualShareholderEdit | null;
  clearChoosedEditData: () => void;
};

export function FormIndividualsShareholders({
  onsubmit,
  registerId,
  choosedEditData,
  clearChoosedEditData,
}: TShareHoldersFormProps) {
  const [triggeriderror, setTriggeriderror] = useState<string>("");
  const [curInputText, setCurInputText] = useState<string>("");
  const [initError, setInitError] = useState<boolean>(false);
  const [curInput, setCurInput] = useState<boolean>(false);
  const [dropDownChoosed, setDropDownChoosed] = useState<string>("ID");
  const handleDropboxChoice = (choice: string) => {
    console.log(choice);
    setCurInputText("");
    resetField("passportId");
    resetField("citizenId");
    setDropDownChoosed(choice);
  };

  const handleChange = (e: any) => {
    setCurInputText(e.target.value);
    setInitError(false);
    setCurInput(e.target.value !== "");
  };

  const reformattedData = (
    data: TIndividualsShareholders
  ): TIndividualsShareholders => {
    let tmp = { ...data };
    if (tmp.citizenId) {
      tmp = { ...tmp, passportId: "" };
    }
    if (tmp.passportId) {
      tmp = { ...tmp, citizenId: "" };
    }
    tmp.types = 301;
    tmp.registerId = registerId;
    tmp.personalId = choosedEditData?.personalId || "";
    tmp.citizenId = dropDownChoosed === "ID" ? curInputText : "",
    tmp.passportId = dropDownChoosed === "Passport" ? curInputText : ""
    tmp.sharePercentage = handleFloatValue(data.sharePercentage);
    return tmp;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    resetField,
    setValue
  } = useForm<TIndividualsShareholdersSchema>({
    resolver: zodResolver(individualsShareholdersSchema),
  });

  const handleFloatValue = (value: number | null): number => {
    if (!value) return 0;

    let newValue = value.toString();

    if (!newValue.includes(".")) {
      newValue += ".00000";
    } else {
      const [integerPart, decimalPart] = newValue.split(".");
      newValue = integerPart + "." + (decimalPart + "00000").slice(0, 5);
    }

    return Math.round(parseFloat(newValue) * 100000);
  };
  
  useEffect(() => {
    if (choosedEditData?.citizenId) {
      setDropDownChoosed("ID");
      setValue("citizenId", choosedEditData.citizenId);
    } else if (choosedEditData?.passportId) {
      setDropDownChoosed("Passport");
      setValue("passportId", choosedEditData.passportId);
    } else {
      setDropDownChoosed("ID");
    }
    setCurInputText(choosedEditData?.citizenId || choosedEditData?.passportId || "");
    setCurInput(!!choosedEditData?.citizenId || !!choosedEditData?.passportId);
  }, [choosedEditData, setValue]);

  useEffect(() => {
    const individualShareholderData = mapDataToTIndividualShareholder(
      choosedEditData || null
    ) || {
      fullNames: [{ title: "", firstName: "", lastName: "" }],
      nationality: "",
      sharePercentage: 0,
      citizenId: "",
      passportId: "",
      expiryDate: "mm/dd/yyyy",
    };
    reset(individualShareholderData);
    setHasDate(true);
  }, [choosedEditData, reset]);

  const [hasDate, setHasDate] = useState<boolean>(
    choosedEditData?.expiryDate ? true : false
  );
  const valideID = () => {
    if (dropDownChoosed === "ID") {
      if (checkFormatIDCard(curInputText)) return true;
      setTriggeriderror("Invalid ID.");
    }
    if (dropDownChoosed === "Passport") return true;
    return false;
  };
  const dispatch = useDispatch();
  const onSubmit = async (data: TIndividualsShareholders) => {
    console.log(curInput);
    console.log(valideID());
    if (curInput && valideID()) {
      const formData = reformattedData(data);
      setCurInputText("");
      setTriggeriderror("");
      setCurInput(false);
      await sleep(500);
      reset();
      console.log(formData);
      dispatch(setTestCorporateData(formData));
      clearChoosedEditData();
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
                  step="0.00001"
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
                <Dropbox
                  onDropdownSelect={handleDropboxChoice}
                  dropDownChoosedback={dropDownChoosed}
                />
              </div>

              <div className="w-1/3">
                {dropDownChoosed ? (
                  dropDownChoosed === "ID" ? (
                    <>
                      <Input
                        {...register("citizenId")}
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
                      <p className="text-red-500 text-sm px-2">
                        {triggeriderror}
                      </p>
                    </>
                  ) : (
                    <>
                      <Input
                        {...register("passportId")}
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
                      <p className="text-red-500 text-sm px-2">
                        {triggeriderror}
                      </p>
                    </>
                  )
                ) : (
                  <>
                    <div className="relative w-full">
                      <Input
                        {...register("citizenId")}
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
                    <p className="text-red-500 text-sm px-2">
                      {triggeriderror}
                    </p>
                  </>
                )}
              </div>
              {hasDate ? (
                <div className="w-1/3">
                  <Input
                    {...register("expiryDate")}
                    id="Date of Expired"
                    onClick={() => setHasDate(false)}
                    data-testid="expiredDate"
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.expiryDate.message}
                    </p>
                  )}
                </div>
              ) : (
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
              )}
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

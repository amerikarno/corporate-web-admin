import { Input } from "@/components/Input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  directorInfoSchema,
  TIndividualsDirectorSchema,
} from "../constants/schemas";
import { sleep } from "@/lib/utils";
import { TDirector } from "../constants/types";
import { TDirector as TDirectorEdit } from "../../constant/type";
import { DirectorAddressForm } from "./directorAddressForm";
import { useEffect, useState } from "react";
import Dropbox from "@/components/Dropbox";
import { checkFormatIDCard } from "@/lib/utils";
import { mapDataToTDirector } from "../libs/utils";

type TDirectorFormProps = {
  onsubmit: (data: TDirector) => void;
  corporateCode: string;
  personalId?: string;
  choosedEditData?: TDirector | null;
  clearChoosedEditData: () => void;
};

export function FormIndividualsDirector({
  onsubmit,
  corporateCode,
  choosedEditData,
  clearChoosedEditData,
}: TDirectorFormProps) {
  const [triggeriderror, setTriggeriderror] = useState<string>("");
  const [curInputText, setCurInputText] = useState<string>("");
  const [initError, setInitError] = useState<boolean>(false);
  const [curInput, setCurInput] = useState<boolean>(false);
  const [dropDownChoosed, setDropDownChoosed] = useState<string>("ID");
  const [hasDate, setHasDate] = useState<boolean>(
    choosedEditData?.expiryDate ? true : false
  );
  const handleDropboxChoice = (choice: string) => {
    setValue("passportId", "");
    setValue("citizenId", "");

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

  const validateData = (data: TDirector): TDirector => {
    let tmp = { ...data };

    if (tmp.citizenId) {
      tmp = { ...tmp, passportId: "" };
    }
    if (tmp.passportId) {
      tmp = { ...tmp, citizenId: "" };
    }
    //tmp = { ...tmp, types: "101" };
    return tmp;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    resetField,
    setValue,
  } = useForm<TDirector>({
    resolver: zodResolver(directorInfoSchema),
  });
  useEffect(() => {
    if (choosedEditData?.citizenId) {
      setDropDownChoosed("ID");
      console.log(choosedEditData.citizenId);
      setValue("citizenId", choosedEditData.citizenId);
    } else if (choosedEditData?.passportId) {
      setDropDownChoosed("Passport");
      console.log(choosedEditData.passportId);
      setValue("passportId", choosedEditData.passportId);
    }
  }, [choosedEditData]);

  useEffect(() => {
    //const dateFormatted = choosedEditData?.expiryDate.split('T')[0]; 
    // console.log(dateFormatted)
    // const dateParts = dateFormatted.split('-'); // ["2024", "08", "29"]
    // const date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
    const directorData = choosedEditData || {
      fullNames: [{ title: "", firstName: "", lastName: "" }],
      citizenId: "",
      passportId: "",
      expiryDate: "mm/dd/yyyy",
      nationality: "",
      addresses: [
        {
          addressNo: "",
          building: "",
          floor: "",
          mooNo: "",
          soi: "",
          road: "",
          tambon: "",
          amphoe: "",
          province: "",
          postalCode: "",
          country: "",
        },
      ],
    };
    reset(directorData);
    setHasDate(true);
    setCurInputText(
      choosedEditData?.citizenId || choosedEditData?.passportId || ""
    );
    setCurInput(
      choosedEditData?.citizenId !== "" || choosedEditData?.passportId !== ""
    );
    if (choosedEditData) {
      const chosenValue = choosedEditData.citizenId ? "ID" : "Passport";
      setDropDownChoosed(chosenValue);
    }
  }, [choosedEditData, reset]);

  const valideID = () => {
    if (dropDownChoosed === "ID") {
      if (checkFormatIDCard(curInputText)) return true;
      setTriggeriderror("Invalid ID.");
    }
    if (dropDownChoosed === "Passport") return true;
    return false;
  };

  const onSubmit = async (data: TIndividualsDirectorSchema) => {
    //const formData: TDirector={ ...data,Types:"101"}
    if (curInput && valideID()) {
      const formData = validateData(data);
      setCurInputText("");
      setTriggeriderror("");
      setCurInput(false);
      await sleep(500);
      reset();
      // console.log(formData);

      let body: TDirector = {
        ...formData,
        types: 101,
        addresses: data.addresses,
        fullNames: data.fullNames,
        corporateCode: corporateCode,
        personalId: choosedEditData?.personalId,
      };

      console.log(body);
      clearChoosedEditData();
      onsubmit(body);
    } else {
      setInitError(true);
    }
  };

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
          <h1 className="font-bold text-xl py-4">List of Director</h1>
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

            <div className="flex flex-col space-y-4 md:space-x-4 md:space-y-0 md:flex-row items-center">
              <div className="w-full md:w-1/2 flex flex-row items-center justify-between gap-4">
                <div className="w-full md:w-1/2">
                  <Dropbox
                    onDropdownSelect={handleDropboxChoice}
                    dropDownChoosedback={dropDownChoosed}
                  />
                </div>
                <div className="w-full md:w-1/2">
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
                          id="passportId"
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
              </div>
              {hasDate ? (
                <div className="w-full md:w-1/2">
                  <Input
                    {...register("expiryDate")}
                    id="Date of Expired"
                    onClick={() => setHasDate(false)}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.expiryDate.message}
                    </p>
                  )}
                </div>
              ) : (
                <div className="w-full md:w-1/2">
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

            <div className="flex flex-row space-x-0 md:space-x-4">
              <div className="w-full md:w-1/2">
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
              <div className="w-0 md:w-1/2"></div>
            </div>

            <h1 className="font-bold text-xl py-4">Director's Address</h1>
            <DirectorAddressForm
              isSubmitting={isSubmitting}
              errors={errors.addresses?.[0]}
              register={register}
              keyType="addresses"
            />
            {errors.addresses?.[0] && (
              <p className="text-red-500 text-sm px-2">
                {errors.addresses?.[0]?.message}
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

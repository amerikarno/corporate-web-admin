import { useEffect, useState } from "react";
import { TAuthorizePerson } from "../constants/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  authorizedPersonSchema,
  TAuthorizedPersonSchema,
} from "../constants/schemas";
import { sleep } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/Input";
import Dropbox from "@/components/Dropbox";
import { AddressFormAuthorizedPerson } from "./addressFormAuthorizedPerson";
import { Button } from "@/components/ui/button";
import { checkFormatIDCard } from "@/lib/utils";

type TAuthorizePersonFormProps = {
  onsubmit: (data: TAuthorizePerson) => void;
  corporateCode: string;
  choosedEditData?: TAuthorizePerson | null;
  clearChoosedEditData: () => void;
};
export function FormAuthorizedPerson({
  onsubmit,
  corporateCode,
  choosedEditData,
  clearChoosedEditData,
}: TAuthorizePersonFormProps) {
  const [triggeriderror, setTriggeriderror] = useState<string>("");
  const [curInputText, setCurInputText] = useState<string>("");
  const [initError, setInitError] = useState<boolean>(false);
  const [curInput, setCurInput] = useState<boolean>(false);
  const [dropDownChoosed, setDropDownChoosed] = useState<string>("ID");


  const handleChange = (e: any) => {
    setCurInputText(e.target.value);
    setInitError(false);
    setCurInput(e.target.value !== "");
  };


  const validateData = (data: TAuthorizePerson): TAuthorizePerson => {
    let tmp = { ...data };
    if (tmp.citizenId) {
      tmp = { ...tmp, passportId: "" };
    }
    if (tmp.passportId) {
      tmp = { ...tmp, citizenId: "" };
    }
    //tmp = { ...tmp, types: "201" };
    return tmp;
  };

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TAuthorizedPersonSchema>({
    resolver: zodResolver(authorizedPersonSchema),
  });

  const handleDropboxChoice = (choice: string) => {
    setValue('passportId', '');
    setValue('citizenId', '');

    console.log(choice);
    setCurInputText("");
    resetField("passportId");
    resetField("citizenId");
    setDropDownChoosed(choice);
  };

  useEffect(() => {
    if (choosedEditData?.citizenId) {
      setDropDownChoosed("ID");
      console.log(choosedEditData.citizenId)
      setValue('citizenId', choosedEditData.citizenId);
    } else if (choosedEditData?.passportId) {
      setDropDownChoosed("Passport");
      console.log(choosedEditData.passportId)
      setValue('passportId', choosedEditData.passportId);
    }
  }, [choosedEditData]);
  const valideID = () => {
    if (dropDownChoosed === "ID") {
      if (checkFormatIDCard(curInputText)) return true;
      setTriggeriderror("Invalid ID.");
    }
    if (dropDownChoosed === "Passport") return true;
    return false;
  };

  const onSubmit = async (data: TAuthorizedPersonSchema) => {
    if (curInput && valideID()) {
      const formData = validateData(data);
      setCurInputText("");
      setTriggeriderror("");
      setCurInput(false);
      await sleep(500);
      reset();
      let body: TAuthorizePerson = {
        ...formData,
        types: 201,
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

  useEffect(() => {
    const authorizedPersonData = choosedEditData || {
      fullNames:[{
        title: '',
        firstName: '',
        lastName: '',
      }],
      passportId:'',
      citizenId: '',
      expiryDate: new Date(),
      nationality:'',
      addresses: [
        { addressNo: "",
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
        }
      ],
    }
    reset(authorizedPersonData);
    setCurInputText(choosedEditData?.citizenId || choosedEditData?.passportId || "" )
    setCurInput(choosedEditData?.citizenId !== "" || choosedEditData?.passportId !== "");
    if (choosedEditData) {
      const chosenValue = choosedEditData.citizenId ? "ID" : "Passport";
      setDropDownChoosed(chosenValue);
    }
  }, [choosedEditData, reset]);

  return (
    <Card className="p-4">
      <h1 className="font-bold text-xl py-4">
        Authorized person of Juristic Investor for traction
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

        <div className="flex flex-col space-y-4 md:space-x-4 md:space-y-0 md:flex-row items-center">
          <div className="w-full md:w-1/2 flex flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <Dropbox onDropdownSelect={handleDropboxChoice} dropDownChoosedback={dropDownChoosed}/>
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
                  <p className="text-red-500 text-sm px-2">{triggeriderror}</p>
                </>
              )}
            </div>
          </div>
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

        <h1 className="font-bold text-xl py-4">Authorized Person's Address</h1>
        <AddressFormAuthorizedPerson
          isSubmitting={isSubmitting}
          keyType="addresses"
          register={register}
          errors={errors.addresses?.[0]}
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
  );
}

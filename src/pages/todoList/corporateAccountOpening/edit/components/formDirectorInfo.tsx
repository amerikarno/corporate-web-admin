import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  directorInfoSchema,
} from "../constants/schemas";
import { TDirector } from "../constants/types";
import { useEffect } from "react";


type TDirectorFormProps = {
  onsubmit: (data: TDirector) => void;
  registerId: string;
  personalId?: string;
  choosedEditData?: TDirector | null;
  clearChoosedEditData: () => void;
};

export function FormIndividualsDirector({
  choosedEditData,

}: TDirectorFormProps) {


  const {
    reset,
  } = useForm<TDirector>({
    resolver: zodResolver(directorInfoSchema),
  });



  useEffect(() => {

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
  }, [choosedEditData, reset]);


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

        {/* <Card className="p-4">
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
                  label="First Name"
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
                    data-testid="expiredDate"
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
        </Card> */}
      </div>
    </>
  );
}

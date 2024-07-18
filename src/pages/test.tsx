import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { checkFormatIDCard, isNumber, sleep } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { TAuthorizePerson } from "./corporate/constants/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const addressSchema = z.object({
  addressNo: z.string().min(1, "addressNo cannot be empty"),
  building: z.string().optional(),
  moo: z.string().optional(),
  soi: z.string().optional(),
  road: z.string().optional(),
  subDistrict: z.string().min(1, "subDistrict cannot be empty"),
  district: z.string().min(1, "district cannot be empty"),
  province: z.string().min(1, "province cannot be empty"),
  postalCode: z
    .string()
    .min(1, "postalCode cannot be empty")
    .superRefine((val, ctx) => {
      if (!isNumber(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Should be number",
          fatal: true,
        });
        return z.NEVER;
      }
    }),
  phone: z.string().min(1, "phone cannot be empty"),
  email: z.string().email(),
});

const authorizedPersonSchema = z.object({
  title: z.string().min(1, "title cannot be empty"),
  firstName: z.string().min(1, "firstName cannot be empty"),
  lastName: z.string().min(1, "lastName cannot be empty"),
  idCard: z
    .string()
    .min(1, "idCard cannot be empty")
    .superRefine((val, ctx) => {
      if (val.length != 13) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Should be 13 digits",
          fatal: true,
        });
        return z.NEVER;
      }

      if (!checkFormatIDCard(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid number",
        });
      }
    }),
  expiredDate: z.string().min(1, "date cannot be empty"),
  nationality: z.string().min(1, "nationality cannot be empty"),
  address: addressSchema,
});

type TAuthorizedPersonSchema = z.infer<typeof authorizedPersonSchema>;

export function FormTest() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAuthorizePerson>({
    resolver: zodResolver(authorizedPersonSchema),
  });

  const onSubmit = async (data: TAuthorizedPersonSchema) => {
    await sleep(500);
    console.log(data);
    reset();
  };

  return (
    <Card className="p-4">
      <h1 className="font-bold text-xl py-4">Authorized Person :</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-1/2">
          <Input
            {...register("title")}
            label="Title"
            id="Title"
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-red-500 text-sm px-2">{errors.title.message}</p>
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
        </div>

        <section id="address">
          <h1 className="font-bold text-xl py-4">
            Authorized Person's Address :
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                {...register("address.addressNo")}
                label="Address No"
                id="Address No"
                disabled={isSubmitting}
              />
              {errors.address?.addressNo && (
                <p className="text-red-500 text-sm px-2">
                  {errors.address.addressNo.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("address.building")}
                label="Building"
                id="Building"
                disabled={isSubmitting}
              />
              {errors.address?.building && (
                <p className="text-red-500 text-sm px-2">
                  {errors.address.building.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("address.moo")}
                label="Moo"
                id="Moo"
                disabled={isSubmitting}
              />
              {errors.address?.moo && (
                <p className="text-red-500 text-sm px-2">
                  {errors.address.moo.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("address.soi")}
                label="Soi"
                id="Soi"
                disabled={isSubmitting}
              />
              {errors.address?.soi && (
                <p className="text-red-500 text-sm px-2">
                  {errors.address.soi.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("address.road")}
                label="Road"
                id="Road"
                disabled={isSubmitting}
              />
              {errors.address?.road && (
                <p className="text-red-500 text-sm px-2">
                  {errors.address.road.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("address.subDistrict")}
                label="Sub-District"
                id="Sub-District"
                disabled={isSubmitting}
              />
              {errors.address?.subDistrict && (
                <p className="text-red-500 text-sm px-2">
                  {errors.address.subDistrict.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("address.district")}
                label="District"
                id="District"
                disabled={isSubmitting}
              />
              {errors.address?.district && (
                <p className="text-red-500 text-sm px-2">
                  {errors.address.district.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("address.province")}
                label="Province"
                id="Province"
                disabled={isSubmitting}
              />
              {errors.address?.province && (
                <p className="text-red-500 text-sm px-2">
                  {errors.address.province.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("address.postalCode")}
                label="Postal Code"
                id="Postal Code"
                disabled={isSubmitting}
              />
              {errors.address?.postalCode && (
                <p className="text-red-500 text-sm px-2">
                  {errors.address.postalCode.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("address.phone")}
                label="Phone"
                id="Phone"
                disabled={isSubmitting}
              />
              {errors.address?.phone && (
                <p className="text-red-500 text-sm px-2">
                  {errors.address.phone.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("address.email")}
                label="Email"
                id="Email"
                type="email"
                disabled={isSubmitting}
              />
              {errors.address?.email && (
                <p className="text-red-500 text-sm px-2">
                  {errors.address.email.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* <div>
          <h1 className="font-bold p-4 border-t">
            Country's Source Of Income / Investment Fund
          </h1>
          <div className="p-4 border-t">
            <div className="grid grid-cols-2 ">
              {countrySourceOfIncome.map((item, i) => (
                <CheckBox
                  key={i}
                  label={item}
                  onChange={handeleCountrySourceOfIncome}
                  name={item}
                  disabled={disableCountrySourceOfIncome(item)}
                />
              ))}
            </div>
            {isCountrySourceOfIncomeOthers && (
              <div className="flex justify-end px-4 py-2">
                <Input
                  className="w-1/2"
                  placeholder="Please Specify"
                  onChange={(e) =>
                    handleInputOthers(e, "countrySourceOfIncome")
                  }
                />
              </div>
            )}
            {errors && getError(["countrySourceOfIncome"], errors) && (
              <p className="text-red-500 px-4">
                {getError(["countrySourceOfIncome"], errors)?.message}
              </p>
            )}
          </div>
          <div className="p-4 border-t">
            <h1 className="">Investment Objective</h1>
          </div>
          <div className="pt-4 px-4 border-t">
            {investmentObjective.map((item, i) => (
              <CheckBox
                key={i}
                label={item}
                onChange={handeleInvestmentObjective}
                name={item}
                disabled={disableInvestmentObjective(item)}
              />
            ))}
          </div>
          {isInvestmentObjectiveOthers && (
            <div className="flex justify-start px-4 py-2">
              <Input
                className="w-1/2"
                placeholder="Please Specify"
                onChange={(e) => handleInputOthers(e, "investmentObjective")}
              />
            </div>
          )}
          {errors && getError(["investmentObjective"], errors) && (
            <p className="text-red-500 p-4">
              {getError(["investmentObjective"], errors)?.message}
            </p>
          )}
        </div> */}

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

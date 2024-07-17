import { z } from "zod";

export const addressSchema = z.object({
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
    .refine(
      (value) => {
        return /^\d+$/.test(value);
      },
      {
        message: "postal code must be number",
      }
    ),
  phone: z
    .string()
    .min(1, "phone cannot be empty")
    .refine(
      (value) => {
        return /^\d+$/.test(value);
      },
      {
        message: "phone must be number",
      }
    ),
  email: z.string().email(),
});

export const financialInfoSchema = z.object({
  registeredCapital: z.string().optional(),
  revenuePerYear: z.string().optional(),
  netProfit: z.string().optional(),
  shareholderEquity: z.string().optional(),
});

export const corporateInfoSchema = z.object({
  name: z.string().min(1, "name cannot be empty"),
  commercialRegisteredNo: z
    .string()
    .min(1, "commercialRegisteredNo cannot be empty"),
  taxId: z.string().min(1, "taxId cannot be empty"),
  dateIncorporation: z.string().min(1, "dateIncorporation cannot be empty"),
  registeredCountry: z.string().min(1, "registeredCountry cannot be empty"),
  operateCountry: z.string().min(1, "operateCountry cannot be empty"),
  registeredAddress: addressSchema,
  incorporatedAddress: addressSchema,
  financial: financialInfoSchema.optional(),
});

export type TCorporateInfoSchema = z.infer<typeof corporateInfoSchema>;
export type TAddressSchema = z.infer<typeof addressSchema>;
export type TFinancailInfoSchema = z.infer<typeof financialInfoSchema>;

export const corporateTypeAndIncomeSchema = z.object({
  juristicType: z.string().min(1, "juristicType cannot be empty"),
  juristicThai: z.string().optional(),
  juristicForeign: z.string().optional(),
  juristicOthers: z.string().optional(),
  businessType: z.string().min(1, "businessType cannot be empty"),
  sourceOfIncome: z
    .array(z.string().min(1, "sourceOfIncome cannot be empty"))
    .nonempty(),
  countrySourceOfIncome: z
    .string()
    .min(1, "countrySourceOfIncome cannot be empty"),
  investmentObjective: z.string().min(1, "investmentObjective cannot be empty"),
});

export type TCorporateTypeAndIncomeSchema = z.infer<
  typeof corporateTypeAndIncomeSchema
>;

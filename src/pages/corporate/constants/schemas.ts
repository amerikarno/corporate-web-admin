import { z } from "zod";

export const addressSchema = z.object({
  addressNo: z.string().min(1, "addressNo cannot be empty"),
  building: z.string().min(1, "building cannot be empty"),
  moo: z.string().min(1, "moo cannot be empty"),
  soi: z.string().min(1, "soi cannot be empty"),
  road: z.string().min(1, "road cannot be empty"),
  subDistrict: z.string().min(1, "subDistrict cannot be empty"),
  district: z.string().min(1, "district cannot be empty"),
  province: z.string().min(1, "province cannot be empty"),
  postalCode: z.string().min(1, "postalCode cannot be empty"),
  country: z.string().min(1, "country cannot be empty"),
  phone: z.string().min(1, "phone cannot be empty"),
  type: z.number(),
});

export const financailInfoSchema = z.object({
  registeredCapital: z.string().min(1, "registeredCapital cannot be empty"),
  revenuePerYear: z.string().min(1, "revenuePerYear cannot be empty"),
  netProfit: z.string().min(1, "netProfit cannot be empty"),
  shareholderEquity: z.string().min(1, "shareholderEquity cannot be empty"),
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
  registeredAddress: z.string().min(1, "registeredAddress cannot be empty"),
  incorporatedAddress: z.string().min(1, "incorporatedAddress cannot be empty"),
  financial: financailInfoSchema.optional(),
});

export type TCorporateInfoSchema = z.infer<typeof corporateInfoSchema>;

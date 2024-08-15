import { z } from "zod";

export const corporateAccountOpeningSchema = z.object({
  corporateCode: z.string(),
  // corporateName: z.string(),
  // taxId: z.coerce.number(),
  // dateFrom: z
  //   .string()
  //   .transform((str) => new Date(str))
  //   .optional(),
  // dateTo: z
  //   .string()
  //   .transform((str) => new Date(str))
  //   .optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export type TCorporateAccountOpening = z.infer<
  typeof corporateAccountOpeningSchema
>;

export const corporateInfoSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  corporateCode: z.number(),
  name: z.string(),
  registrationNo: z.string(),
  taxId: z.string(),
  dateOfIncorporation: z.string(),
});

export const corporateCountrySchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  corporateCode: z.number(),
  // isThailand: z.boolean().optional(),
  other: z.string(),
  types: z.number(),
});

export const corporateSubAddressSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  corporateCode: z.number(),
  addressNo: z.string(),
  mooNo: z.string(),
  building: z.string(),
  floor: z.string(),
  soi: z.string(),
  road: z.string(),
  tambon: z.string(),
  amphoe: z.string(),
  province: z.string(),
  postalCode: z.string(),
  country: z.string(),
  types: z.number(),
});

export const corporateAddressSchema = z.object({
  address: z.array(corporateSubAddressSchema),
  emailAddress: z.string().email(),
  telephone: z.string(),
});

export const corporateFinancialsSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  corporateCode: z.number(),
  registeredCapital: z.number(),
  revenuePerYear: z.number(),
  netProfitLoss: z.number(),
  shareholderEquity: z.number(),
});

export const corporateTypesSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  corporateCode: z.number(),
  istaxExempt: z.boolean(),
});

export const businessTypesSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  corporateCode: z.number(),
  ishotelRestaurant: z.boolean(),
  otherBusinessType: z.string(),
});

export const sourceOfIncomesSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  corporateCode: z.number(),
  isotherIncome: z.boolean(),
  otherIncome: z.string(),
});

export const countrySourceIncomesSchema = z.object({
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  corporateCountry: corporateCountrySchema,
  isliquidation: z.boolean(),
  otherInvestment: z.string(),
});

export const contactFullNameSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  contactID: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  types: z.number(),
});

export const contactSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  corporateCode: z.number(),
  fullnames: z.array(contactFullNameSchema),
  telephone: z.string().optional(),
  email: z.string(),
  types: z.number(),
  personalID: z.string(),
  position: z.string(),
  division: z.string(),
});

export const fullNameSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  ReferenceID: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  types: z.number(),
});

export const addressSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  ReferenceID: z.string(),
  addressNo: z.string(),
  tambon: z.string(),
  amphoe: z.string(),
  province: z.string(),
  postalCode: z.string(),
  country: z.string(),
  types: z.number(),
});

export const directorSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  personalId: z.string(),
  corporateCode: z.number(),
  fullnames: z.array(fullNameSchema),
  addresses: z.array(addressSchema),
  passportId: z.string(),
  expiryDate: z.string(),
  nationality: z.string(),
  types: z.number(),
});

export const authorizedPersonSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  personalId: z.string(),
  corporateCode: z.number(),
  fullnames: z.array(fullNameSchema),
  addresses: z.array(addressSchema),
  passportId: z.string(),
  expiryDate: z.string(),
  nationality: z.string(),
  types: z.number(),
});

export const individualShareholderSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  personalId: z.string(),
  corporateCode: z.number(),
  fullnames: z.array(fullNameSchema),
  passportId: z.string(),
  expiryDate: z.string(),
  nationality: z.string(),
  types: z.number(),
  sharePercentage: z.number(),
});

export const juristicSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  corporateCode: z.number(),
  juristicName: z.string(),
  registrationNo: z.string(),
  registeredCountry: z.string(),
  sharePercentage: z.number(),
});

export const bankSchema = z.object({
  id: z.string(),
  createBy: z.string(),
  CreatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  corporateCode: z.number(),
  accountType: z.string(),
  bankName: z.string(),
  accountNo: z.string(),
  accountLocation: z.string(),
  swiftCode: z.string(),
});

export const corporateDataSchema = z.object({
  CorporateCode: z.number(),
  Info: corporateInfoSchema,
  CorporateCountry: z.array(corporateCountrySchema),
  CorporateAddress: z.array(corporateAddressSchema),
  CorporateFinancials: corporateFinancialsSchema,
  CorporateTypes: corporateTypesSchema,
  BusinessTypes: businessTypesSchema,
  SourceOfIncomes: sourceOfIncomesSchema,
  CountrySourceIncomes: z.array(countrySourceIncomesSchema),
  Contact: z.array(contactSchema),
  Directors: z.array(directorSchema),
  AuthorizedPersons: z.array(authorizedPersonSchema),
  IndividualShareholders: z.array(individualShareholderSchema),
  Juristics: z.array(juristicSchema),
  Banks: z.array(bankSchema),
});

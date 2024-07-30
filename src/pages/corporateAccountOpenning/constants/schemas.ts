import { checkFormatIDCard } from "@/lib/utils";
import { z } from "zod";

export const subAddressSchema = z.object({
  addressNo: z.string().min(1, "addressNo cannot be empty"),
  mooNo: z.string().optional(),
  soi: z.string().optional(),
  road: z.string().optional(),
  tambon: z.string().min(1, "subDistrict cannot be empty"),
  amphoe: z.string().min(1, "district cannot be empty"),
  province: z.string().min(1, "province cannot be empty"),
  postalCode: z.string().min(1, "postalCode cannot be empty"),
  country: z.string().min(1, "Country cannot be empty"),
});

const fullNamesSchema = z.array(
  z.object({
    title: z.string().min(1, "title cannot be empty"),
    firstName: z.string().min(1, "firstName cannot be empty"),
    lastName: z.string().min(1, "lastName cannot be empty"),
  })
);

export const addressSchema = z.object({
  // AddressNo: z.string().min(1, "addressNo cannot be empty"),
  // Building: z.string().optional(),
  // MooNo: z.string().optional(),
  // Soi: z.string().optional(),
  // Road: z.string().optional(),
  // Tambon: z.string().min(1, "subDistrict cannot be empty"),
  // Amphoe: z.string().min(1, "district cannot be empty"),
  // Province: z.string().min(1, "province cannot be empty"),
  // PostalCode: z.string().min(1, "postalCode cannot be empty"),
  address: subAddressSchema,
  Telephone: z.string().min(1, "phone cannot be empty"),
  EmailAddress: z.string().email(),
});

// export const financialInfoSchema = z.object({
//   RegisteredCapital: z.string().optional(),
//   RevenuePerYear: z.string().optional(),
//   NetProFitLoss: z.string().optional(),
//   ShareholderEquity: z.string().optional(),
// });

export const corporateInfoSchema = z.object({
  name: z.string().min(1, "name cannot be empty"),
  registrationNo: z.string().min(1, "commercialRegisteredNo cannot be empty"),
  taxID: z.string().min(1, "taxId cannot be empty"),
  dateofincorporation: z.string().transform((str) => {
    const date = new Date(str);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    return date;
  }),
  registered: z.string().optional(),
  primary: z.string().optional(),
  registredBusinessAddress: subAddressSchema,
  placeIncorporateAddress: subAddressSchema,
  registeredCapital: z.coerce.number().optional(),
  revenuePerYear: z.coerce.number().optional(),
  netProFitLoss: z.coerce.number().optional(),
  shareholderEquity: z.coerce.number().optional(),
  placeIncorporateEmail: z.string().email().optional(),
  placeIncorporateTelephone: z.string().optional(),
  registredBusinessEmail: z.string().email().optional(),
  registredBusinessTelephone: z.string().optional(),
});

export const directorInfoSchema = z.object({
  fullNames: fullNamesSchema,
  citizendId: z.string().optional(),
  passportID: z.string().optional(),
  expiryDate: z.string().transform((str) => {
    const date = new Date(str);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    return date;
  }),
  nationality: z.string().min(1, "nationality cannot be empty"),
  position: z.string().min(1, "position cannot be empty"),
  addresses: z.array(subAddressSchema)
});

export const registeredCountryPrimaryCountryOperationSchema = z.object({
  Registered: z.string().min(1, "registeredCountry cannot be empty"),
  Primary: z.string().min(1, "primaryCountryOfOperation cannot be empty"),
});

export const contactPersonSchema = z.object({
  firstName: z.string().min(1, "name cannot be empty"),
  lastName: z.string().min(1, "lastname cannot be empty"),
  Position: z.string().min(1, "position cannot be empty"),
  Division: z.string().min(1, "division cannot be empty"),
  Telephone: z.string().min(1, "telephone cannot be empty"),
  Email: z.string().email(),
});

export type TContactPersonSchema = z.infer<typeof contactPersonSchema>;
export type TCorporateInfoSchema = z.infer<typeof corporateInfoSchema>;
export type TDirectorInfoSchema = z.infer<typeof directorInfoSchema>;
export type TAddressSchema = z.infer<typeof addressSchema>;
export type TSubAddressSchema = z.infer<typeof subAddressSchema>;
//export type TFinancailInfoSchema = z.infer<typeof financialInfoSchema>;

export const corporateTypeAndIncomeSchema = z.object({
  juristicType: z.string().min(1, "juristicType cannot be empty"),
  juristicThai: z.string().optional(),
  juristicForeign: z.string().optional(),
  juristicOthers: z.string().optional(),
  businessType: z.string().min(1, "businessType cannot be empty"),
  sourceOfIncome: z
    .array(z.string().min(1, "sourceOfIncome cannot be empty"))
    .min(1),
  countrySourceOfIncome: z
    .string()
    .min(1, "countrySourceOfIncome cannot be empty"),
  InvestmentObject: z.string().min(1, "investmentObjective cannot be empty"),
});

export type TCorporateTypeAndIncomeSchema = z.infer<
  typeof corporateTypeAndIncomeSchema
>;

export const individualsShareholdersSchema = z.object({
  fullNames: fullNamesSchema,
  citizendId: z.string().optional(),
  passportID: z.string().optional(),
  expiredDate: z
    .string()
    .min(1, { message: "expiration date cannot be empty" }),
  nationality: z.string().min(1, { message: "Nationality cannot be empty" }),
  Types: z.string().optional(),
  sharePercentage: z
    .string()
    .min(1, { message: "Shares cannot be empty" })
    .refine(
      (value) => {
        return /^\d+$/.test(value);
      },
      {
        message: "Shares must be number",
      }
    ),
});

export type TIndividualsShareholdersSchema = z.infer<
  typeof individualsShareholdersSchema
>;

export const bankSchema = z.object({
  bankName: z.string().min(1, "bankName cannot be empty"),
  accountLocation: z.string().min(1, "bankBranch cannot be empty"),
  accountNo: z
    .string()
    .min(1, "bankAccount cannot be empty")
    .refine(
      (value) => {
        return /^\d+$/.test(value);
      },
      {
        message: "bankAccount must be number",
      }
    ),
  accountType: z.string().min(1, "accountType cannot be empty"),
  swiftCode: z.string().min(1, "swiftCode cannot be empty"),
});

export type TBankSchema = z.infer<typeof bankSchema>;

export const authorizedPersonSchema = z.object({
  fullNames: fullNamesSchema,
  citizendId: z.string().optional(),
  nationality: z.string().min(1, { message: "Nationality cannot be empty" }),
  passportID: z.string().optional(),
  expiryDate: z.string().transform((str) => {
    const date = new Date(str);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    return date;
  }),
  addresses: z.array(subAddressSchema),
  position: z.string().min(1, "position cannot be empty"),
});

export type TAuthorizedPersonSchema = z.infer<typeof authorizedPersonSchema>;

export const individualsContactPersonSchema = z.object({
  fullNames: fullNamesSchema,
  position: z.string().min(1, { message: "Position cannot be empty" }),
  division: z.string().min(1, { message: "Division cannot be empty" }),
  telephone: z.string().min(1, { message: "Phone cannot be empty" }),
  email: z.string().email(),
});

export type TIndividualsContactPersonSchema = z.infer<
  typeof individualsContactPersonSchema
>;

export const individualsDirectorSchema = z.object({
  fullNames: fullNamesSchema,
  citizendId: z.string().optional(),
  passportID: z.string().optional(),
  expiryDate: z.string().transform((str) => {
    const date = new Date(str);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    return date;
  }),
  nationality: z.string().min(1, { message: "Natioonality cannot be empty" }),
  position: z.string().min(1, { message: "Position cannot be empty" }),
  addresses: z.array(subAddressSchema),

});

export type TIndividualsDirectorSchema = z.infer<
  typeof individualsDirectorSchema
>;

export const individualsJuristicShareholdersSchema = z.object({
  juristicName: z.string().min(1, { message: "Name cannot be empty" }),
  registrationNo: z
    .string()
    .min(1, { message: "Register Number cannot be empty" }),
  registeredCountry: z
    .string()
    .min(1, { message: "Register Country cannot be empty" }),
  sharePercentage: z
    .string()
    .min(1, { message: "Shares cannot be empty" })
    .refine(
      (value) => {
        return /^\d+$/.test(value);
      },
      {
        message: "Shares must be number",
      }
    ),
});

export type TIndividualsJuristicShareholdersSchema = z.infer<
  typeof individualsJuristicShareholdersSchema
>;

const corporateTypeSchema = z.object({
  "11": z.coerce.number().min(1),
  "12": z.coerce.number().min(1),
  "13": z.coerce.number().min(1),
  "21": z.coerce.number().min(1),
  "22": z.coerce.number().min(1),
  "23": z.coerce.number().min(1),
  "31": z.coerce.number().min(1),
  "32": z.coerce.number().min(1),
  "33": z.coerce.number().min(1),
  "34": z.coerce.number().min(1),
});

const businessTypeSchema = z.object({
  "11": z.coerce.number().min(1),
  "12": z.coerce.number().min(1),
  "13": z.coerce.number().min(1),
  "14": z.coerce.number().min(1),
  "15": z.coerce.number().min(1),
  "16": z.coerce.number().min(1),
  "17": z.coerce.number().min(1),
  "18": z.coerce.number().min(1),
  "19": z.coerce.number().min(1),
  "20": z.coerce.number().min(1),
  "21": z.coerce.number().min(1),
  "22": z.coerce.number().min(1),
  "23": z.coerce.number().min(1),
  "24": z.coerce.number().min(1),
  "25": z.coerce.number().min(1),
  "26": z.coerce.number().min(1),
  "27": z.coerce.number().min(1),
});

const sourceOfIncomeSchema = z.object({
  "11": z.coerce.number().min(1),
  "12": z.coerce.number().min(1),
  "13": z.coerce.number().min(1),
  "14": z.coerce.number().min(1),
  "15": z.coerce.number().min(1),
  "16": z.coerce.number().min(1),
});

const countrySourceOfIncomeSchema = z.object({
  "11": z.coerce.number().min(1),
  "12": z.coerce.number().min(1),
});

const investmentObjectiveSchema = z.object({
  "11": z.coerce.number().min(1),
  "12": z.coerce.number().min(1),
  "13": z.coerce.number().min(1),
  "14": z.coerce.number().min(1),
});

const juristAllTypeSchema = z.object({
  corpprateType: corporateTypeSchema,
  businessType: businessTypeSchema,
  businessTypeOther: z.string().min(1),
  sourceOfIncome: sourceOfIncomeSchema,
  sourceOfIncomeOther: z.string().min(1),
  countrySourceOfIncome: countrySourceOfIncomeSchema,
  countrySourceOfIncomeOther: z.string().min(1),
  investmentObjective: investmentObjectiveSchema,
  investmentObjectiveOther: z.string().min(1),
});
export type TJuristAllTypeSchema = z.infer<typeof juristAllTypeSchema>;

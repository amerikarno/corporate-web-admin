import { checkFormatIDCard } from "@/lib/utils";
import { z } from "zod";

export const subAddressSchema = z.object({
  AddressNo: z.string().min(1, "addressNo cannot be empty"),
  Building: z.string().optional(),
  MooNo: z.string().optional(),
  Soi: z.string().optional(),
  Road: z.string().optional(),
  Tambon: z.string().min(1, "subDistrict cannot be empty"),
  Amphoe: z.string().min(1, "district cannot be empty"),
  Province: z.string().min(1, "province cannot be empty"),
  PostalCode: z.string().min(1, "postalCode cannot be empty"),
  Country: z.string().min(1, "Country cannot be empty"),
  Floor: z.string().optional(),
});

export const fullNamesSchema = z.object({
  title: z.string().min(1, "title cannot be empty"),
  firstName: z.string().min(1, "firstname cannot be empty"),
  lastName: z.string().min(1, "lastname cannot be empty"),
})

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
  Name: z.string().min(1, "name cannot be empty"),
  RegistrationNo: z
    .string()
    .min(1, "commercialRegisteredNo cannot be empty"),
  TaxID: z.string().min(1, "taxId cannot be empty"),
  dateofincorporation: z.string().min(1, "dateIncorporation cannot be empty"),
  Registered: z
  .string().optional(),
  Primary: z
  .string().optional(),
  RegistredBusinessAddress: subAddressSchema,
  PlaceIncorporateAddress: subAddressSchema,
  RegisteredCapital: z.string().optional(),
  RevenuePerYear: z.string().optional(),
  NetProFitLoss: z.string().optional(),
  ShareholderEquity: z.string().optional(),
  placeIncorporateEmail:z.string().email(),
  placeIncorporateTelephone:z.string().optional(),
  RegistredBusinessEmail:z.string().optional(),
  RegistredBusinessTelephone:z.string().optional(),
});

export const directorInfoSchema = z.object({
  fullNames: fullNamesSchema,
  idCard: z.string().optional(),
  passportID: z.string().optional(),
  expiredDate: z.string().min(1, "date cannot be empty"),
  nationality: z.string().min(1, "nationality cannot be empty"),
  position: z.string().min(1, "position cannot be empty"),
  addresses: subAddressSchema,
})

export const registeredCountryPrimaryCountryOperationSchema = z.object({
  Registered: z
  .string()
  .min(1, "registeredCountry cannot be empty"),
  Primary: z
  .string()
  .min(1, "primaryCountryOfOperation cannot be empty"),
})

export const contactPersonSchema = z.object({
  firstName: z.string().min(1, "name cannot be empty"),
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
    .nonempty(),
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
  idCard: z.string().optional(),
  passportID: z.string().optional(),
  expiredDate: z
    .string()
    .min(1, { message: "expiration date cannot be empty" }),
  nationality: z.string().min(1, { message: "Nationality cannot be empty" }),
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
  idCard: z.string().optional(),
  nationality: z.string().min(1, { message: "Nationality cannot be empty" }),
  passportID: z.string().optional(),
  expiredDate: z.string().min(1, "date cannot be empty"),
  addresses: subAddressSchema,
  position:z.string().min(1, "position cannot be empty"),
});

export type TAuthorizedPersonSchema = z.infer<typeof authorizedPersonSchema>;


export const individualsContactPersonSchema = z.object({
  fullNames: fullNamesSchema,
  Position: z.string().min(1, { message: "Position cannot be empty" }),
  Division: z.string().min(1, { message: "Division cannot be empty" }),
  Telephone: z.string().min(1, { message: "Phone cannot be empty" }),
  Email: z.string().email(),
});

export type TIndividualsContactPersonSchema = z.infer<
  typeof individualsContactPersonSchema
>;

export const individualsDirectorSchema = z.object({
  fullNames: fullNamesSchema,
  idCard: z.string().optional(),
  passportID: z.string().optional(),
  expiredDate: z
    .string()
    .min(1, { message: "Expired Date cannot be empty" }),
  nationality: z
    .string()
    .min(1, { message: "Natioonality cannot be empty" }),
  position: z
    .string()
    .min(1, { message: "Position cannot be empty" }),
  addresses: subAddressSchema,
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

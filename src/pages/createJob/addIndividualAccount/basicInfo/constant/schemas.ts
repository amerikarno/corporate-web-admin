import { z } from "zod";



export const basicInfoSchema = z.object({
    registeredAddress: z.object({
      homeNumber: z.string(),
      villageNumber: z.string(),
      villageName: z.string(),
      subStreetName: z.string(),
      streetName: z.string(),
      subDistrictName: z.string(),
      districtName: z.string(),
      provinceName: z.string(),
      zipCode: z.string(),
      countryName: z.string(),
    }),
    currentAddress : z.object({
        homeNumber: z.string(),
        villageNumber: z.string(),
        villageName: z.string(),
        subStreetName: z.string(),
        streetName: z.string(),
        subDistrictName: z.string(),
        districtName: z.string(),
        provinceName: z.string(),
        zipCode: z.string(),
        countryName: z.string(),
    }),
    officeAddress : z.object({
        homeNumber: z.string(),
        villageNumber: z.string(),
        villageName: z.string(),
        subStreetName: z.string(),
        streetName: z.string(),
        subDistrictName: z.string(),
        districtName: z.string(),
        provinceName: z.string(),
        zipCode: z.string(),
        countryName: z.string(),
    }),
    occupation : z.object({
        education: z.string(),
        sourceOfIncome: z.string(),
        currentOccupation: z.string(),
        officeName: z.string(),
        typeOfBusiness: z.string(),
        positionName: z.string(),
        salaryRange: z.string(),
    }),
    firstBankAccount : z.object({
        bankName: z.string(),
        bankBranchName: z.string(),
        bankAccountNumber: z.string(),
        isDefault: z.boolean(),
    }),
    secondBankAccountBody : z.object({
        bankName: z.string(),
        bankBranchName: z.string(),
        bankAccountNumber: z.string(),
        isDefault: z.boolean(),
    }),
    investment : z.object({
        shortTermInvestment: z.boolean(),
        longTermInvestment: z.boolean(),
        taxesInvestment: z.boolean(),
        retireInvestment: z.boolean(),
    }),
    });


export type TBasicInfo = z.infer<typeof basicInfoSchema>;

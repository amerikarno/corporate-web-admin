import { TJuristicType } from "@/pages/corporate/constants/types";

export type TMappingAddress = {
  [key: string]: string;
};

export const mappingAddress: TMappingAddress = {
  addressNo: "Address No.",
  building: "Building",
  moo: "Moo",
  soi: "Soi",
  road: "Road",
  subDistrict: "Sub District",
  district: "District",
  province: "Province",
  postalCode: "Postal Code",
  country: "Country",
  phone: "Phone",
  email: "Email",
};

export const juristicTypeObject: TJuristicType[] = [
  {
    main: { id: "11", name: "Juristic (Thailand)", value: 0 },
    sub: [
      { id: "12", name: "Tax Exempt On Dividend And Capital Gain", value: 0 },
      { id: "13", name: "Non-Tax Exempt", value: 0 },
    ],
  },
  {
    main: { id: "21", name: "Juristic (Foreign)", value: 0 },
    sub: [
      { id: "22", name: "Operating In Thailand", value: 0 },
      { id: "23", name: "Non-Operating in Thailand", value: 0 },
    ],
  },
  {
    main: { id: "31", name: "Others", value: 0 },
    sub: [
      { id: "32", name: "Partnership (Thailand)", value: 0 },
      {
        id: "33",
        name: "Government Organization / State Enterprise",
        value: 0,
      },
      {
        id: "34",
        name: "Co-operative / Foundation / Association / Club / Temple / Mosque / Shrine",
        value: 0,
      },
      { id: "35", name: "Tax Exempt Company", value: 0 },
    ],
  },
];

export const juristicTypeKey = [
  "isJuristicThailLand",
  "isJuristicForeign",
  "isOther",
];

export const juristicType = [
  "Juristic (Thailand)",
  "Juristic (Foreign)",
  "Others",
];

export const juristicThaiKey = ["isTaxExempt", "isNonTaxExempt"];
export const juristicThai = [
  "Tax Exempt On Dividend And Capital Gain",
  "Non-Tax Exempt",
];
export const juristicForeignKey = [
  "isOperatingInThailand",
  "isNonOperatingInThailand",
];
export const juristicForeign = [
  "Operating In Thailand",
  "Non-Operating in Thailand",
];

export const juristicOthersKey = [
  "isPartnership",
  "isGovernmentStateEnterprise",
  "isCoOperative",
  "isTaxExemptCompany",
];
export const juristicOthers = [
  "Partnership (Thailand)",
  "Government Organization / State Enterprise",
  "Co-operative / Foundation / Association / Club / Temple / Mosque / Shrine",
  "Tax Exempt Company",
];

export const businessTypeKey = [
  "isAntiqueTrading",
  "isHotelRestaurant",
  "isArmament",
  "isInsuranceAssurance",
  "isCasinoGambling",
  "isJewelryGoldTrading",
  "isFoundation",
  "isPropertyRealEstate",
  "isMoneyTransfer",
  "isEmploymentAgency",
  "isEntertainment",
  "isTravel",
  "isFinancial",
  "isEducationCenter",
  "isForeignCurrencyExchange",
  "isCryptoRelated",
  "isOtherBusiness",
];
export const businessType = [
  "Antique Trading",
  "Hotel / Resturant",
  "Armamnet",
  "Insurance / Assurance",
  "Casino / Gambling",
  "Jewelry / Gold Trading",
  "Co-operative / Foundation / Association / Club / Temple / Mosque / Shrine",
  "Property / Real Estae",
  "Domestic / International Money Transfer",
  "Foreign Worker Employment Agency",
  "Entertainment Business",
  "Travel Industry / Travel Agency",
  "Financial Service / Banking",
  "University / School / Education Center",
  "Foreign Currency Exchange",
  "Cryto Relate Industry (Exchange, Reseller, ATM, Mining, ICO)",
  "Others (Please Specify)",
];

export const sourceOfIncomeKey = [
  "isRevenue",
  "isStock",
  "isDonation",
  "isLoan",
  "isRevenueSelling",
  "isOtherIncome",
];
export const sourceOfIncome = [
  "Revenue From Business",
  "Stock",
  "Donation",
  "Loan",
  "Revenue From Selling Property",
  "Others (Please Specify)",
];

export const countrySourceOfIncomeKey = ["isThailand", "isOtherThailand"];
export const countrySourceOfIncome = [
  "Thailand",
  "Others Countries (Please Specify)",
];

export const investmentObjectiveKey = [
  "isLiquidation",
  "isInvestment",
  "isCashManagement",
  "isOtherInvestMent",
];
export const investmentObjective = [
  "Liquidity Management",
  "Invsetment",
  "Cash Management For Investment",
  "Others (Please Specify)",
];

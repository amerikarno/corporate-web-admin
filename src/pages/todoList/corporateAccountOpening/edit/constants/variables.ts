// import { TJuristicType } from "@/pages/corporate/constants/types";
// import { Label } from "recharts";

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

export const registeredCountryKey = ["isThailand", "isOtherThailand"];
export const registeredCountryChoices = [
  "Thailand",
  "Others Countries (Please Specify)",
];

export const PrimaryCountryOfOperationKey = ["isThailand", "isOtherThailand"];
export const PrimaryCountryOfOperationChoices = [
  "Thailand",
  "Others Countries (Please Specify)",
];

// export const juristicTypeObject: TJuristicType[] = [
//   {
//     main: { id: "11", name: "Juristic (Thailand)", value: 0 },
//     sub: [
//       { id: "12", name: "Tax Exempt On Dividend And Capital Gain", value: 0 },
//       { id: "13", name: "Non-Tax Exempt", value: 0 },
//     ],
//   },
//   {
//     main: { id: "21", name: "Juristic (Foreign)", value: 0 },
//     sub: [
//       { id: "22", name: "Operating In Thailand", value: 0 },
//       { id: "23", name: "Non-Operating in Thailand", value: 0 },
//     ],
//   },
//   {
//     main: { id: "31", name: "Others", value: 0 },
//     sub: [
//       { id: "32", name: "Partnership (Thailand)", value: 0 },
//       {
//         id: "33",
//         name: "Government Organization / State Enterprise",
//         value: 0,
//       },
//       {
//         id: "34",
//         name: "Co-operative / Foundation / Association / Club / Temple / Mosque / Shrine",
//         value: 0,
//       },
//       { id: "35", name: "Tax Exempt Company", value: 0 },
//     ],
//   },
// ];

export const juristicTypeKey = [
  "isJuristicThailand",
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
  "isOtherInvestment",
];

export const investmentObjective = [
  "Liquidity Management",
  "Invsetment",
  "Cash Management For Investment",
  "Others (Please Specify)",
];

export const mapScore = {
  1: "Low",
  2: "Moderate to Low",
  3: "Moderate to High",
  4: "High",
  5: "Very High",
};

// export const investmentObjective: obj[] = [
//   { label: "Liquidity Management", key: "isLiquidation", value: false },
//   { label: "Invsetment", key: "isInvestment", value: false },
//   {
//     label: "Cash Management For Investment",
//     key: "isCashManagement",
//     value: false,
//   },
//   { label: "Others (Please Specify)", key: "isOtherInvestment", value: false },
// ];

type obj = {
  label: string;
  key: string;
};

export const mapKeyLabel: obj[] = [
  { label: "Juristic (Thailand)", key: "isJuristicThailand" },
  { label: "Tax Exempt On Dividend And Capital Gain", key: "isTaxExempt" },
  { label: "Non-Tax Exempt", key: "isNonTaxExempt" },

  { label: "Juristic (Foreign)", key: "isJuristicForeign" },
  { label: "Operating In Thailand", key: "isOperatingInThailand" },
  { label: "Non Operating In Thailand", key: "isNonOperatingInThailand" },

  { label: "Others", key: "isOther" },
  { label: "Partnership (Thailand)", key: "isPartnership" },
  {
    label: "Government Organization / State Enterprise",
    key: "isGovernmentStateEnterprise",
  },
  {
    label:
      "Co-operative / Foundation / Association / Club / Temple / Mosque / Shrine",
    key: "isCoOperative",
  },
  { label: "Tax Exempt Company", key: "isTaxExemptCompany" },

  // business type
  { label: "Antique Trading", key: "isAntiqueTrading" },
  { label: "Hotel / Resturant", key: "isHotelRestaurant" },
  { label: "Armamnet", key: "isArmament" },
  { label: "Insurance / Assurance", key: "isInsuranceAssurance" },
  { label: "Casino / Gambling", key: "isCasinoGambling" },
  { label: "Jewelry / Gold Trading", key: "isJewelryGoldTrading" },
  {
    label:
      "Co-operative / Foundation / Association / Club / Temple / Mosque / Shrine",
    key: "isFoundation",
  },
  { label: "Property / Real Estate", key: "isPropertyRealEstate" },
  { label: "Domestic / International Money Transfer", key: "isMoneyTransfer" },
  { label: "Foreign Worker Employment Agency", key: "isEmploymentAgency" },
  { label: "Entertainment Business", key: "isEntertainment" },
  { label: "Travel Industry / Travel Agency", key: "isTravel" },
  { label: "Financial Service / Banking", key: "isFinancial" },
  { label: "University / School / Education Center", key: "isEducationCenter" },
  { label: "Foreign Currency Exchange", key: "isForeignCurrencyExchange" },
  {
    label: "Crypto Related Industry (Exchange, Reseller, ATM, Mining, ICO)",
    key: "isCryptoRelated",
  },
  { label: "Others (Please Specify)", key: "isOtherBusiness" },

  //source of income
  { label: "Revenue From Business", key: "isRevenue" },
  { label: "Stock", key: "isStock" },
  { label: "Donation", key: "isDonation" },
  { label: "Loan", key: "isLoan" },
  { label: "Revenue From Selling Property", key: "isRevenueSelling" },
  { label: "Others (Please Specify)", key: "isOtherIncome" },

  // country
  { label: "Thailand", key: "isThailand" },
  { label: "Others Countries (Please Specify)", key: "isOtherThailand" },

  // investment objective
  { label: "Liquidity Management", key: "isLiquidation" },
  { label: "Investment", key: "isInvestment" },
  { label: "Cash Management For Investment", key: "isCashManagement" },
  { label: "Others (Please Specify)", key: "isOtherInvestment" },
];
export type TMapKeyLabel = {
  [key: string]: string;
};
export const mapKeys: TMapKeyLabel = {
  isJuristicThailand: "Juristic (Thailand)",
  isJuristicForeign: "Juristic (Foreign)",
  isOther: "Others",
  isAntiqueTrading: "Antique Trading",
  isHotelRestaurant: "Hotel / Resturant",
  isArmament: "Armamnet",
  isInsuranceAssurance: "Insurance / Assurance",
  isCasinoGambling: "Casino / Gambling",
  isJewelryGoldTrading: "Jewelry / Gold Trading",
  isFoundation:
    "Co-operative / Foundation / Association / Club / Temple / Mosque / Shrine",
  isPropertyRealEstate: "Property / Real Estate",
  isMoneyTransfer: "Domestic / International Money Transfer",
  isEmploymentAgency: "Foreign Worker Employment Agency",
  isEntertainment: "Entertainment Business",
  isTravel: "Travel Industry / Travel Agency",
  isFinancial: "Financial Service / Banking",
  isEducationCenter: "University / School / Education Center",
  isForeignCurrencyExchange: "Foreign Currency Exchange",
  isCryptoRelated:
    "Crypto Related Industry (Exchange, Reseller, ATM, Mining, ICO)",
  isOtherBusiness: "Others (Please Specify)",
  isRevenue: "Revenue From Business",
  isStock: "Stock",
  isDonation: "Donation",
  isLoan: "Loan",
  isRevenueSelling: "Revenue From Selling Property",
  isOtherIncome: "Others (Please Specify)",
  isThailand: "Thailand",
  isOtherThailand: "Others Countries (Please Specify)",
  isLiquidation: "Liquidity Management",
  isInvestment: "Invsetment",
  isCashManagement: "Cash Management For Investment",
  isOtherInvestment: "Others (Please Specify)",
};

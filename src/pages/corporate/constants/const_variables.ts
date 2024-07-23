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

export const juristicType = [
  "Juristic (Thailand)",
  "Juristic (Foreign)",
  "Others",
];

export const juristicThaiForeign = [
  "Tax Exempt On Dividend And Capital Gain",
  "Non-Tax Exempt",
];

export const juristicOthers = [
  "Partnership (Thailand)",
  "Government Organization / State Enterprise",
  "Co-operative / Foundation / Association / Club / Temple / Mosque / Shrine",
  "Tax Exempt Company",
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

export const sourceOfIncome = [
  "Revenue From Business",
  "Stock",
  "Donation",
  "Loan",
  "Revenue From Selling Property",
  "Others (Please Specify)",
];

export const countrySourceOfIncome = [
  "Thailand",
  "Others Countries (Please Specify)",
];

export const investmentObjective = [
  "Liquidity Management",
  "Invsetment",
  "Cash Management For Investment",
  "Others (Please Specify)",
];

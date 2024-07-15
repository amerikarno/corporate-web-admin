import { TCorporateTypeAndIncome } from "./types";

export const initCorporateInfo = {
  name: "",
  commercialRegisteredNo: "",
  taxId: "",
  dateIncorporation: "",
  corporateCountry: [],
  address: [],
};

export const initAddress = {
  addressNo: "",
  building: "",
  moo: "",
  soi: "",
  road: "",
  subDistrict: "",
  district: "",
  province: "",
  postalCode: "",
  country: "",
  phone: "",
  type: 0,
};

export const emptyCorporateTypeAndIncome: TCorporateTypeAndIncome = {
  juristicType: "",
  businessType: "",
  sourceOfIncome: [],
  countrySourceOfIncome: "",
  investmentObjective: "",
};

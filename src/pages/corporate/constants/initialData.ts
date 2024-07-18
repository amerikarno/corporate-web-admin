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

export const individualShareholder = {
  title: "",
  firstName: "",
  lastName: "",
  idCard: "",
  expiredDate: "",
  nationality: "",
  shares: "",
};

export const individualContact = {
  contactname: "",
  contactposition: "",
  contactdivision: "",
  contactphone: "",
  contactemail: ""
}

export const individualDirector = {
  directorname: "",
  directoridcard: "",
  directorexpireddate: "", 
  directornationality: "",
  directoraddress: [],
}

export const individualJuristicShareholders = {
  juristicName : "",
  juristicRegisNo : "",
  juristicRegisCountry : "",
  juristicShares : "",
}

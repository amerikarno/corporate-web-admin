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
  passPort: "",
  expiredDate: "",
  nationality: "",
  shares: "",
};

export const individualContact = {
  contacttitle:"",
  contactname: "",
  contactsurname: "",
  contactposition: "",
  contactdivision: "",
  contactphone: "",
  contactemail: ""
}

// export const individualDirector = {
//   directortitle:"",
//   directorname: "",
//   directorsurname: "",
//   directoridcard: "",
//   directorpassport: "",
//   directorexpireddate: "", 
//   directornationality: "",
//   directoraddress:[],
// }

export const individualJuristicShareholders = {
  juristicName : "",
  juristicRegisNo : "",
  juristicRegisCountry : "",
  juristicShares : "",
}

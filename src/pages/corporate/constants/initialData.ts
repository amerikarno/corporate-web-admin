import {
  TCorporateTypeAndIncome,
  TInitailJuristicTypeAndIncome,
  TRegisteredCountryPrimaryCountryOperation,
} from "./types";

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

export const emptyRegisteredCountryPrimaryCountryOperation: TRegisteredCountryPrimaryCountryOperation =
  {
    registeredCountry: "",
    primaryCountryOfOperation: "",
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
  contacttitle: "",
  contactname: "",
  contactsurname: "",
  contactposition: "",
  contactdivision: "",
  contactphone: "",
  contactemail: "",
};

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
  juristicName: "",
  juristicRegisNo: "",
  juristicRegisCountry: "",
  juristicShares: "",
};

export const initailJuristicOther = {
  otherBusinessType: "",
  otherIncome: "",
  otherCountry: "",
  otherInvestMent: "",
};

export const initailJuristicTypeAndIncome: TInitailJuristicTypeAndIncome = {
  isJuristicThailLand: false,
  isTaxExempt: false,
  isNonTaxExempt: false,
  isJuristicForeign: false,
  isOperatingInThailand: false,
  isNonOperatingInThailand: false,
  isOther: false,
  isPartnership: false,
  isGovernmentStateEnterprise: false,
  isTaxExemptCompany: false,
  isAntiqueTrading: false,
  isHotelRestaurant: false,
  isArmament: false,
  isInsuranceAssurance: false,
  isCasinoGambling: false,
  isJewelryGoldTrading: false,
  isFoundation: false,
  isPropertyRealEstate: false,
  isMoneyTransfer: false,
  isEmploymentAgency: false,
  isEntertainment: false,
  isTravel: false,
  isFinancial: false,
  isEducationCenter: false,
  isForeignCurrencyExchange: false,
  isCryptoRelated: false,
  isOtherBusiness: false,
  // OtherBusinessType: "",
  isRevenue: false,
  isStock: false,
  isDonation: false,
  isLoan: false,
  isRevenueSelling: false,
  isOtherIncome: false,
  // OtherIncome: "",
  isThailand: false,
  isOtherThailand: false,
  // OtherCountry: "",
  // InvestmentObject: "",
  isLiquidation: false,
  isInvestment: false,
  isCashManagement: false,
  isOtherInvestMent: false,
  // OtherInvestMent: "",
};

import {
  TCorporateTypeAndIncome,
  TInitailJuristicTypeAndIncome,
  TRegisteredCountryPrimaryCountryOperation,
} from "./types";

export const initCorporateInfo = {
  Name: "",
  RegistrationNo: "",
  TaxID: "",
  dateofincorporation: "",
  corporateCountry: [],
  address: [],
};

export const initAddress = {
  AddressNo: "",
  Building: "",
  MooNo: "",
  Soi: "",
  Road: "",
  Tambon: "",
  Amphoe: "",
  Province: "",
  PostalCode: "",
  Country: "",
  type: 0,
};

export const emptyRegisteredCountryPrimaryCountryOperation: TRegisteredCountryPrimaryCountryOperation =
  {
    registered: "",
    primary: "",
    registeredThailand:false,
    primaryCountry:false,
    registeredOther:false,
    primaryOther:false,
  };

export const emptyCorporateTypeAndIncome: TCorporateTypeAndIncome = {
  juristicType: "",
  businessType: "",
  sourceOfIncome: [],
  countrySourceOfIncome: "",
  InvestmentObject: "",
};

export const individualShareholder = {
  fullNames:[{
    title: "",
    firstName: "",
    lastName: ""
  }],
  idCard: "",
  passportID: "",
  expiredDate: "",
  nationality: "",
  sharePercentage: "",
};

export const individualContact = {
  contacttitle: "",
  FirstName: "",
  LastName: "",
  Position: "",
  Division: "",
  Telephone: "",
  Email: "",
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
  registrationNo: "",
  registeredCountry: "",
  sharePercentage: "",
};

export const initailJuristicOther = {
  OtherBusinessType: "",
  OtherIncome: "",
  OtherCountry: "",
  OtherInvestMent: "",
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
  TaxExemptCompany: false,
  AntiqueTrading: false,
  HotelRestaurant: false,
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
  Revenue: false,
  isStock: false,
  isDonation: false,
  isLoan: false,
  isRevenueSelling: false,
  isOtherIncome: false, //ไม่เจอ key นี้ใน postman
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

export type TAddress = {
  addressNo: string;
  building?: string;
  moo?: string;
  soi?: string;
  road?: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  type?: number;
};

export type TFinancialInfo = {
  registeredCapital?: string;
  revenuePerYear?: string;
  netProfit?: string;
  shareholderEquity?: string;
};

export type TCorporateInfo = {
  name: string;
  commercialRegisteredNo: string;
  taxId: string;
  dateIncorporation: string;
  registeredCountry: string;
  primaryCountryOfOperation: string;
  registeredAddress: TAddress;
  incorporatedAddress: TAddress;
  financial?: TFinancialInfo;
};

export type TCorporateTypeAndIncome = {
  juristicType: string;
  juristicThai?: string;
  juristicForeign?: string;
  juristicOthers?: string;
  businessType: string;
  sourceOfIncome: string[];
  countrySourceOfIncome: string;
  investmentObjective: string;
};

export type TRegisteredCountryPrimaryCountryOperation = {
  registeredCountry: string;
  primaryCountryOfOperation: string;
};

export type TIndividualsShareholders = {
  title: string;
  firstName: string;
  lastName: string;
  idCard: string;
  passPort: string;
  expiredDate: string;
  nationality: string;
  shares: string;
};

export type TBank = {
  accountType: string;
  bankName: string;
  accountNo: string;
  accountLocation: string;
  swiftCode: string;
};

export type TAuthorizePerson = {
  title: string;
  firstName: string;
  lastName: string;
  idCard: string;
  passPort: string;
  expiredDate: string;
  nationality: string;
  address: TAddress;
};
export type TContactPerson = {
  contacttitle: string;
  contactname: string;
  contactsurname: string;
  contactposition: string;
  contactdivision: string;
  contactphone: string;
  contactemail: string;
};

export type TDirector = {
  directortitle: string;
  directorname: string;
  directorsurname: string;
  directoridcard: string;
  directorpassport: string;
  directorexpireddate: string;
  directornationality: string;
  directoraddress: TAddress;
};

export type TJuristicsShareholders = {
  juristicName: string;
  juristicRegisNo: string;
  juristicRegisCountry: string;
  juristicShares: string;
};

export type TInitailJuristicTypeAndIncome = {
  [key: string]: boolean;
};
export type TInitailJuristicOther = {
  [key: string]: string;
};

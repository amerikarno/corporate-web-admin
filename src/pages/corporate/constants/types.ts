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
  operateCountry: string;
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

export type TIndividualsShareholders = {
  title: string;
  firstName: string;
  lastName: string;
  idCard: string;
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
  expiredDate: string;
  nationality: string;
  address: TAddress;
};
export type TContactPerson = {
  contactname: string;
  contactposition: string;
  contactdivision: string;
  contactphone: string;
  contactemail: string;
};

export type TDirector = {
  directorname: string;
  directoridcard: string;
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

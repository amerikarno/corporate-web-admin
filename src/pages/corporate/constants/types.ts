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

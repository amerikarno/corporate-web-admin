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

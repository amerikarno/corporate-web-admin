export type TAddress = {
  addressNo: string;
  building: string;
  moo: string;
  soi: string;
  road: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
  type: number;
};

export type TFinancailInfo = {
  registeredCapital: string;
  revenuePerYear: string;
  netProfit: string;
  shareholderEquity: string;
};

export type TCorporateInfo = {
  name: string;
  commercialRegisteredNo: string;
  taxId: string;
  dateIncorporation: string;
  registeredCountry: string;
  operateCountry: string;
  registeredAddress: string;
  incorporatedAddress: string;
  // registeredAddress: TAddress;
  // incorporatedAddress: TAddress;
  financial?: TFinancailInfo;
};

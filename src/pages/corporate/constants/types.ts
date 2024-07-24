export type TAddress = {
  address: TSubAddress;
  Telephone: string;
  EmailAddress: string;
  type?: number;
  //ขาด Country , Floor
};

export type TFullName = {
  title:string;
  firstName:string;
  lastName:string;
}

export type TSubAddress = {
  AddressNo: string;
  Building?: string;
  MooNo?: string;
  Soi?: string;
  Road?: string;
  Tambon: string;
  Amphoe: string;
  Province: string;
  PostalCode: string;
  Floor?: string;
  Country: string;
  type?: number;
  //ขาด Country , Floor
};

export type TFinancialInfo = {
  RegisteredCapital?: string;
  RevenuePerYear?: string;
  NetProFitLoss?: string;
  ShareholderEquity?: string;
};

export type TCorporateInfo = {
  Name: string;
  RegistrationNo: string;
  TaxID: string;
  dateofincorporation: string;
  RegisteredThailand:boolean;
  PrimaryCountry:boolean;
  Registered: string;
  RegisteredOther?:boolean;
  Primary: string;
  PrimaryOther?:boolean;
  RegistredBusinessAddress: TSubAddress;
  PlaceIncorporateAddress: TSubAddress;
  financial?: TFinancialInfo;
  placeIncorporateEmail:string;
  placeIncorporateTelephone:string;
  RegistredBusinessEmail:string;
  RegistredBusinessTelephone:string;
};

export type TCorporateTypeAndIncome = {
  juristicType: string;
  juristicThai?: string;
  juristicForeign?: string;
  juristicOthers?: string;
  businessType: string;
  sourceOfIncome: string[];
  countrySourceOfIncome: string;
  InvestmentObject: string;
};

export type TRegisteredCountryPrimaryCountryOperation = {
  Registered: string;
  Primary: string;
  RegisteredThailand:boolean;
  PrimaryCountry:boolean;
  RegisteredOther?:boolean;
  PrimaryOther?:boolean;
};

export type TIndividualsShareholders = {
  fullNames: TFullName;
  idCard: string;
  passportID: string;
  expiredDate: string;
  nationality: string;
  sharePercentage: string;
  Types?:string;
};

export type TBank = {
  accountType: string;
  bankName: string;
  accountNo: string;
  accountLocation: string;
  swiftCode: string;
};

export type TAuthorizePerson = {
  fullNames: TFullName;
  idCard?: string;
  passportID?: string;
  expiredDate: string;
  nationality: string;
  addresses: TSubAddress;
  position: string;
  Types?:string;
};
export type TContactPerson = {
  fullNames: TFullName;
  Position: string;
  Division: string;
  Telephone: string;
  Email: string;
};

export type TDirector = {
  fullNames: TFullName;
  idCard?: string;
  passportID?: string;
  expiryDate: string;
  nationality: string;
  position: string;
  addresses: TSubAddress;
  Types?:string;
};

export type TJuristicsShareholders = {
  juristicName: string;
  registrationNo: string;
  registeredCountry: string;
  sharePercentage: string;
};

export type TInitailJuristicTypeAndIncome = {
  [key: string]: boolean;
};
export type TInitailJuristicOther = {
  [key: string]: string;
};

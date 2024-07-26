export type TAddress = {
  address: TSubAddress;
  Telephone: string;
  EmailAddress: string;
  type?: number;
  //ขาด Country , Floor
};

export type TFullName = {
  title: string;
  firstName: string;
  lastName: string;
};

export type TFullNameForCorporateInfo = [{
  title:string;
  firstName:string;
  lastName:string;
}]

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
  //type?: number;
};

export type TFinancialInfo = {
  RegisteredCapital?: number;
  RevenuePerYear?: number;
  NetProFitLoss?: number;
  ShareholderEquity?: number;
};

export type TCorporateInfo = {
  name: string;
  registrationNo: string;
  taxID: string;
  dateofincorporation: Date;
  registeredThailand: boolean;
  primaryCountry: boolean;
  registered: string;
  registeredOther?: boolean;
  primary: string;
  primaryOther?: boolean;
  registredBusinessAddress: TSubAddress;
  placeIncorporateAddress: TSubAddress;
  financial?: TFinancialInfo;
  placeIncorporateEmail?: string;
  placeIncorporateTelephone?: string;
  registredBusinessEmail?: string;
  registredBusinessTelephone?: string;
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
  registered: string;
  primary: string;
  registeredThailand: boolean;
  primaryCountry: boolean;
  registeredOther?: boolean;
  primaryOther?: boolean;
};

export type TIndividualsShareholders = {
  fullNames: TFullName;
  citizendId?: string;
  passportID?: string;
  expiredDate: string;
  nationality: string;
  sharePercentage: string;
  Types?: string;
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
  citizendId?: string;
  passportID?: string;
  expiredDate: string;
  nationality: string;
  addresses: TSubAddress;
  position: string;
  Types?: string;
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
  citizendId?: string;
  passportID?: string;
  expiredDate: string;
  nationality: string;
  position: string;
  addresses: TSubAddress;
  Types?: string;
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

export type TJuristicTypeObject = {
  id: string;
  name: string;
  value: number;
};

export type TObjectJuristicType = {
  id: string;
  name: string;
  value: number;
};

export type TJuristicType = {
  main: TObjectJuristicType;
  sub: TObjectJuristicType[];
};

export type TNumber = {
  [key: string]: number;
};
export type TCorporateType = TNumber;
export type TJuristicBusinessType = TNumber;
export type TJuristicSourceOfIncome = TNumber;
export type TJusristicInvestmentObjective = TNumber;
export type TJuristicTypeAll = {
  corporateCode: string;
  corporateType: TCorporateType;
  businessType: TJuristicBusinessType;
  businessTypeOther: string;
  sourceOfIncome: TJuristicSourceOfIncome;
  sourceOfIncomeOther: string;
  countrySourceOfIncomeThai: boolean;
  countrySourceOfIncomeOther: string;
  investmentObjective: TJusristicInvestmentObjective;
  investmentObjectiveOther: string;
};

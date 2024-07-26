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

export type TFullNameForCorporateInfo = [
  {
    title: string;
    firstName: string;
    lastName: string;
  }
];

export type TSubAddress = {
  addressNo: string;
  mooNo?: string;
  soi?: string;
  road?: string;
  tambon: string;
  amphoe: string;
  province: string;
  postalCode: string;
  country: string;
  //type?: number;
};

export type TFinancialInfo = {
  registeredCapital?: number;
  revenuePerYear?: number;
  netProFitLoss?: number;
  shareholderEquity?: number;
};

export type TCorporateInfo = {
  corporateCode?: string;
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
  // financial?: TFinancialInfo;
  placeIncorporateEmail?: string;
  placeIncorporateTelephone?: string;
  registredBusinessEmail?: string;
  registredBusinessTelephone?: string;
  registeredCapital?: number;
  revenuePerYear?: number;
  netProFitLoss?: number;
  shareholderEquity?: number;
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
  corporateCode?:string;
  fullNames: TFullName[];
  position: string;
  division: string;
  telephone: string;
  email: string;
};

export type TDirector = {
  corporateCode?: string;
  fullNames: TFullName[];
  citizendId?: string;
  passportID?: string;
  expiryDate: Date;
  nationality: string;
  position: string;
  addresses: TSubAddress;
  types?: string;
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

export type TMapPages = {
  [key: number]: JSX.Element;
};

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
  building?: string;
  floor?: string;
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

export type TRegisterBusinessAddress = {
  address: TSubAddress[];
  emailAddress?: string;
  telephone?: string;
};
export type TPlaceIncorporateAddress = {
  address: TSubAddress[];
  emailAddress?: string;
  telephone?: string;
};

export type TCorporateInfo = {
  corporateCode?: string;
  name: string;
  registrationNo: string;
  taxId: string;
  dateofincorporation: string;
  isRegisteredThailand: boolean;
  isPrimaryCountry: boolean;
  registered: string;
  isRegisteredOther?: boolean;
  primary: string;
  isPrimaryOther?: boolean;
  registeredBusiness: TRegisterBusinessAddress;
  placeofIncorporation: TPlaceIncorporateAddress;
  // financial?: TFinancialInfo;
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
  investmentObjective: string;
};

export type TRegisteredCountryPrimaryCountryOperation = {
  registered: string;
  primary: string;
  isRegisteredThailand: boolean;
  isPrimaryCountry: boolean;
  isRegisteredOther?: boolean;
  isPrimaryOther?: boolean;
};

export type TIndividualsShareholders = {
  corporateCode?: string;
  fullNames: TFullName[];
  citizenId?: string;
  passportId?: string;
  expiryDate: string;
  nationality: string;
  sharePercentage: number;
  types?: number;
  personalId?: string;
};

export type TBank = {
  accountType: string;
  bankName: string;
  accountNo: string;
  accountLocation: string;
  swiftCode: string;
};

export type TAuthorizePerson = {
  corporateCode?: string;
  fullNames: TFullName[];
  citizenId?: string;
  passportId?: string;
  expiryDate: string;
  nationality: string;
  addresses: TSubAddress[];
  types?: number;
  personalId?: string;
};
export type TContactPerson = {
  corporateCode?: string;
  fullNames: TFullName[];
  position: string;
  division: string;
  telephone: string;
  email: string;
  personalId?: string;
};

export type TDirector = {
  corporateCode?: string;
  fullNames: TFullName[];
  citizenId?: string;
  passportId?: string;
  expiryDate: string;
  nationality: string;
  addresses: TSubAddress[];
  types?: number;
  personalId?: string;
};

export type TJuristicsShareholders = {
  corporateCode?: string;
  juristicName: string;
  registrationNo: string;
  registeredCountry: string;
  sharePercentage: number;
  juristicId?: string;
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

// export type TBodyFormIndividualsShareholders = {
//   fullNames: TFullName[];
//   corporateCode: string;
//   passportId?: string;
//   citizenId?: string;
//   expiryDate: string;
//   nationality: string;
//   sharePercentage: number;
//   types?: number;
// };

// export type Person = {
//   fullNames: TFullName[];
//   referenceID: string;
//   citizenId?: string;
//   passportId?: string;
//   expiryDate: string;
//   nationality: string;
//   position: string;
//   types: number;
//   addresses: TSubAddress[];
// };

export type TSuitTest = {
  id: string;
  questionNumber: number;
  question: string;
  choices: TSuitChoice[];
  types: string;
};

export type TSuitChoice = {
  id: string;
  questionId: string;
  answer: string;
  score: number;
};
export type TSuitAns = {
  id: string;
  ans: number;
};

export type TKnowledgeTest = {
  id: string;
  version: string;
  items: TKnowladgeQuiz[];
};

export type TKnowladgeQuiz = {
  id: number;
  question: string;
  choice_list: string[];
  ans: number;
  ans_detail: string;
};

export type CorporateTypeBody = {
  isJuristicThailand?: boolean;
  isTaxExempt?: boolean;
  isNonTaxExempt?: boolean;
  isJuristicForeign?: boolean;
  isOperatingInThailand?: boolean;
  isNonOperatingInThailand?: boolean;
  isOther?: boolean;
  isPartnership?: boolean;
  isGovernmentStateEnterprise?: boolean;
  isTaxExemptCompany?: boolean;
  isAntiqueTrading?: boolean;
  isHotelRestaurant?: boolean;
  isArmament?: boolean;
  isInsuranceAssurance?: boolean;
  isCasinoGambling?: boolean;
  isJewelryGoldTrading?: boolean;
  isFoundation?: boolean;
  isPropertyRealEstate?: boolean;
  isMoneyTransfer?: boolean;
  isEmploymentAgency?: boolean;
  isEntertainment?: boolean;
  isTravel?: boolean;
  isFinancial?: boolean;
  isEducationCenter?: boolean;
  isForeignCurrencyExchange?: boolean;
  isCryptoRelated?: boolean;
  isOtherBusiness?: boolean;
  isRevenue?: boolean;
  isStock?: boolean;
  isDonation?: boolean;
  isLoan?: boolean;
  isRevenueSelling?: boolean;
  isOtherIncome?: boolean;
  isThailand?: boolean;
  isOtherThailand?: boolean;
  isLiquidation?: boolean;
  isInvestment?: boolean;
  isCashManagement?: boolean;
  isOtherInvestment?: boolean;
  isCoOperative?: boolean;
  otherBusinessType?: string;
  otherIncome?: string;
  otherCountry?: string;
  otherInvestment?: string;
  corporateCode?: string;
};

export type TErrors = {
  id: number;
  msg: string;
  paths: string[];
};

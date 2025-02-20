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
  addressNo?: string;
  building?: string;
  floor?: string;
  mooNo?: string;
  soi?: string;
  road?: string;
  tambon?: string;
  amphoe?: string;
  province?: string;
  postalCode?: string;
  country?: string;
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
  registerId?: string;
  name: string;
  registrationNo: string;
  taxId: string;
  dateOfIncorporation: string;
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
  registerId?: string;
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

export type TAttorney = {
  registerId?: string;
  fullNames: TFullName[];
  citizenId?: string;
  passportId?: string;
  expiryDate: string;
  nationality: string;
  addresses: TSubAddress[];
  telephone?: string;
  email?: string;
  personalId?: string;
  types?: number;
};

export type TAuthorizePerson = {
  registerId?: string;
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
  registerId?: string;
  fullNames: TFullName[];
  position: string;
  division: string;
  telephone: string;
  email: string;
  personalId?: string;
};

export type TDirector = {
  registerId?: string;
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
  registerId?: string;
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
  registerId: string;
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
//   registerId: string;
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
  quiz: number;
  ans: number | number[];
  type: number;
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
  registerId?: string;
};

export type TErrors = {
  id: number;
  msg: string;
  paths: string[];
};

export type SuitTestResult = {
  CreatedAt?: string;
  DeletedAt?: string | null;
  registerId?: string;
  accountID?: string;
  totalScore?: number;
  level?: number;
  investorTypeRisk?: string;
  suitTestResult?: SuitTestResultAnswer;
  type?: number;
};

export type SuitTestResultAnswer = {
  answer: SuitAnswer[];
  additional: Array<boolean | undefined | null>;
};

export type SuitAnswer = {
  id?: string;
  ans: number[] | number;
  type: number;
  quiz: number;
};

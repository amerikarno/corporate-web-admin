

export type TCorporateAccountOpeningInfo = {
  registerId: string;
  // corporateName: string;
  // taxId: number;
  dateFrom: Date;
  dateTo: Date;
};

export type TRegisteredCountryPrimaryCountryOperation = {
  registered: string;
  primary: string;
  isRegisteredThailand?: boolean;
  isPrimaryCountry?: boolean;
  isRegisteredOther?: boolean | undefined;
  isPrimaryOther?: boolean | undefined;
};

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

export type TContactPerson = {
  registerId?: string;
  fullNames: TFullName[];
  position: string;
  division: string;
  telephone: string;
  email: string;
  personalId?: string;
};

export type TIndividualsShareholders = {
  registerId?: string;
  fullNames: TFullName[];
  citizenId?: string;
  passportId?: string;
  expiryDate: string | null;
  nationality: string;
  sharePercentage: number | null;
  types?: number;
  personalId?: string;
};

export type SuitTestResultAnswer = {
  answer: SuitAnswer[];
  additional: Array<boolean | undefined | null>;
};

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

export type TAuthorizePerson = {
  registerId?: string;
  fullNames: TFullName[];
  citizenId?: string;
  passportId?: string;
  expiryDate: string | null;
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
  sharePercentage: number | null;
  juristicId?: string;
};



export type SuitAnswer = {
  id?: string;
  ans: number[] | number;
  type: number;
  quiz: number;
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
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  registerId: string;
  name: string;
  registrationNo: string;
  taxId: string;
  dateOfIncorporation: string;
};

export type TCorporateCountry = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  registerId: string;
  isThailand?: boolean;
  other: string;
  types: number;
};

export type TCorporateAddress = {
  address: TCorporateSubAddress[];
  emailAddress: string;
  telephone: string;
};

export type TCorporateSubAddress = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  registerId: string;
  addressNo: string;
  mooNo: string;
  building: string;
  floor: string;
  soi: string;
  road: string;
  tambon: string;
  amphoe: string;
  province: string;
  postalCode: string;
  country: string;
  types: number;
};

export type TAttorney = {
  id?: string;
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: string | null;
  personalId?: string;
  registerId?: string;
  fullNames: TFullName[];
  addresses: TAddress[];
  passportId?: string;
  citizenId?: string;
  expiryDate: string | null;
  nationality: string;
  types?: number;
  telephone?: string;
  email?: string;
};

export type TCorporateFinancials = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  registerId: string;
  registeredCapital: number;
  revenuePerYear: number;
  netProfitLoss: number;
  shareholderEquity: number;
};

export type TCorporateTypes = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  registerId: string;
  isJuristicThailand: boolean;
  isTaxExempt: boolean;
  isNonTaxExempt: boolean;
  isJuristicForeign: boolean;
  isOperatingInThailand: boolean;
  isNonOperatingInThailand: boolean;
  isOther: boolean;
  isPartnership: boolean;
  isGovernmentStateEnterprise: boolean;
  isCoOperative: boolean;
  isTaxExemptCompany: boolean;
};

export type TBusinessTypes = {
  createBy?: string;
  CreatedAt: string;
  DeletedAt: string | null;
  id: string;
  registerId: string;
  isAntiqueTrading: boolean;
  isHotelRestaurant: boolean;
  isArmament: boolean;
  isInsuranceAssurance: boolean;
  isCasinoGambling: boolean;
  isJewelryGoldTrading: boolean;
  isFoundation: boolean;
  isPropertyRealEstate: boolean;
  isMoneyTransfer: boolean;
  isEmploymentAgency: boolean;
  isEntertainment: boolean;
  isTravel: boolean;
  isFinancial: boolean;
  isEducationCenter: boolean;
  isForeignCurrencyExchange: boolean;
  isCryptoRelated: boolean;
  isOtherBusiness: boolean;
  otherBusinessType: string;
};

export type TSourceOfIncomes = {
  createBy?: string;
  CreatedAt: string;
  DeletedAt: string | null;
  id: string;
  registerId: string;
  isDonation: boolean;
  isLoan: boolean;
  isOtherIncome: boolean;
  isRevenue: boolean;
  isRevenueSelling: boolean;
  isStock: boolean;
  otherIncome: string;
};

export type TCountrySourceIncomes = {
  registerId?: string;
  CreatedAt: string;
  DeletedAt: string | null;
  corporateCountry: TCorporateCountry;
  otherInvestment: string;
  investmentObject: string;
  isCashManagement: boolean;
  isInvestment: boolean;
  isLiquidation: boolean;
  isOtherInvestment: boolean;
  otherCountry: string;
};

export type TContact = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  registerId: string;
  fullNames: TContactFullName[];
  telephone?: string;
  email: string;
  types: number;
  personalId: string;
  position: string;
  division: string;
};

export type TContactFullName = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  contactID: string;
  title: string;
  firstName: string;
  lastName: string;
  types: number;
};

export type TFullName = {
  id?: string;
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: string | null;
  ReferenceID?: string;
  title: string;
  firstName: string;
  lastName: string;
  types?: number;
};

export type TAddress = {
  id?: string;
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: string | null;
  ReferenceID?: string;
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
  types?: number;
};

export type TDirector = {
  id?: string;
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: string | null;
  personalId?: string;
  registerId?: string;
  fullNames: TFullName[];
  addresses: TAddress[];
  citizenId?: string;
  passportId?: string;
  expiryDate: string | null;
  nationality: string;
  types?: number;
};

export type TAuthorizedPerson = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  personalId: string;
  registerId: string;
  fullNames: TFullName[];
  addresses: TAddress[];
  passportId?: string;
  citizenId?: string;
  expiryDate: string | null;
  nationality: string;
  types: number;
};

export type TIndividualShareholder = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  personalId: string;
  registerId: string;
  fullNames: TFullName[];
  citizenId?: string;
  passportId?: string;
  expiryDate: string | null;
  nationality: string;
  types: number;
  sharePercentage: number | null;
};

export type TJuristic = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  registerId: string;
  juristicName: string;
  registrationNo: string;
  registeredCountry: string;
  sharePercentage: number | null;
};

export type TBank = {
  id?: string;
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: string | null;
  registerId?: string;
  accountType: string;
  bankName: string;
  accountNo: string;
  accountLocation: string;
  swiftCode: string;
  BankId?: string;
};

export type TDocuments = {
  id?: string;
  filePath?: string;
  registerId: string;
  docTypes: string;
  fileName: string;
  fileTypes: string;
};

export type TCorporateData = {
  registerId: string;
  Info: TCorporateInfo;
  CorporateCountry: TCorporateCountry[];
  CorporateAddress: TCorporateAddress[];
  CorporateFinancials: TCorporateFinancials;
  CorporateTypes: TCorporateTypes;
  BusinessTypes: TBusinessTypes;
  SourceOfIncomes: TSourceOfIncomes;
  CountrySourceIncomes: TCountrySourceIncomes[] | null;
  Contact: TContact[] | null;
  Directors: TDirector[] | null;
  AuthorizedPersons: TAuthorizedPerson[] | null;
  IndividualShareholders: TIndividualShareholder[] | null;
  Juristics: TJuristic[];
  Banks: TBank[];
  Documents?: TDocuments[];
  Attorneys?: TAttorney[] | null;
  SuitTestResult?: SuitTestResult | null;
};

export type TMapPages = {
  [key: number]: JSX.Element;
};

export type CorporateResponse = {
  id?: string;
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: null | string;
  registerId?: string;
  isJuristicThailand?: boolean;
  isTaxExempt?: boolean;
  isNonTaxExempt?: boolean;
  isJuristicForeign?: boolean;
  isOperatingInThailand?: boolean;
  isNonOperatingInThailand?: boolean;
  isOther?: boolean;
  isPartnership?: boolean;
  isGovernmentStateEnterprise?: boolean;
  isCoOperative?: boolean;
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
  otherBusinessType?: string;
  isRevenue?: boolean;
  isStock?: boolean;
  isDonation?: boolean;
  isLoan?: boolean;
  isRevenueSelling?: boolean;
  isOtherIncome?: boolean;
  otherIncome?: string;
  corporateCountry?: CorporateCountryResponse;
  otherCountry?: string;
  investmentObject?: string;
  isLiquidation?: boolean;
  isInvestment?: boolean;
  isCashManagement?: boolean;
  isOtherInvestment?: boolean;
  otherInvestment?: string;
  isThailand?: boolean;
  other?: string;
  types?: number;
};

export type CorporateCountryResponse = {
  id?: string;
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: null | string;
  registerId?: string;
  isThailand?: boolean;
  other?: string;
  types?: number;
};

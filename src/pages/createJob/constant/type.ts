export type TCorporateAccountOpeningInfo = {
  corporateCode: string;
  // corporateName: string;
  // taxId: number;
  dateFrom: Date;
  dateTo: Date;
};

export type TCorporateInfo = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  corporateCode: number;
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
  corporateCode: number;
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
  corporateCode: number;
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

export type TCorporateFinancials = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  corporateCode: number;
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
  corporateCode: number;
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
  CreatedAt: string;
  DeletedAt: string | null;
  id: string;
  corporateCode: number;
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
  CreatedAt: string;
  DeletedAt: string | null;
  id: string;
  corporateCode: number;
  isDonation: boolean;
  isLoan: boolean;
  isOtherIncome: boolean;
  isRevenue: boolean;
  isRevenueSelling: boolean;
  isStock: boolean;
  otherIncome: string;
};

export type TCountrySourceIncomes = {
  CreatedAt: string;
  DeletedAt: string | null;
  corporateCountry: TCorporateCountry;
  isliquidation: boolean;
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
  corporateCode: number;
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
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  ReferenceID: string;
  title: string;
  firstName: string;
  lastName: string;
  types: number;
};

export type TAddress = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  ReferenceID: string;
  addressNo: string;
  building?: string;
  floor?: string;
  mooNo?: string;
  soi?: string;
  road?:string;
  tambon: string;
  amphoe: string;
  province: string;
  postalCode: string;
  country: string;
  types: number;
};

export type TDirector = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  personalId: string;
  corporateCode: number;
  fullNames: TFullName[];
  addresses: TAddress[];
  citizenId: string;
  passportId: string;
  expiryDate: string;
  nationality: string;
  types: number;
};

export type TAuthorizedPerson = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  personalId: string;
  corporateCode: number;
  fullNames: TFullName[];
  addresses: TAddress[];
  passportId?: string;
  citizenId?: string;
  expiryDate: string;
  nationality: string;
  types: number;
};

export type TAttorney = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  personalId: string;
  corporateCode: number;
  fullNames: TFullName[];
  addresses: TAddress[];
  passportId?: string;
  citizenId?: string;
  expiryDate: string;
  nationality: string;
  types: number;
  telephone:string;
  email:string;
};

export type TIndividualShareholder = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  personalId: string;
  corporateCode: number;
  fullNames: TFullName[];
  citizenId?: string;
  passportId?: string;
  expiryDate: string | null;
  nationality: string;
  types: number;
  sharePercentage: number;
};

export type TJuristic = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  corporateCode: number;
  juristicName: string;
  registrationNo: string;
  registeredCountry: string;
  sharePercentage: number;
};

export type TBank = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  corporateCode: number;
  accountType: string;
  bankName: string;
  accountNo: string;
  accountLocation: string;
  swiftCode: string;
  BankId: string;
};

export type TCorporateData = {
  CorporateCode: number;
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
};

export type TMapPages = {
  [key: number]: JSX.Element;
};

export type TCorporateTypeForCreate = {

  corporateCode?: string;
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
}
export type CorporateResponse = {
  id?: string;
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: null | string;
  corporateCode?: number;
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
  corporateCode?: number;
  isThailand?: boolean;
  other?: string;
  types?: number;
};

export type TDocuments = {
  id?:string;
  filePath?:string;
  corporateCode:number;
  docType:string;
  fileName:string;
  fileTypes:string;
}
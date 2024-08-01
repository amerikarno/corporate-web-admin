export type TCorporateAccountOpeningInfo = {
  corporateCode: number;
  corporateName: string;
  taxId: number;
  dateFrom: string;
  dateTo: string;
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
  istaxExempt: boolean;
  isnonTaxExempt: boolean;
  isoperatingInThailand: boolean;
  isnonOperatingInThailand: boolean;
  isother: boolean;
  ispartnership: boolean;
  isgovernmentStateEnterprise: boolean;
};

export type TBusinessTypes = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  corporateCode: number;
  isarmament: boolean;
  isinsuranceAssurance: boolean;
  iscasinoGambling: boolean;
  isjewelryGoldTrading: boolean;
  isfoundation: boolean;
  ispropertyRealEstate: boolean;
  ismoneyTransfer: boolean;
  isemploymentAgency: boolean;
  isentertainment: boolean;
  istravel: boolean;
  isfinancial: boolean;
  iseducationCenter: boolean;
  isforeignCurrencyExchange: boolean;
  iscryptoRelated: boolean;
  isotherBusiness: boolean;
  otherBusinessType: string;
};

export type TSourceOfIncomes = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  corporateCode: number;
  isrevenue: boolean;
  otherIncome: string;
};

export type TCountrySourceIncomes = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  corporateCode: number;
  investmentObject: string;
  iscashManagement: boolean;
  otherInvestment: string;
  contact: TContact;
};

export type TContact = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  corporateCode: number;
  telephone?: string;
  email?: string;
  types: number;
  personalID?: string;
  position?: string;
  division?: string;
};

export type TFullName = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  ReferenceID: string;
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
  fullnames: TFullName[];
  addresses: TAddress[];
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
  fullnames: TFullName[];
  addresses: TAddress[];
  passportId: string;
  expiryDate: string;
  nationality: string;
  types: number;
};

export type TIndividualShareholder = {
  id: string;
  createBy: string;
  CreatedAt: string;
  DeletedAt: string | null;
  personalId: string;
  corporateCode: number;
  fullnames: TFullName[];
  passportId: string;
  expiryDate: string;
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
  CountrySourceIncomes: TCountrySourceIncomes;
  Contact: TContact[];
  Directors: TDirector[];
  AuthorizedPersons: TAuthorizedPerson[];
  IndividualShareholders: TIndividualShareholder[];
  Juristics: TJuristic[];
  Banks: TBank[];
};

export type SuitAnswer = {
  ans: number | number[];
};

export type SuitTestResultAnswer = {
  answer: { [key: string]: SuitAnswer };
};

export type NestedSuitTestResult = {
  cid: string;
  investorTypeRisk: string;
  level: number;
  totalScore: number;
  suitTestResult: SuitTestResultAnswer;
};

export type SuiteTestResult = {
  createBy: string;
  id: string;
  suiteTestResult: NestedSuitTestResult;
  isFatca: boolean;
  fatcaInfo: any | null;
  isKnowLedgeDone: boolean;
  knowLedgeTestResult: number;
};

export type TBasicinfoAddress = {
  CreatedAt?: string;
  DeletedAt?: string | null;
  id: string;
  homeNumber: string;
  villageNumber: string;
  villageName: string;
  subStreetName: string;
  streetName: string;
  subDistrictName: string;
  districtName: string;
  provinceName: string;
  zipCode: string;
  countryName: string;
  types: number;
};

export type TBasicInfoBank = {
  CreatedAt?: string;
  DeletedAt?: string | null;
  id: string;
  bankName: string;
  bankBranchName: string;
  bankAccountNumber: string;
  types: number;
};

export type TIndividualData = {
  createBy?:string;
  CreatedAt?: string;
  DeletedAt?: string | null;
  id: number;
  thTitle: string;
  thName: string;
  thSurname: string;
  engTitle: string;
  engName: string;
  engSurname: string;
  email: string;
  mobile: string;
  birthDate: string;
  marriageStatus: string;
  citizenId: string;
  laserCode: string;
  education: string;
  sourceOfIncome: string;
  currentOccupation: string;
  officeName: string;
  agreement?:boolean;
  typeOfBusiness: string;
  positionName: string;
  salaryRange: string;
  shortTermInvestment?: boolean;
  taxesInvestment?: boolean;
  longTermInvestment?: boolean;
  retireInvestment?: boolean;
  pageId?: number;
  update?: string;
  SuiteTestResult: SuiteTestResult;
  address: TBasicinfoAddress[];
  bank: TBasicInfoBank[];
  ndid:boolean;
  thaid:boolean;
};

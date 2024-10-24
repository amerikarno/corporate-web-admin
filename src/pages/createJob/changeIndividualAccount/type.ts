export type SuitAnswer = {
  ans: number[];
};

export type SuiteTestResultAnswer = {
  answer: { [key: string]: SuitAnswer };
};

export type NestedSuiteTestResult = {
  registerId: string;
  investorTypeRisk: string;
  level: number;
  totalScore: number;
  suiteTestResult: SuiteTestResultAnswer;
};

export type SuiteTestResult = {
  createBy: string;
  deletedBy: string;
  registerId: string;
  suiteTestResult: NestedSuiteTestResult;
  isFatca: boolean;
  fatcaInfo: any | null;
  isKnowLedgeDone: boolean;
  knowLedgeTestResult: number;
};

export type TBasicinfoAddress = {
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: string | null;
  id: string;
  registerId: string;
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
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: string | null;
  id: string;
  registerId: string;
  bankName: string;
  bankBranchName: string;
  bankAccountNumber: string;
  types: number;
};

export type TIndividualData = {
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: string | null;
  agreement?: boolean;
  registerId:string;
  id: string;
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

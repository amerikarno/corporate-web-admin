export type SuitAnswer = {
    id: string;
    ans: number | number[];
    type: number;
    quiz: number;
  };
  
  export type SuitTestResultAnswer = {
    answer: SuitAnswer[];
    additional: Array<boolean | undefined | null>;
  };
  
  export type SuitTestResult = {
    CreatedAt: string;
    DeletedAt: string | null;
    corporateCode: string;
    accountID: string;
    totalScore: number;
    level: number;
    investorTypeRisk: string;
    suitTestResult: SuitTestResultAnswer;
    type: number;
  };
  
  export type TIndividualData = {
    CreatedAt?: string;
    DeletedAt?: string;
    id: number;
    thTitle: string;
    thName: string;
    thSurname: string;
    engTitle: string;
    engName: string;
    engSurname: string;
    email: string;
    mobile: string;
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
    shortTermInvestment: boolean;
    taxesInvestment: boolean;
    pageId?: number;
    update?: string;
    SuitTestResult: SuitTestResult;
  };
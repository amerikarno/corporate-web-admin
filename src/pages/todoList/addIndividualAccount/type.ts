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
  }
  
  export type TBasicInfoBank = {
    CreatedAt?: string;
    DeletedAt?: string;
    id: string;
    bankName: string;
    bankBranchName: string;
    bankAccountNumber: string;
    types: number;
  }

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
    longTermInvestment?:boolean;
    retireInvestment?:boolean;
    pageId?: number;
    update?: string;
    SuitTestResult: SuitTestResult;
    address : TBasicinfoAddress[];
    bank: TBasicInfoBank[];
  };
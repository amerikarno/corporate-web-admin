type TDetail = {
    id?: string;
    createBy?:string;
    CreatedAt?:string;
    DeletedAt?:string | null;
    registerId:string;
    header: string;
    content: string;
  };
  
  type TFaq = {
    id?: string;
    registerId:string;
    createBy?:string;
    CreatedAt?:string;
    DeletedAt?:string | null;
    question: string;
    answer: string;
  };
  
  export type TMember = {
    memberId?: string;
    id?: string;
    createBy?:string;
    CreatedAt?:string;
    DeletedAt?:string | null;
    registerId: string;
    picture?: string;
    firstName: string;
    midName: string;
    lastName: string;
    position: string;
    history: string;
  };

  export interface TAssetInfo {
    asset: {
      id?: string;
      title?: string;
      logo?: string;
      issueBy: string;
      image?: string;
      name: string;
      description: string;
      category: string;
      return: string;
      region: string;
      minimum: string;
    };
    info: {
      id?: string;
      totalIssuance: string;
      totalAmountRaised: string;
      contractInfomation: string;
      minimumInvestmentAmount: string;
      minimumInvestmentQuantity: string;
      issueUnitPrice: string;
    };
  }

  export interface TAssetDetail {
    details?: TDetail[];
    faq?: TFaq[];
  }

  export interface TCompanyMember {
    companyMembers: TMember[];
  }

  export interface TAssetIssuance {
    issuanceTerms: {
        registerId?: string;
        investmentPeriod?: string;
        dividendYield?: string;
        grossMargin?: string;
        equityMultiple?: string;
        profit?: string;
        leverage?: string;
        investmentStructure?: string;
        distributionFrequency?: string;
      };
  }

  export interface TAssetKeyInfo {
      keyInformation?: {
      registerId?: string;
      network?: string;
      precision?: string;
      capitalStructure?: string;
      classiFication?: string;
      productType?: string;
      creationTime?: string;
      releaseTime?: string;
      compleationTime?: string;
    };
  }
  
  export interface TAssetData {
    registerId?: string;
    asset: {
      id:string;
      registerId?: string;
      createBy?:string;
      CreatedAt?:string;
      DeletedAt?:string | null;
      title?: string;
      logo?: string;
      issueBy: string;
      image: string;
      name: string;
      description: string;
      category: string;
      return: string;
      region: string;
      minimum: string;
    };
    info: {
      registerId?: string;
      CreatedAt?:string;
      DeletedAt?:string | null;
      totalIssuance: string;
      totalAmountRaised: string;
      contractInfomation: string;
      minimumInvestmentAmount: string;
      minimumInvestmentQuantity: string;
      issueUnitPrice: string;
    };
    details: TDetail[];
    documents: string[] | null;
    images: string[] | null;
    videos: string[] | null;
    faq: TFaq[];
    keyInformation: {
      registerId:string;
      createBy?:string;
      CreatedAt?:string;
      DeletedAt?:string | null;
      network: string;
      precision: string;
      capitalStructure: string;
      classiFication: string;
      productType: string;
      creationTime: string;
      releaseTime: string;
      compleationTime: string;
    };
    issuanceTerms: {
      createBy?:string;
      CreatedAt?:string;
      DeletedAt?:string | null;
      registerId:string;
      investmentPeriod: string;
      dividendYield: string;
      grossMargin: string;
      equityMultiple: string;
      profit: string;
      leverage: string;
      investmentStructure: string;
      distributionFrequency: string;
    };
    companyMembers: {
      id?: string;
      createBy?:string;
      CreatedAt?:string;
      DeletedAt?:string | null;
      registerId: string;
      picture?: string;
      firstName: string;
      midName: string;
      lastName: string;
      position: string;
      history: string;
    }[];
  }
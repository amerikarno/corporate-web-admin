type TDetail = {
    id?: string;
    header: string;
    content: string;
  };
  
  type TFaq = {
    id?: string;
    question: string;
    answer: string;
  };
  
  export type TMember = {
    id?: string;
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
      catagory: string;
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
        id?: string;
        investmentPeriod?: string;
        dividendYield?: string;
        grossmargin?: string;
        equityMultiple?: string;
        profit?: string;
        leverage?: string;
        investmentStructure?: string;
        distributionFrequency?: string;
      };
  }

  export interface TAssetKeyInfo {
    keyInformation?: {
      id?: string;
      network?: string;
      precision?: string;
      capitalStructure?: string;
      classification?: string;
      productType?: string;
      creationTime?: string;
      releaseTime?: string;
      compleationTime?: string;
    };
  }
  
  export interface TAssetData {
    id?: number;
    asset: {
      id?: string;
      title?: string;
      logo?: string;
      issueBy: string;
      image: string;
      name: string;
      description: string;
      catagory: string;
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
    details: TDetail[];
    documents: string[];
    images: string[];
    videos: string[];
    faq: TFaq[];
    keyInformation: {
      id?: string;
      network: string;
      precision: string;
      capitalStructure: string;
      classification: string;
      productType: string;
      creationTime: string;
      releaseTime: string;
      compleationTime: string;
    };
    issuanceTerms: {
      id?: string;
      investmentPeriod: string;
      dividendYield: string;
      grossmargin: string;
      equityMultiple: string;
      profit: string;
      leverage: string;
      investmentStructure: string;
      distributionFrequency: string;
    };
    companyMembers: TMember[];
  }
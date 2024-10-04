import { z } from 'zod';

const TDetailSchema = z.object({
  header: z.string(),
  content: z.string(),
});

const TFaqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const TMemberSchema = z.object({
  picture: z.string().optional(),
  firstName: z.string(),
  midName: z.string(),
  lastName: z.string(),
  position: z.string(),
  history: z.string(),
});

export const TAssetInfoSchema =  z.object({
    asset: z.object({
        title: z.string().optional(),
        logo: z.string().optional(),
        issueBy: z.string(),
        image: z.string().optional(),
        name: z.string(),
        description: z.string(),
        category: z.string(),
        return: z.string(),
        region: z.string(),
        minimum: z.string(),
      }),
      info: z.object({
        totalIssuance: z.string(),
        totalAmountRaised: z.string(),
        contractInfomation: z.string(),
        minimumInvestmentAmount: z.string(),
        minimumInvestmentQuantity: z.string(),
        issueUnitPrice: z.string(),
      }),
})

export const TAssetDetailSchema = z.object({
    details: z.array(TDetailSchema).optional(),
    faq: z.array(TFaqSchema).optional(),
})

export const TAssetKeyInfoSchema = z.object({
    keyInformation: z.object({
        network: z.string().optional(),
        precision: z.string().optional(),
        capitalStructure: z.string().optional(),
        classification: z.string().optional(),
        productType: z.string().optional(),
        creationTime: z.string().optional(),
        releaseTime: z.string().optional(),
        compleationTime: z.string().optional(),
      }),
})

export const TAssetIssuanceSchema = z.object({
    issuanceTerms: z.object({
        investmentPeriod: z.string(),
        dividendYield: z.string(),
        grossmargin: z.string(),
        equityMultiple: z.string(),
        profit: z.string(),
        leverage: z.string(),
        investmentStructure: z.string(),
        distributionFrequency: z.string(),
      }),
})

export const TAssetCompanyMemberSchema = z.object({
    companyMembers: z.array(TMemberSchema)
})

export const TAssetDataSchema = z.object({
  asset: z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    logo: z.string().optional(),
    issueBy: z.string(),
    image: z.string(),
    name: z.string(),
    description: z.string(),
    category: z.string(),
    return: z.string(),
    region: z.string(),
    minimum: z.string(),
  }),
  info: z.object({
    totalIssuance: z.string(),
    totalAmountRaised: z.string(),
    contractInfomation: z.string(),
    minimumInvestmentAmount: z.string(),
    minimumInvestmentQuantity: z.string(),
    issueUnitPrice: z.string(),
  }),
  details: z.array(TDetailSchema),
  documents: z.array(z.string()),
  images: z.array(z.string()),
  videos: z.array(z.string()),
  faq: z.array(TFaqSchema),
  keyInformation: z.object({
    network: z.string(),
    precision: z.string(),
    capitalStructure: z.string(),
    classification: z.string(),
    productType: z.string(),
    creationTime: z.string(),
    releaseTime: z.string(),
    compleationTime: z.string(),
  }),
  issuanceTerms: z.object({
    investmentPeriod: z.string(),
    dividendYield: z.string(),
    grossmargin: z.string(),
    equityMultiple: z.string(),
    profit: z.string(),
    leverage: z.string(),
    investmentStructure: z.string(),
    distributionFrequency: z.string(),
  }),
  companyMembers: z.array(TMemberSchema),
});
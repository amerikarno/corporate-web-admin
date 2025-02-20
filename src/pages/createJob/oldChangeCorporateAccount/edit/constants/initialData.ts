import {
  TCorporateTypeAndIncome,
  TInitailJuristicTypeAndIncome,
  TJuristicTypeAll,
  TRegisteredCountryPrimaryCountryOperation,
} from "./types";

export const emptyRegisteredCountryPrimaryCountryOperation: TRegisteredCountryPrimaryCountryOperation =
  {
    registered: "",
    primary: "",
    isRegisteredThailand: false,
    isPrimaryCountry: false,
    isRegisteredOther: false,
    isPrimaryOther: false,
  };

export const initCorporateInfo = {
  name: "",
  commercialRegisteredNo: "",
  taxId: "",
  dateIncorporation: "",
  registeredCountry: "",
  primaryCountryOfOperation: "",
  registeredAddress: {
    address: [
      {
        addressNo: "",
        building: "",
        floor: "",
        mooNo: "",
        soi: "",
        road: "",
        tambon: "",
        amphoe: "",
        province: "",
        postalCode: "",
        country: "",
      },
    ],
    emailAddress: "",
    telephone: "",
    //type: 1,
  },
  incorporatedAddress: {
    address: [
      {
        addressNo: "",
        building: "",
        floor: "",
        mooNo: "",
        soi: "",
        road: "",
        tambon: "",
        amphoe: "",
        province: "",
        postalCode: "",
        country: "",
      },
    ],
    emailAddress: "",
    telephone: "",
    //type: 2,
  },
  financial: {
    registeredCapital: "",
    revenuePerYear: "",
    netProfit: "",
    shareholderEquity: "",
  },
};

export const initAddress = {
  addressNo: "",
  building: "",
  mooNo: "",
  floor: "",
  soi: "",
  road: "",
  tambon: "",
  amphoe: "",
  province: "",
  postalCode: "",
  country: "",
};

export const initialCorporateTypeAndIncome: TJuristicTypeAll = {
  registerId: "",
  corporateType: {
    "11": 0,
    "12": 0,
    "13": 0,
    "21": 0,
    "22": 0,
    "23": 0,
    "31": 0,
    "32": 0,
    "33": 0,
    "34": 0,
  },
  businessType: {
    "11": 0,
    "12": 0,
    "13": 0,
    "14": 0,
    "15": 0,
    "16": 0,
    "17": 0,
    "18": 0,
    "19": 0,
    "20": 0,
    "21": 0,
    "22": 0,
    "23": 0,
    "24": 0,
    "25": 0,
    "26": 0,
    "27": 0,
  },
  businessTypeOther: "",
  sourceOfIncome: {
    "11": 0,
    "12": 0,
    "13": 0,
    "14": 0,
    "15": 0,
    "16": 0,
  },
  sourceOfIncomeOther: "",
  countrySourceOfIncomeThai: false,
  countrySourceOfIncomeOther: "",
  investmentObjective: {
    "11": 0,
    "12": 0,
    "13": 0,
    "14": 0,
  },
  investmentObjectiveOther: "",
};

export const individualShareholder = {
  title: "",
  firstName: "",
  lastName: "",
  idCard: "",
  passPort: "",
  expiredDate: "",
  nationality: "",
  shares: "",
};

export const individualContact = {
  fullNames: [
    {
      title: "",
      firstName: "",
      lastName: "",
    },
  ],
  position: "",
  division: "",
  telephone: "",
  email: "",
};

// export const individualDirector = {
//   directortitle:"",
//   directorname: "",
//   directorsurname: "",
//   directoridcard: "",
//   directorpassport: "",
//   directorexpireddate: "",
//   directornationality: "",
//   directoraddress:[],
// }

// export const individualJuristicShareholders = {
//   juristicName: "",
//   registrationNo: "",
//   registeredCountry: "",
//   sharePercentage: 0.0,
// };

export const initailJuristicOther = {
  otherBusinessType: "",
  otherIncome: "",
  otherCountry: "",
  otherInvestment: "",
};

export const initailJuristicTypeAndIncome: TInitailJuristicTypeAndIncome = {
  isJuristicThailand: false,
  isTaxExempt: false,
  isNonTaxExempt: false,
  isJuristicForeign: false,
  isOperatingInThailand: false,
  isNonOperatingInThailand: false,
  isOther: false,
  isPartnership: false,
  isGovernmentStateEnterprise: false,
  isTaxExemptCompany: false,
  isAntiqueTrading: false,
  isHotelRestaurant: false,
  isArmament: false,
  isInsuranceAssurance: false,
  isCasinoGambling: false,
  isJewelryGoldTrading: false,
  isFoundation: false,
  isPropertyRealEstate: false,
  isMoneyTransfer: false,
  isEmploymentAgency: false,
  isEntertainment: false,
  isTravel: false,
  isFinancial: false,
  isEducationCenter: false,
  isForeignCurrencyExchange: false,
  isCryptoRelated: false,
  isOtherBusiness: false,
  // OtherBusinessType: "",
  isRevenue: false,
  isStock: false,
  isDonation: false,
  isLoan: false,
  isRevenueSelling: false,
  isOtherIncome: false,
  // OtherIncome: "",
  isThailand: false,
  isOtherThailand: false,
  // OtherCountry: "",
  // InvestmentObject: "",
  isLiquidation: false,
  isInvestment: false,
  isCashManagement: false,
  isOtherInvestment: false,
  // OtherInvestment: "",
};

export const emptyCorporateTypeAndIncome: TCorporateTypeAndIncome = {
  juristicType: "",
  businessType: "",
  sourceOfIncome: [],
  countrySourceOfIncome: "",
  investmentObjective: "",
};

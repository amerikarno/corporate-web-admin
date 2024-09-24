import { TCorporateData } from "@/pages/createJob/constant/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TCorporateData = {
  CorporateCode: 0,
  Info: {
    id: "",
    createBy: "",
    CreatedAt: "",
    DeletedAt: null,
    corporateCode: 0,
    name: "",
    registrationNo: "",
    taxId: "",
    dateOfIncorporation: "",
  },
  CorporateCountry: [],
  CorporateAddress: [],
  CorporateFinancials: {
    id: "",
    createBy: "",
    CreatedAt: "",
    DeletedAt: null,
    corporateCode: 0,
    registeredCapital: 0,
    revenuePerYear: 0,
    netProfitLoss: 0,
    shareholderEquity: 0,
  },
  CorporateTypes: {
    id: "",
    createBy: "",
    CreatedAt: "",
    DeletedAt: null,
    corporateCode: 0,
    isJuristicThailand: false,
    isTaxExempt: false,
    isNonTaxExempt: false,
    isJuristicForeign: false,
    isOperatingInThailand: false,
    isNonOperatingInThailand: false,
    isOther: false,
    isPartnership: false,
    isGovernmentStateEnterprise: false,
    isCoOperative: false,
    isTaxExemptCompany: false,
  },
  BusinessTypes: {
    CreatedAt: "",
    DeletedAt: null,
    id: "",
    corporateCode: 0,
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
    otherBusinessType: "",
  },
  SourceOfIncomes: {
    CreatedAt: "",
    DeletedAt: null,
    id: "",
    corporateCode: 0,
    isDonation: false,
    isLoan: false,
    isOtherIncome: false,
    isRevenue: false,
    isRevenueSelling: false,
    isStock: false,
    otherIncome: "",
  },
  CountrySourceIncomes: null,
  Contact: null,
  Directors: null,
  AuthorizedPersons: null,
  IndividualShareholders: null,
  Juristics: [],
  Banks: [],
};

const editCorporateSlice = createSlice({
  name: "juristicType",
  initialState,
  reducers: {
    setCorporateData(state, action: PayloadAction<TCorporateData>) {
      return { ...state, ...action.payload };
    },
    clearCorporateData() {
      return initialState;
    },
  },
});

export const { setCorporateData, clearCorporateData } =
  editCorporateSlice.actions;
export default editCorporateSlice.reducer;

import { CorporateResponse } from "@/pages/todoList/corporateAccountOpening/constant/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CorporateResponse | null = {
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
  isRevenue: false,
  isStock: false,
  isDonation: false,
  isLoan: false,
  isRevenueSelling: false,
  isOtherIncome: false,
  otherIncome: "",
  isThailand: false,
  other: "",
  isLiquidation: false,
  isInvestment: false,
  isCashManagement: false,
  isOtherInvestment: false,
  otherInvestment: "",
};

const juristicTypeSlice = createSlice({
  name: "juristicType",
  initialState,
  reducers: {
    setJuristicType: (state, action: PayloadAction<CorporateResponse>) => {
      state = action.payload;
      return state;
    },
  },
});
export const { setJuristicType } = juristicTypeSlice.actions;
export default juristicTypeSlice.reducer;

import { TCorporateData } from "@/pages/todoList/corporateAccountOpening/constant/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TCorporateData = {
    CorporateCode: 0,
    Info: {
      id: '',
      createBy: '',
      CreatedAt: '',
      DeletedAt: null,
      corporateCode: 0,
      name: '',
      registrationNo: '',
      taxId: '',
      dateOfIncorporation: ''
    },
    CorporateCountry: [],
    CorporateAddress: [],
    CorporateFinancials: {
      id: '',
      createBy: '',
      CreatedAt: '',
      DeletedAt: null,
      corporateCode: 0,
      registeredCapital: 0,
      revenuePerYear: 0,
      netProfitLoss: 0,
      shareholderEquity: 0
    },
    CorporateTypes: {
      CreatedAt: '',
      DeletedAt: null,
    },
    BusinessTypes: {
      CreatedAt: '',
      DeletedAt: null,
    },
    SourceOfIncomes: {
      CreatedAt: '',
      DeletedAt: null,
    },
    CountrySourceIncomes: [],
    Contact: null,
    Directors: null,
    AuthorizedPersons: null,
    IndividualShareholders: null,
    Juristics: [],
    Banks: []
  };

const editCorporateSlice = createSlice({
  name: 'editCorporate',
  initialState,
  reducers: {
    setCorporateData(state, action: PayloadAction<TCorporateData>) {
      return { ...state, ...action.payload };
    },

  },
});

export const { setCorporateData } = editCorporateSlice.actions;
export default editCorporateSlice.reducer;
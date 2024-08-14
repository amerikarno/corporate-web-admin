
import { createSlice } from "@reduxjs/toolkit";
import { TIndividualsShareholders } from "@/pages/corporateAccountOpening/constants/types";

interface IndividualShareholderState {
    individualShareholders: TIndividualsShareholders[];
}

const initialState: IndividualShareholderState = {
    individualShareholders: [],
};

export const individualShareholderSlice = createSlice({
  name: "IndividualShareholder",
  initialState,
  reducers: {
    addIndividualShareholder: (state, action) => {
        console.log('action.payload:', action.payload);
        return { ...state, individualShareholders: [...state.individualShareholders, action.payload] };
    },
    removeIndividualShareholder: (state, action) => {
      state.individualShareholders = state.individualShareholders.filter(
        (data) => data.personalId !== action.payload
      );
    },
    clearIndividualShareholder: (state) => {
      state.individualShareholders = [];
    },
  },
});

export const { addIndividualShareholder, removeIndividualShareholder, clearIndividualShareholder } = individualShareholderSlice.actions;
export default individualShareholderSlice.reducer;
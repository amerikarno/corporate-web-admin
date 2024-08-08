
import { createSlice } from "@reduxjs/toolkit";
import { TBank } from "@/pages/corporateAccountOpening/constants/types";

interface BankState {
    banks: TBank[];
}

const initialState: BankState = {
    banks: [],
};

export const bankSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    addBank: (state, action) => {
        console.log('action.payload:', action.payload);
        return { ...state, banks: [...state.banks, action.payload] };
    },
    removeBank: (state, action) => {
      state.banks = state.banks.filter(
        (data) => data.BankId !== action.payload
      );
    },
    clearBank: (state) => {
      state.banks = [];
    },
  },
});

export const { addBank, removeBank, clearBank } = bankSlice.actions;
export default bankSlice.reducer;
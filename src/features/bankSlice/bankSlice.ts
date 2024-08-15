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
    setBank: (state, action) => {
      state.banks = action.payload;
    },updateBank: (state, action) => {
      console.log('Updating bank with BankId:', action.payload.BankId);
      const index = state.banks.findIndex(
        (data) => data.BankId === action.payload.BankId
      );
    
      if (index !== -1) {
        console.log('Bank found. Updating...');
        state.banks[index] = {
          ...state.banks[index],
          ...action.payload,
        };
      } else {
        console.log('Bank not found. This might lead to a new entry if handled differently.');
      }
    },
  },
});

export const { addBank, removeBank, clearBank, setBank, updateBank } = bankSlice.actions;
export default bankSlice.reducer;
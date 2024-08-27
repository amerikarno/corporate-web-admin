import { createSlice } from "@reduxjs/toolkit";
import { TBankOrder } from "@/pages/createJob/addedCorporateAccount/pages/bankOrder/constant/type";

interface BankOrderState {
  bankOrders: TBankOrder[];
}

const initialState: BankOrderState = {
    bankOrders: [],
};

export const bankOrderSlice = createSlice({
  name: "bankOrder",
  initialState,
  reducers: {
    addBankOrder: (state, action) => {
      console.log("action.payload:", action.payload);
      return { ...state, bankOrders: [...state.bankOrders, action.payload] };
    },
    removeBankOrder: (state, action) => {
      state.bankOrders = state.bankOrders.filter(
        (data: any) => data.id !== action.payload
      );
    },
    clearBankOrder: (state) => {
      state.bankOrders = [];
    },
    setBankOrder: (state, action) => {
      state.bankOrders = action.payload;
    },
    updateBankOrder: (state, action) => {
      const index = state.bankOrders.findIndex(
        (data: any) => data.id === action.payload.id
      );

      if (index !== -1) {
        state.bankOrders[index] = {
          ...state.bankOrders[index],
          ...action.payload,
        };
      }
    },
  },
});

export const {
  addBankOrder,
  removeBankOrder,
  clearBankOrder,
  setBankOrder,
  updateBankOrder,
} = bankOrderSlice.actions;
export default bankOrderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { TFxExchange } from "@/pages/createJob/fxExchange/constant/schemas";

interface FxExchangeState {
  fxExchanges: TFxExchange[];
}

const initialState: FxExchangeState = {
  fxExchanges: [],
};

export const fxExchangeSlice = createSlice({
  name: "fxExchange",
  initialState,
  reducers: {
    addFxExchange: (state, action) => {
      console.log("action.payload:", action.payload);
      return { ...state, fxExchanges: [...state.fxExchanges, action.payload] };
    },
    removeFxExchange: (state, action) => {
      state.fxExchanges = state.fxExchanges.filter(
        (data: any) => data.id !== action.payload
      );
    },
    clearFxExchanges: (state) => {
      state.fxExchanges = [];
    },
    setFxExchanges: (state, action) => {
      state.fxExchanges = action.payload;
    },
    updateFxExchange: (state, action) => {
      const index = state.fxExchanges.findIndex(
        (data: any) => data.id === action.payload.id
      );

      if (index !== -1) {
        state.fxExchanges[index] = {
          ...state.fxExchanges[index],
          ...action.payload,
        };
      }
    },
  },
});

export const {
  addFxExchange,
  updateFxExchange,
  removeFxExchange,
  setFxExchanges,
  clearFxExchanges,
} = fxExchangeSlice.actions;
export default fxExchangeSlice.reducer;
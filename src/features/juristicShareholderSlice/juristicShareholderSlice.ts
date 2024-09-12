import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TJuristicsShareholders } from "@/pages/createJob/addedCorporateAccount/constants2/types";

interface JuristicShareholderState {
  juristicShareholders: TJuristicsShareholders[];
}

const initialState: JuristicShareholderState = {
  juristicShareholders: [],
};

export const juristicShareholderSlice = createSlice({
  name: "juristicShareholder",
  initialState,
  reducers: {
    addJuristicShareholder: (state, action) => {
      console.log("action.payload:", action.payload);
      return {
        ...state,
        juristicShareholders: [...state.juristicShareholders, action.payload],
      };
    },
    removeJuristicShareholder: (state, action) => {
      state.juristicShareholders = state.juristicShareholders.filter(
        (data) => data.juristicId !== action.payload
      );
    },
    clearJuristicShareholder: (state) => {
      state.juristicShareholders = [];
    },
    setJuristicShareholder: (state, action) => {
      state.juristicShareholders = action.payload;
    },
    updateJuristicShareholder: (state, action: PayloadAction<{ juristicId: string, newJuristicId: string,juristicShareholder : TJuristicsShareholders}>) => {
      const index = state.juristicShareholders.findIndex(
        (data) => data.juristicId === action.payload.juristicId
      );

      if (index !== -1) {
        state.juristicShareholders[index] = {
          ...action.payload.juristicShareholder,
          juristicId: action.payload.newJuristicId,
        };
      }
    },
  },
});

export const {
  addJuristicShareholder,
  updateJuristicShareholder,
  removeJuristicShareholder,
  setJuristicShareholder,
  clearJuristicShareholder,
} = juristicShareholderSlice.actions;
export default juristicShareholderSlice.reducer;

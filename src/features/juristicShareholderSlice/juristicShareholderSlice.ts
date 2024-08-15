
import { createSlice } from "@reduxjs/toolkit";
import { TJuristicsShareholders } from "@/pages/corporateAccountOpening/constants/types";

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
        console.log('action.payload:', action.payload);
        return { ...state, juristicShareholders: [...state.juristicShareholders, action.payload] };
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
    updateJuristicShareholder: (state, action) => {
      const index = state.juristicShareholders.findIndex(
        (data) => data.juristicId === action.payload.juristicId
      );

      if (index !== -1) {
        state.juristicShareholders[index] = {
          ...state.juristicShareholders[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addJuristicShareholder, updateJuristicShareholder , removeJuristicShareholder, setJuristicShareholder,clearJuristicShareholder } = juristicShareholderSlice.actions;
export default juristicShareholderSlice.reducer;
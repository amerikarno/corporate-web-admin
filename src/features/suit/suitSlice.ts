import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SuitTestResult = {
  corporateCode?: string;
  totalScore?: number;
  level?: number;
  invsetorTypeRisk?: string;
  suitTestResult?: SuitTestResultAnswer;
  type?: number;
};

type SuitTestResultAnswer = {
  answer: SuitAnswer[];
  additional: Array<boolean | undefined | null>;
};

type SuitAnswer = {
  id?: string;
  ans: number[] | number;
  type: number;
  quiz: number;
};

const initialState: SuitTestResult = {};

export const suitSlice = createSlice({
  name: "suit",
  initialState,
  reducers: {
    setSuit: (state, action: PayloadAction<SuitTestResult>) => {
      state = action.payload;
      return state;
    },
    resetSuit: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setSuit, resetSuit } = suitSlice.actions;
export default suitSlice.reducer;

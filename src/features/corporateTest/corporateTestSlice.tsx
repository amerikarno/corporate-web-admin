// src/features/corporateTest/corporateTestSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CorporateState {
  data: any;
}

const initialState: CorporateState = {
  data: null,
};

const corporateTestSlice = createSlice({
  name: 'corporateTest',
  initialState,
  reducers: {
    setTestCorporateData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    clearTestCorporateData: (state) => {
      state.data = null;
    },
  },
});

export const { setTestCorporateData, clearTestCorporateData } = corporateTestSlice.actions;
export default corporateTestSlice.reducer;
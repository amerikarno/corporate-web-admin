import { TIndividualData } from '@/pages/todoList/addIndividualAccount/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SuitState = {
  individualDatas: TIndividualData | null;
};

const initialState: SuitState = {
  individualDatas: null,
};

const suitSlice = createSlice({
  name: 'individualData',
  initialState,
  reducers: {
    setIndividualData: (state, action: PayloadAction<TIndividualData>) => {
      state.individualDatas = action.payload;
    },
  },
});

export const { setIndividualData } = suitSlice.actions;
export default suitSlice.reducer;
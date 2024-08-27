import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddIndividualState {
  cid?:string;
  thTitle?: string;
  thName?: string;
  thSurname?: string;
  engTitle?: string;
  engName?: string;
  engSurname?: string;
  email?: string;
  mobile?: string;
  birthDate?: string;
  mariageStatus?: string;
  citizenId?: string;
  laserCode?: string;
}

const initialState: AddIndividualState = {};

const addIndividualSlice = createSlice({
  name: 'addIndividual',
  initialState,
  reducers: {
    setAddIndividual: (state, action: PayloadAction<AddIndividualState>) => {
      return { ...state, ...action.payload };
    },
    setCid: (state, action: PayloadAction<string>) => {
        state.cid = action.payload;
      },
    clearAddIndividual: () => {
      return initialState;
    },
  },
});

export const { setAddIndividual, clearAddIndividual,setCid } = addIndividualSlice.actions;

export default addIndividualSlice.reducer;
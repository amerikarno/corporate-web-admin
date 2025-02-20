import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddIndividualState {
  registerId?: string;
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

const initialState: AddIndividualState = {
  registerId: "",
  thTitle: "",
  thName: "",
  thSurname: "",
  engTitle: "",
  engName: "",
  engSurname: "",
  email: "",
  mobile: "",
  birthDate: "",
  mariageStatus: "",
  citizenId: "",
  laserCode: "",
};

const addIndividualSlice = createSlice({
  name: "addIndividual",
  initialState,
  reducers: {
    setAddIndividual: (state, action: PayloadAction<AddIndividualState>) => {
      state = { ...state, ...action.payload };
      return state;
    },
    setCid: (state, action: PayloadAction<string>) => {
      state.registerId = action.payload;
    },
    setIndividualEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      return state;
    },
    setIndividualMobile: (state, action: PayloadAction<string>) => {
      state.mobile = action.payload;
      return state;
    },
    clearAddIndividual: () => {
      return initialState;
    },
  },
});

export const {
  setAddIndividual,
  clearAddIndividual,
  setCid,
  setIndividualEmail,
  setIndividualMobile,
} = addIndividualSlice.actions;

export default addIndividualSlice.reducer;

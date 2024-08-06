// contactPersonSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { TContactPerson } from "@/pages/corporateAccountOpening/constants/types";

interface ContactPersonState {
  contactPersons: TContactPerson[];
}

const initialState: ContactPersonState = {
  contactPersons: [],
};

export const contactPersonSlice = createSlice({
  name: "contactPerson",
  initialState,
  reducers: {
    addContactPerson: (state, action) => {
        console.log('action.payload:', action.payload);
        return { ...state, contactPersons: [...state.contactPersons, action.payload] };
    },
    removeContactPerson: (state, action) => {
      state.contactPersons = state.contactPersons.filter(
        (data) => data.personalID !== action.payload
      );
    },
    clearContactPersons: (state) => {
      state.contactPersons = [];
    },
  },
});

export const { addContactPerson, removeContactPerson, clearContactPersons } = contactPersonSlice.actions;
export default contactPersonSlice.reducer;
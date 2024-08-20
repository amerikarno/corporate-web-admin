// contactPersonSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TContactPerson } from "@/pages/createJob/addedCorporateAccount/constants/types";
import { TContact } from "@/pages/todoList/corporateAccountOpening/constant/type";

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
      console.log("action.payload:", action.payload);
      return {
        ...state,
        contactPersons: [...state.contactPersons, action.payload],
      };
    },
    removeContactPerson: (state, action) => {
      state.contactPersons = state.contactPersons.filter(
        (data) => data.personalId !== action.payload
      );
    },
    clearContactPersons: (state) => {
      state.contactPersons = [];
    },
    setContactPersons: (state, action: PayloadAction<TContact[]>) => {
      state.contactPersons = action.payload.map((contact) => ({
        ...contact,
        corporateCode: String(contact.corporateCode),
      })) as TContactPerson[];
    },
    updateContactPerson: (state, action: PayloadAction<TContactPerson>) => {
      const index = state.contactPersons.findIndex(
        (person) => person.personalId === action.payload.personalId
      );
      if (index !== -1) {
        state.contactPersons[index] = action.payload;
      }
    },
  },
});

export const {
  addContactPerson,
  removeContactPerson,
  clearContactPersons,
  setContactPersons,
  updateContactPerson,
} = contactPersonSlice.actions;
export default contactPersonSlice.reducer;

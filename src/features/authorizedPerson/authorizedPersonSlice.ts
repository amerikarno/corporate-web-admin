
import { createSlice } from "@reduxjs/toolkit";
import { TAuthorizePerson } from "@/pages/corporateAccountOpening/constants/types";

interface AuthorizedPersonState {
    authorizedPersons: TAuthorizePerson[];
}

const initialState: AuthorizedPersonState = {
    authorizedPersons: [],
};

export const authorizedPersonSlice = createSlice({
  name: "authorizedPersons",
  initialState,
  reducers: {
    addAuthorizedPerson: (state, action) => {
        console.log('action.payload:', action.payload);
        return { ...state, authorizedPersons: [...state.authorizedPersons, action.payload] };
    },
    removeAuthorizedPerson: (state, action) => {
      state.authorizedPersons = state.authorizedPersons.filter(
        (data) => data.personalId !== action.payload
      );
    },
    clearAuthorizedPerson: (state) => {
      state.authorizedPersons = [];
    },
  },
});

export const { addAuthorizedPerson, removeAuthorizedPerson, clearAuthorizedPerson } = authorizedPersonSlice.actions;
export default authorizedPersonSlice.reducer;
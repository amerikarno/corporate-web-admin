
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    updateAuthorizedPerson: (state, action) => {
      const index = state.authorizedPersons.findIndex(
        (data) => data.personalId === action.payload.personalId
      );

      if (index !== -1) {
        state.authorizedPersons[index] = {
          ...state.authorizedPersons[index],
          ...action.payload,
        };
      }
    },
    setAuthorizedPersons: (state, action: PayloadAction<TAuthorizePerson[]>) => {
      state.authorizedPersons = action.payload;
    },
  },
});

export const { addAuthorizedPerson, updateAuthorizedPerson ,setAuthorizedPersons ,removeAuthorizedPerson, clearAuthorizedPerson } = authorizedPersonSlice.actions;
export default authorizedPersonSlice.reducer;
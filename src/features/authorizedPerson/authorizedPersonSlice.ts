import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAuthorizePerson } from "@/pages/createJob/addedCorporateAccount/constants2/types";

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
      console.log("action.payload:", action.payload);
      return {
        ...state,
        authorizedPersons: [...state.authorizedPersons, action.payload],
      };
    },
    removeAuthorizedPerson: (state, action) => {
      state.authorizedPersons = state.authorizedPersons.filter(
        (data) => data.personalId !== action.payload
      );
    },
    clearAuthorizedPerson: (state) => {
      state.authorizedPersons = [];
    },
    updateAuthorizedPerson: (state, action: PayloadAction<{personalId: string, newPersonalId: string,authorizedPerson :TAuthorizePerson}>) => {
      const index = state.authorizedPersons.findIndex(
        (data) => data.personalId === action.payload.personalId
      );

      if (index !== -1) {
        state.authorizedPersons[index] = {
          ...action.payload.authorizedPerson,
          personalId:action.payload.newPersonalId
        };
      }
    },
    setAuthorizedPersons: (
      state,
      action: PayloadAction<TAuthorizePerson[]>
    ) => {
      state.authorizedPersons = action.payload;
    },
  },
});

export const {
  addAuthorizedPerson,
  updateAuthorizedPerson,
  setAuthorizedPersons,
  removeAuthorizedPerson,
  clearAuthorizedPerson,
} = authorizedPersonSlice.actions;
export default authorizedPersonSlice.reducer;

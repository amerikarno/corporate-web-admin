import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIndividualsShareholders } from "@/pages/createJob/addedCorporateAccount/constants2/types";
interface IndividualShareholderState {
  individualShareholders: TIndividualsShareholders[];
}

const initialState: IndividualShareholderState = {
  individualShareholders: [],
};

export const individualShareholderSlice = createSlice({
  name: "IndividualShareholder",
  initialState,
  reducers: {
    addIndividualShareholder: (state, action) => {
      console.log("action.payload:", action.payload);
      // const expiryDate = action.payload.expiryDate.toISOString();
      return {
        ...state,
        individualShareholders: [
          ...state.individualShareholders,
          { ...action.payload },
        ],
      };
    },
    removeIndividualShareholder: (state, action) => {
      state.individualShareholders = state.individualShareholders.filter(
        (data) => data.personalId !== action.payload
      );
    },
    clearIndividualShareholder: (state) => {
      state.individualShareholders = [];
    },
    setIndividualShareholder: (
      state,
      action: PayloadAction<TIndividualsShareholders[]>
    ) => {
      state.individualShareholders = action.payload;
    },
    updateIndividualShareholder: (
      state,
      action: PayloadAction<{ personalId: string, newPersonalId: string,individualShareholder :TIndividualsShareholders}>
    ) => {
      const index = state.individualShareholders.findIndex(
        (individualShareholder) =>
          individualShareholder.personalId === action.payload.personalId
      );
      if (index !== -1) {
        //const expiryDate = new Date(action.payload.expiryDate);
        state.individualShareholders[index] = {
          ...action.payload.individualShareholder,
          personalId: action.payload.newPersonalId,
          registerId: String(action.payload.individualShareholder.registerId),
        };
      }
    },
  },
});

export const {
  updateIndividualShareholder,
  addIndividualShareholder,
  setIndividualShareholder,
  removeIndividualShareholder,
  clearIndividualShareholder,
} = individualShareholderSlice.actions;
export default individualShareholderSlice.reducer;

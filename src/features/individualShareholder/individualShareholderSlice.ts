import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIndividualsShareholders } from "@/pages/corporateAccountOpening/constants/types";
import { TIndividualShareholder as TIndividualShareholderEdit } from "@/pages/todoList/corporateAccountOpening/constant/type";
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
      action: PayloadAction<TIndividualShareholderEdit[]>
    ) => {
      state.individualShareholders = action.payload.map(
        (individualShareholder) => ({
          ...individualShareholder,
          corporateCode: String(individualShareholder.corporateCode),
        })
      ) as unknown as TIndividualsShareholders[];
    },
    updateIndividualShareholder: (
      state,
      action: PayloadAction<TIndividualsShareholders>
    ) => {
      const index = state.individualShareholders.findIndex(
        (individualShareholder) =>
          individualShareholder.personalId === action.payload.personalId
      );
      if (index !== -1) {
        //const expiryDate = new Date(action.payload.expiryDate);
        state.individualShareholders[index] = {
          ...state.individualShareholders[index],
          ...action.payload,
          corporateCode: String(action.payload.corporateCode),
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

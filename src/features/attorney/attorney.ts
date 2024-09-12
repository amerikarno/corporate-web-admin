import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAttorney } from "@/pages/createJob/addedCorporateAccount/constants2/types";

interface AttorneyState {
  attorneys: TAttorney[];
}

const initialState: AttorneyState = {
  attorneys: [],
};

export const attorneySlice = createSlice({
  name: "attorney",
  initialState,
  reducers: {
    addAttorney: (state, action) => {
      console.log("action.payload:", action.payload);
      return {
        ...state,
        attorneys: [...state.attorneys, action.payload],
      };
    },
    removeAttorney: (state, action) => {
      state.attorneys = state.attorneys.filter(
        (data) => data.personalId !== action.payload
      );
    },
    clearAttorney: (state) => {
      state.attorneys = [];
    },
    updateAttorney: (state, action) => {
      const index = state.attorneys.findIndex((data) => {
        return data.personalId === action.payload.personalId;
      });
      if (index !== -1) {
        console.log("Attorney found. Updating...");
        state.attorneys[index] = {
          ...state.attorneys[index],
          ...action.payload,
        };
      }else{
        console.log("Attorney found. Updating... => attorney not found");
      }
    },
    setAttorney: (state, action) => {
      state.attorneys = action.payload;
    }
  },
});

export const {
    addAttorney,
    removeAttorney,
    clearAttorney,
    updateAttorney,
    setAttorney,
} = attorneySlice.actions;
export default attorneySlice.reducer;

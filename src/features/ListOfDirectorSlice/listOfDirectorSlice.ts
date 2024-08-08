
import { createSlice } from "@reduxjs/toolkit";
import { TDirector } from "@/pages/corporateAccountOpening/constants/types";

interface ListOfDirectorState {
    listOfDirectors: TDirector[];
}

const initialState: ListOfDirectorState = {
    listOfDirectors: [],
};

export const DirectorSlice = createSlice({
  name: "listOfDirector",
  initialState,
  reducers: {
    addDirector: (state, action) => {
        console.log('action.payload:', action.payload);
        return { ...state, listOfDirectors: [...state.listOfDirectors, action.payload] };
    },
    removeDirector: (state, action) => {
      state.listOfDirectors = state.listOfDirectors.filter(
        (data) => data.personalID !== action.payload
      );
    },
    clearDirector: (state) => {
      state.listOfDirectors = [];
    },
  },
});

export const { addDirector, removeDirector, clearDirector } = DirectorSlice.actions;
export default DirectorSlice.reducer;
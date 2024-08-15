
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TDirector } from "@/pages/corporateAccountOpening/constants/types";
import { TDirector as TDirectorEdit } from "@/pages/todoList/corporateAccountOpening/constant/type";
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
        (data) => data.personalId !== action.payload
      );
    },
    clearDirector: (state) => {
      state.listOfDirectors = [];
    },
    
    setDirectorEdit: (state, action: PayloadAction<TDirector[]>) => {
      state.listOfDirectors = action.payload;
    },
    updateDirector: (state, action: PayloadAction<TDirector>) => {
      const index = state.listOfDirectors.findIndex(
        (director) => director.personalId === action.payload.personalId
      );
      if (index !== -1) {
        state.listOfDirectors[index] = action.payload;
      }
    },
  },
  
});

export const { addDirector, updateDirector,removeDirector, clearDirector , setDirectorEdit } = DirectorSlice.actions;
export default DirectorSlice.reducer;
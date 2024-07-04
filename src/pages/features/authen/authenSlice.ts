import { createSlice } from "@reduxjs/toolkit";

export interface AuthenState {
  token: string | null;
}

const initialState: AuthenState = {
  token: null,
};

export const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authenSlice.actions;
export default authenSlice.reducer;

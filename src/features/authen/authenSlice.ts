// import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthenState {
  accessToken: string | null;
}

const initialState: AuthenState = {
  accessToken: null,
};

export const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      console.log(state.token);
    },
  },
});

export const { setAccessToken } = authenSlice.actions;
// export const selectToken = (state: RootState) => state.authen;
export default authenSlice.reducer;

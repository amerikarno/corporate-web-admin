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
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      console.log("state:",state.accessToken);
    },
  },
});

export const { setAccessToken } = authenSlice.actions;
// export const selectToken = (state: RootState) => state.authen;
export default authenSlice.reducer;

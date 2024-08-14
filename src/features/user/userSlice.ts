import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  id?: string;
  email?: string;
  groups?: number[];
  permissions?: number[];
  roles?: number[];
  userId?: string;
  loginStatus?: string;
  Error?: string | null;
  exp?: number;
  iat?: number;
};

interface UserState {
  user: TUser | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

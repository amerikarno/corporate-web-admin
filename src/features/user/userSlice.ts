import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  name?: string;
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
      const userName = state.user?.name;
      state.user = { ...action.payload, name: userName };
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.user = {
        ...state.user,
        name: action.payload,
      };
    },
  },
});

export const { setUser, setEmail } = userSlice.actions;
export default userSlice.reducer;

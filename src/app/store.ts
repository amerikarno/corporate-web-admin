import { configureStore } from "@reduxjs/toolkit";
import authenReducer from "../pages/features/authen/authenSlice";

export const store = configureStore({
  reducer: {
    authen: authenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

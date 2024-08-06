import { configureStore } from "@reduxjs/toolkit";
import authenReducer from "../features/authen/authenSlice";
import contactPersonReducer from '../features/contactPersonSlice';

export const store = configureStore({
  reducer: {
    authen: authenReducer,
    contactPerson: contactPersonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

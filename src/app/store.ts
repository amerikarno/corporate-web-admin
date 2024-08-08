import { configureStore } from "@reduxjs/toolkit";
import authenReducer from "../features/authen/authenSlice";
import contactPersonReducer from '../features/contactPersonSlice';
import listOfDirectorReducer from "../features/ListOfDirectorSlice/listOfDirectorSlice";
import individualShareholderReducer from "../features/individualShareholder/individualShareholderSlice";
import juristicShareholderReducer from "@/features/juristicShareholderSlice/juristicShareholderSlice";
import authorizedPersonReducer from "@/features/authorizedPerson/authorizedPersonSlice";
import bankReducer from "@/features/bankSlice/bankSlice";

export const store = configureStore({
  reducer: {
    authen: authenReducer,
    contactPerson: contactPersonReducer,
    listOfDirector: listOfDirectorReducer,
    individualShareholder: individualShareholderReducer,
    juristicShareholder: juristicShareholderReducer,
    authorizedPerson : authorizedPersonReducer,
    bank : bankReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import authenReducer from "../features/authen/authenSlice";
import contactPersonReducer from "../features/contactPersonSlice";
import listOfDirectorReducer from "../features/ListOfDirectorSlice/listOfDirectorSlice";
import individualShareholderReducer from "../features/individualShareholder/individualShareholderSlice";
import juristicShareholderReducer from "@/features/juristicShareholderSlice/juristicShareholderSlice";
import authorizedPersonReducer from "@/features/authorizedPerson/authorizedPersonSlice";
import bankReducer from "@/features/bankSlice/bankSlice";
import editCorporateReducer from "@/features/editCorporateData/editCorporateData";
import userReducer from "@/features/user/userSlice";
import orderTradeReducer from "@/features/orderTrade/orderTradeSlice";
import juristicTypeReducer from "@/features/juristicType/juristicTypeSlice";

export const store = configureStore({
  reducer: {
    authen: authenReducer,
    contactPerson: contactPersonReducer,
    listOfDirector: listOfDirectorReducer,
    individualShareholder: individualShareholderReducer,
    juristicShareholder: juristicShareholderReducer,
    authorizedPerson: authorizedPersonReducer,
    bank: bankReducer,
    editCorporate: editCorporateReducer,
    user: userReducer,
    orderTrade: orderTradeReducer,
    juristicType: juristicTypeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

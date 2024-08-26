import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
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
import countDownReducer from "@/features/countdownSlice/countDownSlice";
import livenessOcr from "@/features/livenessOcr/livenessOcr";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, countDownReducer);

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
    countdown: persistedReducer,
    livenessOcr: livenessOcr,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register"],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { persistor };

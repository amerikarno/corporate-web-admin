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
import livenessOcr from "@/features/livenessOcr/livenessOcr";
import bankOrderReducer from "@/features/bankOrder/bankOrdersSlice";
import addIndividualReducer from "@/features/addIndividual/addIndividualSlice";
import uploadFileReducer from "@/features/uploadFile/uploadFileSlice";
import suitReducer from "@/features/suit/suitSlice";
import attorneyReducer from "@/features/attorney/attorney";
import individualDataReducer from "@/features/fetchIndividualData/fetchIndividualDataSlice";

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
    livenessOcr: livenessOcr,
    bankOrder: bankOrderReducer,
    addIndividual: addIndividualReducer,
    uploadFile: uploadFileReducer,
    attorney: attorneyReducer,
    suit: suitReducer,
    individualData: individualDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

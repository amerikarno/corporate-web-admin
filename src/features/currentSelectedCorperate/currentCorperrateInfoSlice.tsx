import { TCorporateInfo } from "@/pages/createJob/addedCorporateAccount/constants2/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TCorporateInfo = {
  name: "",
  registrationNo: "",
  taxId: "",
  dateofincorporation: "",
  registeredBusiness: {
    address: [
      {
        addressNo: "",
        building: "",
        floor: "",
        mooNo: "",
        soi: "",
        road: "",
        tambon: "",
        amphoe: "",
        province: "",
        postalCode: "",
        country: "",
      },
    ],
    emailAddress: "",
    telephone: "",
  },
  placeofIncorporation: {
    address: [
      {
        addressNo: "",
        building: "",
        floor: "",
        mooNo: "",
        soi: "",
        road: "",
        tambon: "",
        amphoe: "",
        province: "",
        postalCode: "",
        country: "",
      },
    ],
    emailAddress: "",
    telephone: "",
  },
  registeredCapital: 0,
  revenuePerYear: 0,
  netProFitLoss: 0,
  shareholderEquity: 0,
  registered: "",
  isRegisteredOther: false,
  isRegisteredThailand: true,
  primary: "",
  isPrimaryCountry: true,
  isPrimaryOther: false,
  corporateCode: "",
};

const currentCorporateInfoSlice = createSlice({
  name: "currentCorporateInfo",
  initialState,
  reducers: {
    setCurrentCorporateInfo(state, action: PayloadAction<TCorporateInfo>) {
      return { ...state, ...action.payload };
    },
    clearCurrentCorporateData(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setCurrentCorporateInfo, clearCurrentCorporateData } =
  currentCorporateInfoSlice.actions;
export default currentCorporateInfoSlice.reducer;

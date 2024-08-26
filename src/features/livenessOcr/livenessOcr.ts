import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TLivenessOcr = {
  faceImage: File | null;
  idCardImage: File | null;
};

const initialState: TLivenessOcr = {
  faceImage: null,
  idCardImage: null,
};

const editCorporateSlice = createSlice({
  name: "livenessOcr",
  initialState,
  reducers: {
    setFaceImage(state, action: PayloadAction<File>) {
      return { ...state, faceImage: action.payload };
    },
    setIdCardImage(state, action: PayloadAction<File>) {
      return { ...state, idCardImage: action.payload };
    },
  },
});

export const { setFaceImage, setIdCardImage } = editCorporateSlice.actions;
export default editCorporateSlice.reducer;

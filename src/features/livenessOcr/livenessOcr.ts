import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TLivenessOcr = {
  faceImage: string | null;
  idCardImage: string | null;
};

const initialState: TLivenessOcr = {
  faceImage: null,
  idCardImage: null,
};

const livenessOcrSlice = createSlice({
  name: "livenessOcr",
  initialState,
  reducers: {
    setFaceImage(state, action: PayloadAction<string>) {
      state.faceImage = action.payload;
    },
    setIdCardImage(state, action: PayloadAction<string>) {
      state.idCardImage = action.payload;
    },
  },
});

export const { setFaceImage, setIdCardImage } = livenessOcrSlice.actions;
export default livenessOcrSlice.reducer;

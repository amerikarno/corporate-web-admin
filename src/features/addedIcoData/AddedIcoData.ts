
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAssetData } from '@/pages/createJob/addedICO/types'; 

interface AssetDataState {
  data: TAssetData | null;
}

const initialState: AssetDataState = {
  data: null,
};

const assetDataSlice = createSlice({
  name: 'assetData',
  initialState,
  reducers: {
    setAssetData(state, action: PayloadAction<TAssetData>) {
      state.data = action.payload;
    },
    clearAssetData(state) {
      state.data = null;
    },
  },
});

export const { setAssetData, clearAssetData } = assetDataSlice.actions;

export default assetDataSlice.reducer;
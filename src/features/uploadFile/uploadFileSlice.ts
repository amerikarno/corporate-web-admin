import { TDocuments } from '@/pages/todoList/corporateAccountOpening/constant/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileState {
  files: TDocuments[];
}

const initialState: FileState = {
  files: [],
};

const uploadFileSlice = createSlice({
  name: 'uploadFile',
  initialState,
  reducers: {
    setFiles(state, action: PayloadAction<TDocuments[]>) {
      state.files = action.payload;
    },
    addFile(state, action: PayloadAction<TDocuments>) {
      state.files.push(action.payload);
    },
    deleteFile(state, action: PayloadAction<TDocuments>) {
      state.files = state.files.filter(file => file.id !== action.payload.id);
    },
  },
});

export const { setFiles, addFile, deleteFile } = uploadFileSlice.actions;
export default uploadFileSlice.reducer;
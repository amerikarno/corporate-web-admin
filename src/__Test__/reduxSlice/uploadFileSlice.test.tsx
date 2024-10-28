import reducer, { setFiles, addFile, deleteFile } from "@/features/uploadFile/uploadFileSlice";
import { TDocuments } from "@/pages/todoList/corporateAccountOpening/constant/type";

const mockFile: TDocuments = {
    id: "1",
    filePath: "/path/to/document1.pdf",
    registerId: "12345",
    docTypes: "PDF",
    fileName: "document1.pdf",
    fileTypes: "application/pdf",
  };
  
  const anotherMockFile: TDocuments = {
    id: "2",
    filePath: "/path/to/document2.pdf",
    registerId: "12345",
    docTypes: "PDF",
    fileName: "document2.pdf",
    fileTypes: "application/pdf",
  };
  
  describe('uploadFileSlice', () => {
    const initialState = { files: [] as TDocuments[] };
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle setFiles', () => {
      const actual = reducer(initialState, setFiles([mockFile]));
      expect(actual.files).toEqual([mockFile]);
    });
  
    it('should handle addFile', () => {
      const stateWithFiles = { files: [mockFile] };
      const actual = reducer(stateWithFiles, addFile(anotherMockFile));
      expect(actual.files).toEqual([mockFile, anotherMockFile]);
    });
  
    it('should handle deleteFile', () => {
        const stateWithFiles = { files: [mockFile, anotherMockFile] };
        const actual = reducer(stateWithFiles, deleteFile(mockFile));
        expect(actual.files).toEqual([anotherMockFile]);
      });
  });
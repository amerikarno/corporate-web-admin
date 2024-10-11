// src/features/juristicShareholder/juristicShareholderSlice.test.ts

import reducer, {
    addJuristicShareholder,
    removeJuristicShareholder,
    clearJuristicShareholder,
    setJuristicShareholder,
    updateJuristicShareholder,
  } from '@/features/juristicShareholderSlice/juristicShareholderSlice';
  import { TJuristicsShareholders } from '@/pages/createJob/addedCorporateAccount/constants2/types';
  
  const mockJuristicShareholder: TJuristicsShareholders = {
    juristicId: "juristic1",
    corporateCode: "123456",
    juristicName: "Example Juristic",
    registrationNo: "REG123",
    registeredCountry: "USA",
    sharePercentage: 20,
  };
  
  const updatedJuristicShareholder: TJuristicsShareholders = {
    juristicId: "juristic1",
    corporateCode: "123456",
    juristicName: "Updated Juristic",
    registrationNo: "REG123",
    registeredCountry: "USA",
    sharePercentage: 25,
  };
  
  describe('juristicShareholderSlice', () => {
    const initialState = {
      juristicShareholders: [] as TJuristicsShareholders[],
    };
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle addJuristicShareholder', () => {
      const actual = reducer(initialState, addJuristicShareholder(mockJuristicShareholder));
      expect(actual.juristicShareholders).toEqual([mockJuristicShareholder]);
    });
  
    it('should handle removeJuristicShareholder', () => {
      const stateWithJuristic = {
        juristicShareholders: [mockJuristicShareholder],
      };
      const actual = reducer(stateWithJuristic, removeJuristicShareholder(mockJuristicShareholder.juristicId!));
      expect(actual.juristicShareholders).toEqual([]);
    });
  
    it('should handle clearJuristicShareholder', () => {
      const stateWithJuristic = {
        juristicShareholders: [mockJuristicShareholder],
      };
      const actual = reducer(stateWithJuristic, clearJuristicShareholder());
      expect(actual.juristicShareholders).toEqual([]);
    });
  
    it('should handle setJuristicShareholder', () => {
      const newJuristicShareholders = [mockJuristicShareholder];
      const actual = reducer(initialState, setJuristicShareholder(newJuristicShareholders));
      expect(actual.juristicShareholders).toEqual(newJuristicShareholders);
    });
  
    it('should handle updateJuristicShareholder', () => {
      const stateWithJuristic = {
        juristicShareholders: [mockJuristicShareholder],
      };
      const actual = reducer(
        stateWithJuristic,
        updateJuristicShareholder({
          juristicId: mockJuristicShareholder.juristicId!,
          newJuristicId: "juristic2",
          juristicShareholder: updatedJuristicShareholder,
        })
      );
      expect(actual.juristicShareholders).toEqual([
        {
          ...updatedJuristicShareholder,
          juristicId: "juristic2",
        },
      ]);
    });
  });
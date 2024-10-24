// src/features/individualShareholder/individualShareholderSlice.test.ts

import reducer, {
    addIndividualShareholder,
    removeIndividualShareholder,
    clearIndividualShareholder,
    setIndividualShareholder,
    updateIndividualShareholder,
  } from '@/features/individualShareholder/individualShareholderSlice';
  import { TIndividualsShareholders } from '@/pages/createJob/addedCorporateAccount/constants2/types';
  
  const mockIndividualShareholder: TIndividualsShareholders = {
    personalId: "shareholder1",
    registerId: "123456",
    fullNames: [
      {
        title: "Mr.",
        firstName: "John",
        lastName: "Doe",
      },
    ],
    citizenId: "CIT123456",
    passportId: "P123456",
    expiryDate: "2025-12-31",
    nationality: "American",
    sharePercentage: 20,
    types: 1,
  };
  
  const updatedIndividualShareholder: TIndividualsShareholders = {
    personalId: "shareholder1",
    registerId: "123456",
    fullNames: [
      {
        title: "Mr.",
        firstName: "John",
        lastName: "Doe",
      },
    ],
    citizenId: "CIT123456",
    passportId: "P123456",
    expiryDate: "2025-12-31",
    nationality: "American",
    sharePercentage: 20,
    types: 1,
  };
  
  describe('individualShareholderSlice', () => {
    const initialState = {
      individualShareholders: [] as TIndividualsShareholders[],
    };
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle addIndividualShareholder', () => {
      const actual = reducer(initialState, addIndividualShareholder(mockIndividualShareholder));
      expect(actual.individualShareholders).toEqual([mockIndividualShareholder]);
    });
  
    it('should handle removeIndividualShareholder', () => {
      const stateWithShareholder = {
        individualShareholders: [mockIndividualShareholder],
      };
      const actual = reducer(stateWithShareholder, removeIndividualShareholder(mockIndividualShareholder.personalId!));
      expect(actual.individualShareholders).toEqual([]);
    });
  
    it('should handle clearIndividualShareholder', () => {
      const stateWithShareholders = {
        individualShareholders: [mockIndividualShareholder],
      };
      const actual = reducer(stateWithShareholders, clearIndividualShareholder());
      expect(actual.individualShareholders).toEqual([]);
    });
  
    it('should handle setIndividualShareholder', () => {
      const newShareholders = [mockIndividualShareholder];
      const actual = reducer(initialState, setIndividualShareholder(newShareholders));
      expect(actual.individualShareholders).toEqual(newShareholders);
    });
  
    it('should handle updateIndividualShareholder', () => {
      const stateWithShareholder = {
        individualShareholders: [mockIndividualShareholder],
      };
      const actual = reducer(
        stateWithShareholder,
        updateIndividualShareholder({
          personalId: mockIndividualShareholder.personalId!,
          newPersonalId: "shareholder2",
          individualShareholder: updatedIndividualShareholder,
        })
      );
      expect(actual.individualShareholders).toEqual([
        {
          ...updatedIndividualShareholder,
          personalId: "shareholder2",
          registerId: String(updatedIndividualShareholder.registerId),
        },
      ]);
    });
  });
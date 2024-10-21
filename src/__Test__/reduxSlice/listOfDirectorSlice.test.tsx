// src/features/listOfDirectorSlice/listOfDirectorSlice.test.ts

import reducer, {
    addDirector,
    removeDirector,
    clearDirector,
    setDirectorEdit,
    updateDirector,
  } from '@/features/ListOfDirectorSlice/listOfDirectorSlice';
  import { TDirector } from '@/pages/createJob/addedCorporateAccount/constants2/types';
  
  const mockDirector: TDirector = {
    personalId: "director1",
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
    addresses: [
      {
        addressNo: "123",
        building: "Building A",
        floor: "5",
        mooNo: "4",
        soi: "Soi 5",
        road: "Main Road",
        tambon: "Tambon A",
        amphoe: "Amphoe A",
        province: "Province A",
        postalCode: "12345",
        country: "USA",
      },
    ],
    types: 1,
  };
  
  const updatedDirector: TDirector = {
    personalId: "director1",
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
    addresses: [
      {
        addressNo: "123",
        building: "Building A",
        floor: "5",
        mooNo: "4",
        soi: "Soi 5",
        road: "Main Road",
        tambon: "Tambon A",
        amphoe: "Amphoe A",
        province: "Province A",
        postalCode: "12345",
        country: "USA",
      },
    ],
    types: 2,
  };
  
  describe('DirectorSlice', () => {
    const initialState = {
      listOfDirectors: [] as TDirector[],
    };
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle addDirector', () => {
      const actual = reducer(initialState, addDirector(mockDirector));
      expect(actual.listOfDirectors).toEqual([mockDirector]);
    });
  
    it('should handle removeDirector', () => {
      const stateWithDirector = {
        listOfDirectors: [mockDirector],
      };
      const actual = reducer(stateWithDirector, removeDirector(mockDirector.personalId!));
      expect(actual.listOfDirectors).toEqual([]);
    });
  
    it('should handle clearDirector', () => {
      const stateWithDirectors = {
        listOfDirectors: [mockDirector],
      };
      const actual = reducer(stateWithDirectors, clearDirector());
      expect(actual.listOfDirectors).toEqual([]);
    });
  
    it('should handle setDirectorEdit', () => {
      const newDirectors = [mockDirector];
      const actual = reducer(initialState, setDirectorEdit(newDirectors));
      expect(actual.listOfDirectors).toEqual(newDirectors);
    });
  
    it('should handle updateDirector', () => {
      const stateWithDirector = {
        listOfDirectors: [mockDirector],
      };
      const actual = reducer(
        stateWithDirector,
        updateDirector({
          personalId: mockDirector.personalId!,
          newPersonalId: "director2",
          listOfDirector: updatedDirector,
        })
      );
      expect(actual.listOfDirectors).toEqual([
        {
          ...updatedDirector,
          personalId: "director2",
        },
      ]);
    });
  });
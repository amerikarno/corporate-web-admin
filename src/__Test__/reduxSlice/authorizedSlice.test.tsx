import reducer, {
    addAuthorizedPerson,
    updateAuthorizedPerson,
    setAuthorizedPersons,
    removeAuthorizedPerson,
    clearAuthorizedPerson,
  } from '@/features/authorizedPerson/authorizedPersonSlice';
  import { TAuthorizePerson } from '@/pages/createJob/addedCorporateAccount/constants2/types';
  const mockAuthorizePerson: TAuthorizePerson = {
    personalId: "AUTH123456",
    registerId: "CORP1234",
    fullNames: [
      {
        title: "Ms.",
        firstName: "Jane",
        lastName: "Smith",
      },
    ],
    citizenId: "CIT789012",
    passportId: "PASS789012",
    expiryDate: "2026-12-31",
    nationality: "Canadian",
    addresses: [
      {
        addressNo: "456",
        building: "Building B",
        floor: "3",
        mooNo: "5",
        soi: "Soi 10",
        road: "Secondary Street",
        tambon: "Tambon 2",
        amphoe: "Amphoe 2",
        province: "Province 2",
        postalCode: "67890",
        country: "Canada",
      },
    ],
    types: 2,
  };
  
  
  describe('authorizedPersonSlice', () => {
    const initialState = {
      authorizedPersons: [],
    };
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle addAuthorizedPerson', () => {
      const actual = reducer(initialState, addAuthorizedPerson(mockAuthorizePerson));
      expect(actual.authorizedPersons).toEqual([mockAuthorizePerson]);
    });
  
    it('should handle removeAuthorizedPerson', () => {
      const stateWithPerson = {
        authorizedPersons: [mockAuthorizePerson],
      };
      const actual = reducer(stateWithPerson, removeAuthorizedPerson("AUTH123456"));
      expect(actual.authorizedPersons).toEqual([]);
    });
  
    it('should handle clearAuthorizedPerson', () => {
      const stateWithPerson = {
        authorizedPersons: [mockAuthorizePerson],
      };
      const actual = reducer(stateWithPerson, clearAuthorizedPerson());
      expect(actual.authorizedPersons).toEqual([]);
    });
  
    it('should handle updateAuthorizedPerson', () => {
      const stateWithPerson = {
        authorizedPersons: [mockAuthorizePerson],
      };
  
      const updatedAuthorizePerson: TAuthorizePerson = {
        ...mockAuthorizePerson,
        fullNames: [
          {
            ...mockAuthorizePerson.fullNames[0],
            firstName: "John"
          }
        ]
      };
  
      const actual = reducer(stateWithPerson, updateAuthorizedPerson({
        personalId: "AUTH123456",
        newPersonalId: "AUTH123456",
        authorizedPerson: updatedAuthorizePerson
      }));
  
      expect(actual.authorizedPersons[0].fullNames[0].firstName).toEqual("John");
    });
  
    it('should handle setAuthorizedPersons', () => {
      const newAuthorizedPersons = [mockAuthorizePerson];
      const actual = reducer(initialState, setAuthorizedPersons(newAuthorizedPersons));
      expect(actual.authorizedPersons).toEqual(newAuthorizedPersons);
    });
  });
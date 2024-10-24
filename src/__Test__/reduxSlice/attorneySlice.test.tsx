import reducer, { 
    addAttorney, 
    removeAttorney, 
    clearAttorney, 
    updateAttorney, 
    setAttorney 
  } from '@/features/attorney/attorney';
  import { TAttorney } from '@/pages/createJob/addedCorporateAccount/constants2/types';
  
  describe('attorneySlice', () => {
    const initialState = {
      attorneys: [],
    };
  
    const mockAttorney: TAttorney = {
        personalId: "123",
        registerId: "1234",
        fullNames: [
          {
            title: "Mr.",
            firstName: "John",
            lastName: "Doe",
          },
        ],
        citizenId: "CIT123456",
        passportId: "PASS123456",
        expiryDate: "2025-01-01",
        nationality: "American",
        addresses: [
          {
            addressNo: "123",
            building: "Building A",
            floor: "2",
            mooNo: "4",
            soi: "Soi 5",
            road: "Main Street",
            tambon: "Tambon 1",
            amphoe: "Amphoe 1",
            province: "Province 1",
            postalCode: "12345",
            country: "USA",
          },
        ],
        telephone: "123-456-7890",
        email: "john.doe@example.com",
        types: 1,
      };
      
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle addAttorney', () => {
      const actual = reducer(initialState, addAttorney(mockAttorney));
      expect(actual.attorneys).toEqual([mockAttorney]);
    });
  
    it('should handle removeAttorney', () => {
      const stateWithAttorney = {
        attorneys: [mockAttorney],
      };
      const actual = reducer(stateWithAttorney, removeAttorney("123"));
      expect(actual.attorneys).toEqual([]);
    });
  
    it('should handle clearAttorney', () => {
      const stateWithAttorney = {
        attorneys: [mockAttorney],
      };
      const actual = reducer(stateWithAttorney, clearAttorney());
      expect(actual.attorneys).toEqual([]);
    });
  
    it('should handle updateAttorney', () => {
      const stateWithAttorney = {
        attorneys: [mockAttorney],
      };
      
      const updatedAttorney: TAttorney = {
        ...mockAttorney,
        fullNames: [
          {
            ...mockAttorney.fullNames[0],
            firstName: "Jane"
          }
        ]
      };
  
      const actual = reducer(stateWithAttorney, updateAttorney({
        personalId: "123",
        newPersonalId: "123",
        attorney: updatedAttorney
      }));
  
      expect(actual.attorneys[0].fullNames[0].firstName).toEqual("Jane");
    });
  
    it('should handle setAttorney', () => {
      const newAttorneys = [mockAttorney];
      const actual = reducer(initialState, setAttorney(newAttorneys));
      expect(actual.attorneys).toEqual(newAttorneys);
    });
  });
import reducer, { 
    setAddIndividual, 
    clearAddIndividual, 
    setCid, 
    setIndividualEmail, 
    setIndividualMobile 
  } from '@/features/addIndividual/addIndividualSlice';

  interface AddIndividualState {
    cid?: string;
    thTitle?: string;
    thName?: string;
    thSurname?: string;
    engTitle?: string;
    engName?: string;
    engSurname?: string;
    email?: string;
    mobile?: string;
    birthDate?: string;
    mariageStatus?: string;
    citizenId?: string;
    laserCode?: string;
  }
  
  describe('addIndividualSlice', () => {
    const initialState: AddIndividualState = {
      cid: "",
      thTitle: "",
      thName: "",
      thSurname: "",
      engTitle: "",
      engName: "",
      engSurname: "",
      email: "",
      mobile: "",
      birthDate: "",
      mariageStatus: "",
      citizenId: "",
      laserCode: "",
    };
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle setAddIndividual', () => {
      const newState: AddIndividualState = {
        cid: "123",
        thTitle: "Mr.",
        thName: "John",
        thSurname: "Doe",
        engTitle: "Mr.",
        engName: "John",
        engSurname: "Doe",
        email: "john.doe@example.com",
        mobile: "1234567890",
        birthDate: "2000-01-01",
        mariageStatus: "single",
        citizenId: "987654321",
        laserCode: "ABC123",
      };
      const actual = reducer(initialState, setAddIndividual(newState));
      expect(actual).toEqual(newState);
    });
  
    it('should handle setCid', () => {
      const actual = reducer(initialState, setCid("12345"));
      expect(actual.cid).toEqual("12345");
    });
  
    it('should handle setIndividualEmail', () => {
      const actual = reducer(initialState, setIndividualEmail("john.doe@example.com"));
      expect(actual.email).toEqual("john.doe@example.com");
    });
  
    it('should handle setIndividualMobile', () => {
      const actual = reducer(initialState, setIndividualMobile("1234567890"));
      expect(actual.mobile).toEqual("1234567890");
    });
  
    it('should handle clearAddIndividual', () => {
      const modifiedState: AddIndividualState = {
        ...initialState,
        cid: "123",
        thTitle: "Mr.",
      };
      const actual = reducer(modifiedState, clearAddIndividual());
      expect(actual).toEqual(initialState);
    });
  });
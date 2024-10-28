import reducer, {
    addBank,
    removeBank,
    clearBank,
    setBank,
    updateBank,
  } from '@/features/bankSlice/bankSlice';
  import { TBank } from '@/pages/createJob/constant/type';
  const mockBank: TBank = {
    id: "BANK123",
    createBy: "Admin",
    CreatedAt: "2023-01-01T00:00:00Z",
    DeletedAt: null,
    registerId: "9876",
    accountType: "Checking",
    bankName: "Example Bank",
    accountNo: "1234567890",
    accountLocation: "New York",
    swiftCode: "EXAMPBANK",
    BankId: "BANK123",
  };
  
  
  describe('bankSlice', () => {
    const initialState = {
      banks: [],
    };
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle addBank', () => {
      const actual = reducer(initialState, addBank(mockBank));
      expect(actual.banks).toEqual([mockBank]);
    });
  
    it('should handle removeBank', () => {
      const stateWithBank = {
        banks: [mockBank],
      };
      const actual = reducer(stateWithBank, removeBank("BANK123"));
      expect(actual.banks).toEqual([]);
    });
  
    it('should handle clearBank', () => {
      const stateWithBank = {
        banks: [mockBank],
      };
      const actual = reducer(stateWithBank, clearBank());
      expect(actual.banks).toEqual([]);
    });
  
    it('should handle updateBank', () => {
      const stateWithBank = {
        banks: [mockBank],
      };
  
      const updatedBank: TBank = {
        ...mockBank,
        bankName: "Updated Example Bank",
      };
  
      const actual = reducer(stateWithBank, updateBank({
        BankId: "BANK123",
        newBankId: "BANK123",
        bank: updatedBank
      }));
  
      expect(actual.banks[0].bankName).toEqual("Updated Example Bank");
    });
  
    it('should handle setBank', () => {
      const newBanks = [mockBank];
      const actual = reducer(initialState, setBank(newBanks));
      expect(actual.banks).toEqual(newBanks);
    });
  });
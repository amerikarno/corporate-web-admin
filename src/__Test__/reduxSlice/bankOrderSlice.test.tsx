import reducer, {
    addBankOrder,
    removeBankOrder,
    clearBankOrder,
    setBankOrder,
    updateBankOrder,
  } from '@/features/bankOrder/bankOrdersSlice';
  import { TBankOrder } from '@/pages/createJob/addedCorporateAccount/pages/bankOrder/constant/type';

  const mockBankOrder: TBankOrder = {
    id: "ORDER123",
    bankName: "Bank of Example",
    bankAccount: "1234567890",
    operations: "Deposit",
    orderValue: 1000,
    accountId: 1,
    transactionStatus: 0,
  };
  
describe('bankOrderSlice', () => {
  const initialState = {
    bankOrders: [],
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addBankOrder', () => {
    const actual = reducer(initialState, addBankOrder(mockBankOrder));
    expect(actual.bankOrders).toEqual([mockBankOrder]);
  });

  it('should handle removeBankOrder', () => {
    const stateWithOrder = {
      bankOrders: [mockBankOrder],
    };
    const actual = reducer(stateWithOrder, removeBankOrder("ORDER123"));
    expect(actual.bankOrders).toEqual([]);
  });

  it('should handle clearBankOrder', () => {
    const stateWithOrder = {
      bankOrders: [mockBankOrder],
    };
    const actual = reducer(stateWithOrder, clearBankOrder());
    expect(actual.bankOrders).toEqual([]);
  });

  it('should handle updateBankOrder', () => {
    const stateWithOrder = {
      bankOrders: [mockBankOrder],
    };

    const updatedBankOrder: TBankOrder = {
      ...mockBankOrder,
      bankName: "Updated Bank of Example",
    };

    const actual = reducer(stateWithOrder, updateBankOrder({
      ...updatedBankOrder,
      id: "ORDER123",
    }));

    expect(actual.bankOrders[0].bankName).toEqual("Updated Bank of Example");
  });

  it('should handle setBankOrder', () => {
    const newBankOrders = [mockBankOrder];
    const actual = reducer(initialState, setBankOrder(newBankOrders));
    expect(actual.bankOrders).toEqual(newBankOrders);
  });
});
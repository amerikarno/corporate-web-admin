import reducer, {
    addOrderTrade,
    updateOrderTrade,
    removeOrderTrade,
    setOrderTrades,
    clearOrderTrades,
  } from "@/features/orderTrade/orderTradeSlice";
  import { TOrderTrade } from "@/pages/createJob/orderTrade/constant/type";
  
  const mockOrderTrade: TOrderTrade = {
    corporateCode: 123456,
    operations: "Buy",
    cryptoAmount: 0.5,
    fiatAmount: 5000,
    currency: "USD",
    cryptoPrice: 10000,
    pair: "BTC/USD",
    id: "order1",
    transactionStatus: 1,
  };
  
  const updatedOrderTrade: TOrderTrade = {
    ...mockOrderTrade,
    fiatAmount: 6000,
  };
  
  describe('orderTradeSlice', () => {
    const initialState = { orderTrades: [] as TOrderTrade[] };
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle addOrderTrade', () => {
      const actual = reducer(initialState, addOrderTrade(mockOrderTrade));
      expect(actual.orderTrades).toEqual([mockOrderTrade]);
    });
  
    it('should handle removeOrderTrade', () => {
      const stateWithOrder = { orderTrades: [mockOrderTrade] };
      const actual = reducer(stateWithOrder, removeOrderTrade("order1"));
      expect(actual.orderTrades).toEqual([]);
    });
  
    it('should handle clearOrderTrades', () => {
      const stateWithOrder = { orderTrades: [mockOrderTrade] };
      const actual = reducer(stateWithOrder, clearOrderTrades());
      expect(actual.orderTrades).toEqual([]);
    });
  
    it('should handle setOrderTrades', () => {
      const newOrderTrades = [mockOrderTrade];
      const actual = reducer(initialState, setOrderTrades(newOrderTrades));
      expect(actual.orderTrades).toEqual(newOrderTrades);
    });
  
    it('should handle updateOrderTrade', () => {
      const stateWithOrder = { orderTrades: [mockOrderTrade] };
      const actual = reducer(stateWithOrder, updateOrderTrade(updatedOrderTrade));
      expect(actual.orderTrades[0].fiatAmount).toEqual(6000);
    });
  });
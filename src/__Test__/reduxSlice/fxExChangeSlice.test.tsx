// src/features/fxExchange/fxExchangeSlice.test.ts

import reducer, {
    addFxExchange,
    removeFxExchange,
    clearFxExchanges,
    setFxExchanges,
    updateFxExchange,
  } from '@/features/fxExchange/fxExhangeSlice';
  import { TFxExchange } from '@/pages/createJob/fxExchange/constant/schemas';
  
  const mockFxExchange: TFxExchange = {
    id: "exchange1",
    corporateCode: 123456,
    exchangeRate: 30.0,
    exchangeSpread: 0.1,
    operationSpread: 0.05,
    transactionStatus: 1,
    exchange: "USD/THB",
    buyCurrency: 1000,
  };
  
  const updatedFxExchange: TFxExchange = {
    id: "exchange1",
    corporateCode: 123456,
    exchangeRate: 30.0,
    exchangeSpread: 0.1,
    operationSpread: 0.05,
    transactionStatus: 1,
    exchange: "USD/THB",
    buyCurrency: 1000,
  };
  
  describe('fxExchangeSlice', () => {
    const initialState = {
      fxExchanges: [] as TFxExchange[],
    };
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle addFxExchange', () => {
      const actual = reducer(initialState, addFxExchange(mockFxExchange));
      expect(actual.fxExchanges).toEqual([mockFxExchange]);
    });
  
    it('should handle removeFxExchange', () => {
      const stateWithExchange = {
        fxExchanges: [mockFxExchange],
      };
      const actual = reducer(stateWithExchange, removeFxExchange(mockFxExchange.id));
      expect(actual.fxExchanges).toEqual([]);
    });
  
    it('should handle clearFxExchanges', () => {
      const stateWithExchanges = {
        fxExchanges: [mockFxExchange],
      };
      const actual = reducer(stateWithExchanges, clearFxExchanges());
      expect(actual.fxExchanges).toEqual([]);
    });
  
    it('should handle setFxExchanges', () => {
      const newExchanges = [mockFxExchange];
      const actual = reducer(initialState, setFxExchanges(newExchanges));
      expect(actual.fxExchanges).toEqual(newExchanges);
    });
  
    it('should handle updateFxExchange', () => {
      const stateWithExchange = {
        fxExchanges: [mockFxExchange],
      };
      const actual = reducer(stateWithExchange, updateFxExchange(updatedFxExchange));
      expect(actual.fxExchanges).toEqual([updatedFxExchange]);
    });
  });
import { createSlice } from "@reduxjs/toolkit";
import { TOrderTrade } from "@/pages/corporateAccountOpening/pages/orderTrade/constant/type";

interface OrderTradeState {
  orderTrades: TOrderTrade[];
}

const initialState: OrderTradeState = {
  orderTrades: [],
};

export const orderTradeSlice = createSlice({
  name: "orderTrade",
  initialState,
  reducers: {
    addOrderTrade: (state, action) => {
      console.log('action.payload:', action.payload);
      return { ...state, orderTrades: [...state.orderTrades, action.payload] };
    },
    removeOrderTrade: (state, action) => {
      state.orderTrades = state.orderTrades.filter(
        (data:any) => data.id !== action.payload
      );
    },
    clearOrderTrades: (state) => {
      state.orderTrades = [];
    },
    setOrderTrades: (state, action) => {
      state.orderTrades = action.payload;
    },
    updateOrderTrade: (state, action) => {
      const index = state.orderTrades.findIndex(
        (data:any) => data.id === action.payload.id
      );

      if (index !== -1) {
        state.orderTrades[index] = {
          ...state.orderTrades[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addOrderTrade, updateOrderTrade, removeOrderTrade, setOrderTrades, clearOrderTrades } = orderTradeSlice.actions;
export default orderTradeSlice.reducer;

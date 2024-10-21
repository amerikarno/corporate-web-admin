// features/timers/timersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TimerState {
  [registerId: string]: number;
}

const initialState: TimerState = {};

const timersSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {
    setTimer: (state, action: PayloadAction<{ registerId: string; time: number }>) => {
      state[action.payload.registerId] = action.payload.time;
    },
    decrementTimer: (state, action: PayloadAction<string>) => {
      if (state[action.payload] > 0) {
        state[action.payload] -= 1;
      }
    },
  },
});

export const { setTimer, decrementTimer } = timersSlice.actions;
export default timersSlice.reducer;
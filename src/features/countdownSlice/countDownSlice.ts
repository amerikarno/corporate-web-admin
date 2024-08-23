// features/timers/timersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  [corporateCode: string]: number;
}

const initialState: TimerState = {};

const timersSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {
    setTimer: (state, action: PayloadAction<{ corporateCode: string; time: number }>) => {
      state[action.payload.corporateCode] = action.payload.time;
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
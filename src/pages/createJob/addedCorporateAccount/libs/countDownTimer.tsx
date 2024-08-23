// components/CountdownTimer.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setTimer, decrementTimer } from '@/features/countdownSlice/countDownSlice';

interface CountdownTimerProps {
  corporateCode: string;
  initialTime: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ corporateCode, initialTime }) => {
  const dispatch = useDispatch();
  const time = useSelector((state: RootState) => state.countdown[corporateCode]);

  useEffect(() => {
    if (time === undefined) {
      dispatch(setTimer({ corporateCode, time: initialTime }));
    }

    const timer = setInterval(() => {
      dispatch(decrementTimer(corporateCode));
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, corporateCode, time, initialTime]);

  return (
    <div>
      <h2>Corporate Code: {corporateCode}</h2>
      <h3>Time Remaining: {time !== undefined ? time : initialTime}</h3>
    </div>
  );
};

export default CountdownTimer;
import React, { useState, useEffect } from "react";
import CountdownSegment from "./CountdownSegment.jsx";

const CountdownTimer = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % 60);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='grid grid-flow-col gap-5 text-center auto-cols-max '>
      <CountdownSegment value={15} label='days' className='text-brandPurple' />
      <CountdownSegment value={10} label='hours' />
      <CountdownSegment value={24} label='min' />
      <CountdownSegment value={counter} label='sec' />
    </div>
  );
};

export default CountdownTimer;

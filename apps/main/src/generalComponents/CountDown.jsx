import React, { useState, useEffect } from "react";

const Countdown = ({ endDatetime, isLoading = false }) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const countdown = () => {
      const endDate = new Date(endDatetime);
      const now = new Date();
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeRemaining(`${days}d : ${hours}h : ${minutes}m : ${seconds}s`);
      } else {
        setTimeRemaining("Event Ended");
      }
    };

    countdown(); // Run the countdown initially
    const intervalId = setInterval(countdown, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [endDatetime]);

  if (isLoading) {
    return (
      <div className='flex items-center'>
        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-brandPurple'></div>
      </div>
    );
  }

  return <div>{timeRemaining}</div>;
};

export default Countdown;

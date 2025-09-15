import React, { useState, useEffect, useRef } from "react";
import { equip_1 } from "../assets/images";

export const Carousel = () => {
  const slides = [equip_1, equip_1, equip_1, equip_1];
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const delay = 7000; // 7 seconds

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Start auto-slide
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide; // cleanup on unmount

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide(); // avoid multiple intervals
    intervalRef.current = setInterval(nextSlide, delay);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div
      className='h-[650px] flex flex-col gap-6'
      onMouseEnter={stopAutoSlide} // pause on hover
      onMouseLeave={startAutoSlide} // resume on leave
    >
      {/* Main Carousel */}
      <div className='relative w-full overflow-hidden flex-1 border-b'>
        <div
          className='flex transition-transform duration-500 ease-in-out'
          style={{
            transform: `translateX(-${current * 100}%)`,
            // width: `${slides.length * 100}%`,
          }}
        >
          {slides.map((src, index) => (
            <div key={index} className='w-full flex-shrink-0 h-full  px-12'>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className='w-full h-full object-contain object-center'
              />
            </div>
          ))}
        </div>

        {/* Prev button */}
        <button
          onClick={prevSlide}
          className='absolute top-0 left-0 z-10 flex items-center justify-center h-full px-4 text-white bg-black/20 hover:bg-black/40'
        >
          ◀
        </button>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className='absolute top-0 right-0 z-10 flex items-center justify-center h-full px-4 text-white bg-black/20 hover:bg-black/40'
        >
          ▶
        </button>
      </div>

      {/* Thumbnails */}
      <div className='flex space-x-2 h-[145px] justify-between'>
        {slides.map((src, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-[145px] w-[145px] border-2 transition-all duration-300 ease-in-out ${
              current === index
                ? "border-brandPurple bg-white"
                : "border-transparent border-x-[#EAEAEA] bg-[#EAEAEA]"
            }`}
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className='w-full h-full object-contain'
            />
          </button>
        ))}
      </div>
    </div>
  );
};

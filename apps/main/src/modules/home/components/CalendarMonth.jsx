import React from "react";
import dayjs from "dayjs";
import clsx from "clsx";

const startOfMonth = dayjs("2025-05-01");
const daysInMonth = startOfMonth.daysInMonth();
const startDay = startOfMonth.day(); // 0 = Sunday

const days = Array.from({ length: daysInMonth }, (_, i) =>
  startOfMonth.date(i + 1)
);

const getDayStyle = (dateStr) => {
  const redRange = [
    "2025-05-24",
    "2025-05-25",
    "2025-05-26",
    "2025-05-27",
    "2025-05-28",
    "2025-05-29",
  ];
  const greenRange = [
    "2025-05-06",
    "2025-05-07",
    "2025-05-08",
    "2025-05-09",
    "2025-05-10",
    "2025-05-11",
    "2025-05-12",
  ];

  const getStyle = (range, baseColor, faintColor, dateStr) => {
    const index = range.indexOf(dateStr);

    if (index === -1) return "";

    const isFirst = index === 0;
    const isLast = index === range.length - 1;
    const isSingle = range.length === 1;

    const roundedClass = isSingle
      ? "rounded-full"
      : isFirst
      ? "rounded-l-full"
      : isLast
      ? "rounded-r-full"
      : "";

    const bg =
      isFirst || isLast || isSingle
        ? // ? `bg-${baseColor}-300 text-white ${roundedClass}`
          `${baseColor} ${roundedClass}`
        : `${faintColor}`;

    return bg;
  };

  const redStyle = getStyle(redRange, "bg-[#E06D67]", "bg-[#FFDEDB]", dateStr);
  if (redStyle) return redStyle;

  const greenStyle = getStyle(
    greenRange,
    "bg-[#99FF99]",
    "bg-[#E5FFE5]",
    dateStr
  );
  if (greenStyle) return greenStyle;

  return "";
};

export default function CalendarMonth() {
  const allCells = [];

  // Fill previous month days
  for (let i = 0; i < startDay; i++) {
    allCells.push(
      <div key={`prev-${i}`} className='text-gray-300 text-center py-2'>
        {" "}
      </div>
    );
  }

  // Fill current month days
  for (const day of days) {
    const dateStr = day.format("YYYY-MM-DD");
    const style = getDayStyle(dateStr);

    allCells.push(
      <div key={dateStr} className={clsx("text-center py-2", style)}>
        {day.date()}
      </div>
    );
  }

  return (
    <div className='p-4 max-w-[975px]'>
      {/* Tabs */}
      <div className='flex mb-4 space-x-2'>
        <button className='border px-4 py-2 rounded'>Table</button>
        <button className='border px-4 py-2 rounded'>Gantt Chart</button>
        <button className='border px-4 py-2 rounded bg-green-100'>
          Calendar
        </button>
      </div>

      {/* Calendar Header */}
      <div className='bg-white shadow rounded-lg p-4'>
        <div className='flex justify-between items-center mb-2'>
          <button>&lt;</button>
          <h2 className='text-lg font-semibold'>May 2025</h2>
          <button>&gt;</button>
        </div>

        {/* Weekdays */}
        <div className='grid grid-cols-7 text-center font-bold text-gray-600 border-b pb-1'>
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className='grid grid-cols-7 gap-y-1 mt-2'>{allCells}</div>
      </div>
    </div>
  );
}

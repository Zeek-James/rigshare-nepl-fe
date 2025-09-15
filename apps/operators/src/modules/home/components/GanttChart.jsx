import React from "react";
import dayjs from "dayjs";
import { tasks } from "../../../constants/task";
// import { tasks } from "../data/task";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const daysInMonth = {
  Jan: 31,
  Feb: 29,
  Mar: 31,
  Apr: 30,
  May: 31,
  Jun: 30,
  Jul: 31,
};

const totalDays = Object.values(daysInMonth).reduce((a, b) => a + b, 0);

const getOffsetPercentage = (date) => {
  const start = dayjs("2025-01-01");
  const current = dayjs(date);
  const diff = current.diff(start, "day");
  return (diff / totalDays) * 100;
};

const getWidthPercentage = (start, end) => {
  const s = dayjs(start);
  const e = dayjs(end);
  const duration = e.diff(s, "day");
  return (duration / totalDays) * 100;
};

export const GanttChart = () => {
  return (
    <div className=''>
      <div className='border overflow-x-auto max-w-[975px]'>
        {/* Month Headers */}
        <div className='flex'>
          <div className='w-72 text-gray-700 pl-2  border-b'></div>

          <div className='grid grid-cols-7 text-center font-bold border-b w-full max-w-[700px]'>
            {months.map((m) => (
              <div key={m} className='py-2 border-x last:border-none'>
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Task Rows */}
        {tasks.map((task) => (
          <div
            key={task.machine}
            className='flex items-center border-b h-20 relative '
          >
            <div className='w-72 text-gray-700 pl-2'>{task.machine}</div>
            <div className='flex-1 relative  max-w-[700px]'>
              {task.bars.map((bar, i) => (
                <div
                  key={i}
                  className={`absolute -bottom-6 h-11 rounded text-white text-sm px-2 flex items-center ${bar.color}`}
                  style={{
                    left: `${getOffsetPercentage(bar.start)}%`,
                    width: `${getWidthPercentage(bar.start, bar.end)}%`,
                  }}
                >
                  {bar.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const FilterDrawer = ({ isOpen, onClose, onFilter, filters, title }) => {
  const [startDate, setStartDate] = useState(filters.created_datetime__gte);
  const [endDate, setEndDate] = useState(filters.created_datetime__lte);

  const selectedDates = useMemo(
    () => [startDate, endDate],
    [startDate, endDate]
  );

  const handleFilter = () => {
    onFilter({
      created_datetime__gte: startDate,
      created_datetime__lte: endDate,
    });

    onClose();
  };

  const handleResetFilters = () => {
    onFilter({
      created_datetime__gte: "",
      created_datetime__lte: "",
    });

    setStartDate("");
    setEndDate("");

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className='relative z-[1000]'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      <div className='fixed inset-0 overflow-hidden'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
            <DialogPanel
              transition
              className='pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700'
            >
              <div className='flex h-full flex-col overflow-y-scroll bg-white p-6 shadow-xl'>
                <div className='px-4 sm:px-6'>
                  <div className='flex items-start justify-end'>
                    <div className='ml-3 flex h-7 items-center'>
                      <button
                        type='button'
                        onClick={onClose}
                        className='relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPurple focus:ring-offset-2'
                      >
                        <span className='absolute -inset-2.5' />
                        <span className='sr-only'>Close panel</span>
                        {/* <X aria-hidden='true' className='h-6 w-6' /> */}
                      </button>
                    </div>
                  </div>
                  <div className='flex items-start mt-4 justify-between'>
                    <DialogTitle className='text-[20px] font-semibold text-[#4B4B4B]'>
                      {title}
                    </DialogTitle>
                    <div className='ml-3 flex h-7 items-center'>
                      <button
                        type='button'
                        onClick={handleResetFilters}
                        className='relative rounded-md bg-white text-brandPurple hover:text-brandBackground/90 focus:outline-none focus:ring-2 focus:ring-brandBackground focus:ring-offset-2'
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>
                </div>
                <div className='px-4 sm:px-6 mt-6'>
                  <h3 className='text-textGrey'>Date Filter</h3>
                  <div className='relative grid grid-cols-2 gap-x-2 mt-2 flex-1'>
                    <div>
                      <div className='mt-1 relative'>
                        <label htmlFor='' className='text-[12px]'>
                          from
                        </label>
                        <input
                          id='start-date'
                          type='date'
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          aria-describedby='start-date-description'
                          name='start-date'
                          className='block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-offWhite placeholder:text-[#98A2B3] focus:ring-1 focus:ring-inset focus:ring-ringColor sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div>
                      <div className='mt-1 relative'>
                        <label htmlFor='' className='text-[12px]'>
                          to
                        </label>
                        <input
                          id='end-date'
                          type='date'
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          aria-describedby='end-date-description'
                          name='end-date'
                          className='block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-offWhite placeholder:text-[#98A2B3] focus:ring-1 focus:ring-inset focus:ring-ringColor sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='rounded-xl my-5 px-5'>
                  {(startDate || endDate) && (
                    <Calendar
                      tileClassName={({ date }) => {
                        return selectedDates.find(
                          (d) =>
                            new Date(
                              // @ts-ignore
                              d
                            ).toDateString() === date.toDateString()
                        )
                          ? "highlight"
                          : null;
                      }}
                    />
                  )}
                </div>

                <button
                  type='button'
                  className='bg-brandPurple text-white rounded-lg py-2 mt-2'
                  onClick={handleFilter}
                >
                  Apply Filter
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FilterDrawer;

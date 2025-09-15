import "react-calendar/dist/Calendar.css";
import { TiChevronRight } from "react-icons/ti";
import Calendar from "react-calendar";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useState } from "react";

// Option lists
const statusOptions = [
  "Available",
  "Leased",
  "Under Maintenance",
  "Scheduled",
  "In Use",
  "Under Maintenance",
];
const equipmentOptions = [
  "Wellhead Equipment",
  "Drilling Equipment",
  "Production Equipment",
  "Pumps",
  "Cranes",
];
const manufacturers = ["Caterpillar", "GE", "Schlumberger", "Halliburton"];
const locations = ["Houston", "Midland", "Odessa", "Abu Dhabi", "Doha"];
const leasePeriods = ["Short Term", "Medium Term", "Long Term"];

const CustomFilter = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: "600", max: "550000" });
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    location: "",
    manufacturer: [],
    equipmentType: [],
    leasePeriod: ""
  });

  const handleFilterChange = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  return (
    <div className='w-[300px] px-4 py-4 gap-4 flex flex-col shadow-lg rounded-2xl h-fit border border-gray-200 bg-white transition-all duration-300 ease-linear'>
      <h2 className='text-center text-lg font-semibold text-gray-900'>Filter</h2>
      <div className='w-full'>
        <div className='w-full divide-y divide-white/5 rounded-xl'>
          {[
            "Status",
            "Location",
            "Manufacturer",
            "Equipment Type",
            "Availability Date",
            "Lease Period",
            "Price Range",
          ].map((label, i) => (
            <Disclosure key={i} as='div' className='mb-2'>
              {({ open }) => (
                <>
                  <DisclosureButton
                    className={`group flex w-full items-center justify-between border border-gray-300 rounded-lg p-3 text-left hover:border-brandPurple transition-colors ${
                      open ? "bg-purple-50 border-brandPurple" : "bg-white"
                    }`}
                  >
                    <span className='text-sm font-medium text-gray-900'>{label}</span>
                    <TiChevronRight
                      className={`size-4 transform transition-transform duration-300 ${
                        open ? "rotate-90 text-brandPurple" : "text-gray-500"
                      }`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className='mt-2 text-sm text-black px-3'>
                    {label === "Status" && (
                      <div className='flex flex-col gap-2'>
                        {statusOptions.map((option, idx) => (
                          <label key={idx} className='flex gap-2 items-center'>
                            <input
                              type='checkbox'
                              value={option}
                              className='form-checkbox accent-brandPurple'
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}

                    {label === "Location" && (
                      <select className='w-full border border-gray-300 rounded-md p-2 mt-1'>
                        <option value=''>Select location</option>
                        {locations.map((loc, idx) => (
                          <option key={idx} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    )}

                    {label === "Manufacturer" && (
                      <div className='flex flex-col gap-2'>
                        {manufacturers.map((option, idx) => (
                          <label key={idx} className='flex gap-2 items-center'>
                            <input
                              type='checkbox'
                              value={option}
                              className='form-checkbox accent-brandPurple'
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}

                    {label === "Equipment Type" && (
                      <div className='flex flex-col gap-2'>
                        {equipmentOptions.map((option, idx) => (
                          <label key={idx} className='flex gap-2 items-center'>
                            <input
                              type='checkbox'
                              value={option}
                              className='form-checkbox accent-brandPurple'
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}

                    {label === "Availability Date" && (
                      <div className='mt-2'>
                        <Calendar
                          onChange={setSelectedDate}
                          value={selectedDate}
                          className='bg-white rounded-md shadow-md'
                        />
                        {selectedDate && (
                          <p className='text-sm mt-2 text-gray-700'>
                            Selected: {selectedDate.toDateString()}
                          </p>
                        )}
                      </div>
                    )}

                    {label === "Lease Period" && (
                      <div className='flex flex-col gap-2'>
                        {leasePeriods.map((option, idx) => (
                          <label key={idx} className='flex gap-2 items-center'>
                            <input
                              type='radio'
                              name='leasePeriod'
                              value={option}
                              className='form-radio accent-brandPurple'
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}

                    {label === "Price Range" && (
                      <div className='flex flex-col gap-3'>
                        <div className='flex items-center justify-between text-sm text-gray-600'>
                          <span>${priceRange.min}</span>
                          <span>${priceRange.max}</span>
                        </div>
                        <div className='px-2'>
                          <input
                            type='range'
                            min='0'
                            max='1000000'
                            step='1000'
                            value={priceRange.min}
                            onChange={(e) =>
                              setPriceRange((prev) => ({
                                ...prev,
                                min: e.target.value,
                              }))
                            }
                            className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brandPurple'
                          />
                        </div>
                        <div className='flex gap-2'>
                          <input
                            type='number'
                            placeholder='Min'
                            className='border border-gray-300 rounded-lg p-2 text-sm w-1/2'
                            value={priceRange.min}
                            onChange={(e) =>
                              setPriceRange((prev) => ({
                                ...prev,
                                min: e.target.value,
                              }))
                            }
                          />
                          <input
                            type='number'
                            placeholder='Max'
                            className='border border-gray-300 rounded-lg p-2 text-sm w-1/2'
                            value={priceRange.max}
                            onChange={(e) =>
                              setPriceRange((prev) => ({
                                ...prev,
                                max: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    )}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomFilter;

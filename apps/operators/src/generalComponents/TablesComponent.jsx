import { useState } from "react";

import Loader from "./Loader";
import OptionsPopup from "./PopupOptions";
import { MdOutlineVisibility } from "react-icons/md";
import { renderData } from "../utils/renderData";
import { actionIcon } from "../assets/icons";
import CustomCheckBox from "./CustomCheckBox";
import { noData } from "../assets/images";

const TablesComponent = ({
  data,
  isLoading,
  hideActionButton = false,
  headers,
  options = [],
  popUpFunction,
  showCheckBox = true,
  buttonFunction,
  getFormattedValue,
  toggleRowFunction,
  toggleSelectAllFunction,
  setSelectedRows,
  selectedRows = [],
  cellClassName = "",
  headerClassName = "bg-[#F5FFF5]",
  bodyClassName = "bg-[#FAFFFA]",
}) => {
  const [selected, setSelected] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  // const [selectedRows, setSelectedRows] = useState([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, i) => i));
    }
    toggleSelectAllFunction();
  };

  const toggleRow = (index, val) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
    toggleRowFunction(index, val);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={`${bodyClassName} w-full relative h-full overflow-y-auto scrollbar-hide`}
    >
      <div className='w-full relative h-full'>
        <table className='w-full'>
          <thead
            className={`lg:table-header-group sticky top-0 ${headerClassName}  z-10`}
          >
            <tr>
              {headers?.map((header, i) => (
                <th
                  key={i}
                  className='py-3.5 px-4 text-left font-medium text-[#6C757D] text-[14px]'
                >
                  <div className='flex gap-3 items-center'>
                    {i === 0 && showCheckBox && (
                      <CustomCheckBox
                        checked={selectedRows?.length === data?.length}
                        onChange={toggleSelectAll}
                      />
                    )}
                    {header}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data?.length > 0 ? (
              data?.map((eachRow, index) => {
                const formatedValue = getFormattedValue(eachRow, index);
                return (
                  <tr
                    key={index}
                    className='bg-[#F7FDFA] border-b border-gray-200'
                  >
                    <td className='px-4 py-5 text-[14px] text-black align-top whitespace-nowrap lg:align-middle'>
                      <div className='flex items-center gap-3'>
                        {showCheckBox && (
                          <CustomCheckBox
                            onChange={() => toggleRow(index, eachRow)}
                            checked={selectedRows?.includes(index)}
                          />
                        )}
                        {renderData(formatedValue[0])}
                      </div>
                      {/* {!hideActionButton && (
                <div className="mt-1 space-y-2 pl-11 lg:">
                  {formatedValue.slice(1).map((mobileContent, mobileIndex) => (
                    <div key={mobileIndex} className="flex flex-col">
                      {renderData(mobileContent)}
                    </div>
                  ))}
                  {options.length > 0 && (
                    <OptionsPopup
                      options={options}
                      popUpFunction={(option, inx) => {
                        setShowOptions(false);
                        popUpFunction(option, inx);
                      }}
                    />
                  )}
                </div>
              )} */}
                    </td>
                    {formatedValue.slice(1).map((item, i) => (
                      <td
                        key={i}
                        className={` px-4 py-5 text-[14px] font-medium text-black lg:table-cell whitespace-nowrap ${cellClassName}`}
                      >
                        {renderData(item)}
                      </td>
                    ))}
                    {!hideActionButton && (
                      <td className=' px-4 py-5 lg:table-cell whitespace-nowrap'>
                        <div className='flex items-center space-x-4'>
                          <button
                            type='button'
                            onClick={() => {
                              setSelected(eachRow);
                              if (options.length > 0) {
                                setShowOptions(
                                  index === currentIndex ? !showOptions : true
                                );
                              } else {
                                buttonFunction(eachRow);
                              }
                              setCurrentIndex(index);
                            }}
                            className='text-14px font-medium text-brandPurple'
                          >
                            {options.length > 0 ? (
                              <img src={actionIcon} alt='Item' />
                            ) : (
                              <div className='flex items-center gap-1'>
                                <MdOutlineVisibility /> View
                              </div>
                            )}
                          </button>

                          <div className='relative'>
                            {currentIndex === index && showOptions && (
                              <OptionsPopup
                                options={options}
                                popUpFunction={(option, inx) => {
                                  setShowOptions(false);
                                  popUpFunction(option, inx, selected);
                                }}
                                selectedItem={selected}
                              />
                            )}
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={headers.length} className='py-6'>
                  <div className='flex flex-col items-center justify-center h-full mt-6'>
                    <img src={noData} alt='NoData' width={"120px"} />
                    <span className='text-20px font-medium text-brandPurple'>
                      No Data
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablesComponent;

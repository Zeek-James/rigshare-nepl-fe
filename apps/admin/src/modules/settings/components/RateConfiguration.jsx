import React, { useEffect, useState } from "react";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import CustomButton from "../../../generalComponents/Button";
import { RateConfigManager } from "../controllers/RateConfigController";
import useGetRatesManager from "../controllers/GetRatesController";
import { hasPermissions } from "../../../constants/permissions";

const RateConfiguration = () => {
  const [dollarRate, setDollarRate] = useState("");

  const { configureRate, isLoading } = RateConfigManager();
  const { data: rates } = useGetRatesManager();

  useEffect(() => {
    if (rates?.data?.dollar_rate) {
      setDollarRate(rates.data.dollar_rate);
    }
  }, [rates]);

  const handleUpdateRate = () => {
    configureRate({
      dollar_rate: dollarRate,
    });
  };

  return (
    <div className='w-[624px] bg-white rounded-md'>
      <div className='p-6'>
        {/* Dollar Rate Section */}
        <div className='mb-8 border-b pb-6'>
          <div className='flex justify-between items-center mb-4'>
            <div>
              <h2 className='text-lg font-semibold'>Dollar Rate</h2>
              <p className='text-[14px] text-gray-500 mt-1'>
                Current Dollar Rate:{" "}
                <span className='text-black text-[14px]'>
                  $1 = ₦{rates?.data?.dollar_rate}
                </span>
              </p>
            </div>
          </div>
          <div className='space-y-2'>
            <label className='block text-sm text-gray-700'>
              Enter New Rate
            </label>
            <InputWithFullBoarder
              type='text'
              value={dollarRate}
              onChange={(e) => setDollarRate(e.target.value)}
              className='w-full'
              placeholder='Enter new rate'
              disabled={!hasPermissions(["change_appconfig"])}
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div className='flex justify-end space-x-4'>
          <CustomButton
            buttonText='Cancel'
            textColor='#344054'
            className='bg-white border border-gray-500'
            onClick={() => {
              setDollarRate("");
            }}
          />
          <CustomButton
            buttonText='Update Rate'
            className='bg-brandPurple text-white'
            onClick={handleUpdateRate}
            disabled={isLoading || !hasPermissions(["change_appconfig"])}
          />
        </div>
      </div>
    </div>
  );
};

export default RateConfiguration;

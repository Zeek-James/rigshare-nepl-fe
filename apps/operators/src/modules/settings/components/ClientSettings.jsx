import React, { useEffect, useState } from "react";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import CustomButton from "../../../generalComponents/Button";
import useGetClientDetailsManager from "../controllers/getClientDetails";
import { FreightCostManager } from "../controllers/FreightCostController";
import useGetUserDetailsManager from "../controllers/get_UserDetails_controller";
import { useClientType } from "../../../constants/useClientTypes";

const ClientSettings = () => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [freightRate, setFreightRate] = useState("");
  const [contribution, setContribution] = useState("");

  const { data: clientDetails } = useGetClientDetailsManager();
  const { updateFreightCost, isLoading } = FreightCostManager();
  const { data: userDetails } = useGetUserDetailsManager();

  const isAdmin = userDetails?.data?.is_admin;
  const { isOperator } = useClientType();

  useEffect(() => {
    if (clientDetails?.data) {
      setClientName(clientDetails?.data?.name);
      setFreightRate(clientDetails?.data?.freight_cost_percentage);
      setClientEmail(clientDetails?.data?.email);
      setContribution(clientDetails?.data?.disposal_percentage_share);
    }
  }, [clientDetails]);

  const handleUpdateFreight = () => {
    updateFreightCost({
      name: clientName,
      freight_cost_percentage: freightRate,
    });
  };

  return (
    <div className="w-[887px] h-[581px] bg-white rounded-md flex">
      <div className="flex m-8">
        <div className="md:w-[699px] h-auto rounded-[6px] relative bg-white flex flex-col">
          <div className="flex space-x-4">
            <div className="flex-1">
              <InputWithFullBoarder
                label="Client Name"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full"
                placeholder="Client Name"
                disabled={!isAdmin}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <InputWithFullBoarder
                label="Freight Rate (%)"
                type="text"
                value={freightRate}
                onChange={(e) => setFreightRate(e.target.value)}
                className="w-full"
                placeholder="Freight Rate"
                disabled={!isAdmin}
              />
            </div>
          </div>
          {isOperator && (
            <div className="flex space-x-4">
              <div className="flex-1">
                <InputWithFullBoarder
                  label="Contirbution %"
                  type="text"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  disabled
                />
              </div>
            </div>
          )}
          <div className="flex space-x-4">
            <div className="flex-1">
              <InputWithFullBoarder
                label="Email Address"
                type="text"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                disabled
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4 w-full">
            <CustomButton
              buttonText="Cancel"
              textColor="#344054"
              className="bg-white border border-gray-600"
            />
            <CustomButton
              buttonText="Update Client"
              disabled={isLoading || !isAdmin}
              onClick={handleUpdateFreight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSettings;

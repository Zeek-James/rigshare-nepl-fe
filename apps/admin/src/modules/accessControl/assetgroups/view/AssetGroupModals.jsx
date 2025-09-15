import React, { useEffect, useState } from "react";
import CustomButton from "../../../../generalComponents/Button";
import InputWithFullBoarder from "../../../../generalComponents/InputWithFullBoarder";
import ModalManagement from "../../../../generalComponents/ModalManagement";

import SelectWithFullBorder from "../../../../generalComponents/SelectWithFullBorder";
import { UpdateAssetGroupManager } from "../controllers/updateAssetGroupController";
import { CreateAssetGroupManager } from "../controllers/createAssetGroupController";

const AssetGroupModals = ({ details }) => {
  const [assetGroupName, setAssetGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFunding, setSelectedFunding] = useState("");

  const fundingOptions = [
    { label: "JV", value: "jv" },
    { label: "PSC", value: "psc" },
  ];

  const { createAssetGroup, isLoading, isSuccess } = CreateAssetGroupManager();
  const {
    updateAssetGroup,
    isSuccess: isUpdateSuccess,
    isLoading: updating,
  } = UpdateAssetGroupManager({
    id: details?.id,
  });

  useEffect(() => {
    if (details) {
      setAssetGroupName(details?.name);
      setDescription(details?.description);
      setSelectedFunding(details?.selectedFunding);
    }
  }, [details]);

  const handleCreateAssetGroup = async () => {
    const assetGroupData = {
      name: assetGroupName,
      description,
      funding_tranche: selectedFunding,
    };

    if (details) {
      await updateAssetGroup(assetGroupData);
    } else {
      await createAssetGroup(assetGroupData);
    }
  };

  const clearFields = () => {
    setAssetGroupName("");
    setDescription("");
    setSelectedFunding("");
  };

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      clearFields();
      document.getElementById("create_asset_group").close();
    }
  }, [isSuccess, isUpdateSuccess]);

  return (
    <div>
      {/* ASSET GROUP MODAL */}
      <ModalManagement
        id={"create_asset_group"}
        title={"Create Asset Group"}
        onClose={clearFields}
      >
        <div className='md:w-[599px] h-auto rounded-[6px] relative bg-white flex flex-col pt-6'>
          <div className='flex flex-col md:flex-row md:space-x-2'>
            <div className='flex-1'>
              <InputWithFullBoarder
                label={"Asset Group Name"}
                placeholder={"Enter Asset Group Name"}
                type={"text"}
                value={assetGroupName}
                onChange={(e) => setAssetGroupName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:space-x-2'>
            <div className='flex-1'>
              <InputWithFullBoarder
                label={"Description"}
                placeholder={"Enter Asset Group Description"}
                type={"text"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:space-x-2'>
            <div className='flex-1'>
              <SelectWithFullBorder
                label={"Funding Tranche"}
                selectOptions={fundingOptions}
                value={selectedFunding}
                onChange={(e) => setSelectedFunding(e.target.value)}
                placeholder='Select Funding'
                required
              />
            </div>
          </div>
          <div className='flex justify-end space-x-2 mt-4 w-full'>
            <CustomButton
              buttonText={"Cancel"}
              textColor={"#344054"}
              className='bg-white border border-gray-600'
              onClick={() => {
                document.getElementById("create_asset_group").close();
                clearFields();
              }}
            />
            <CustomButton
              buttonText={details ? "Update Asset Group" : "Create Asset Group"}
              onClick={handleCreateAssetGroup}
              isLoading={isLoading || updating}
            />
          </div>
        </div>
      </ModalManagement>
    </div>
  );
};

export default AssetGroupModals;

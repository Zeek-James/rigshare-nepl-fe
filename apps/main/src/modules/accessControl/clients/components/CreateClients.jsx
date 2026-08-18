import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputWithFullBoarder from "../../../../generalComponents/InputWithFullBoarder";
import BaseDashboardNavigation from "../../../../generalComponents/BaseDashboardNavigation";
import CustomButton from "../../../../generalComponents/Button";
import Loader from "../../../../generalComponents/Loader";
import ClientsPermissionsConfiguration from "./ClientsPermissionsConfiguration";
import { UpdateClientsManager } from "../controllers/updateClientsController";
import useGetClientById from "../controllers/getClientByIdController";
import SelectWithFullBorder from "../../../../generalComponents/SelectWithFullBorder";
import useGetAssetGroupsManager from "../../assetgroups/controllers/getAssetGroupsController";
import { PostClientsManager } from "../controllers/postClientsController";
import { PostBulkClientsManager } from "../controllers/postBulkClientsController";

const CreateClients = ({ selectedClient }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [clientType, setClientType] = useState("");
  const [selectedAssetGroup, setSelectedAssetGroup] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [excelFile, setExcelFile] = useState(""); // New state for base64 file
  const [contribution, setContribution] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const { postClient, isLoading, isSuccess } = PostClientsManager();
  const {
    postBulkClients,
    isLoading: creating,
    isSuccess: created,
  } = PostBulkClientsManager();
  const { data: clientDetails, isLoading: isClientLoading } = useGetClientById({
    id: id,
  });
  const { updateClient, isSuccess: isUpdateSuccess } = UpdateClientsManager({
    id: id,
  });

  useEffect(() => {
    if (clientDetails) {
      setName(clientDetails?.data?.name);
      setEmail(clientDetails?.data?.email);
      setClientType(clientDetails?.data?.type);
      setSelectedAssetGroup(clientDetails?.data?.asset_group?.id);
      setContribution(clientDetails?.data?.disposal_percentage_share);
      const permissionIds = clientDetails?.data?.permissions.map(
        (permission) => permission.id
      );
      setSelectedPermissions(permissionIds);
    }
  }, [clientDetails]);

  const { data: assetGroups } = useGetAssetGroupsManager({
    enabled: true,
    page: 1,
  });

  const types = [
    { label: "Client", value: "CLIENT" },
    { label: "Operator", value: "OPERATOR" },
    { label: "Vendor", value: "VENDOR" },
    { label: "Third Party", value: "THIRD_PARTY_ORGANIZATION" },
  ];

  const handleAssetGroupChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAssetGroup(selectedValue); // Set selected asset group ID as a string
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setExcelFile(reader.result); // Store base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateUpdateClient = async () => {
    const clientData = {
      name,
      email,
      type: clientType,
      permissions: selectedPermissions,
      asset_group: selectedAssetGroup,
      disposal_percentage_share: contribution,
      excel_file: excelFile,
    };

    try {
      if (clientDetails) {
        // If updating an existing client, use updateClient regardless of selectedFile
        await updateClient(clientData);
      } else if (selectedFile) {
        // If selectedFile is present and creating a new client, use postBulkClients
        await postBulkClients(clientData);
      } else {
        // If no selectedFile and creating a new client, use postClient
        await postClient(clientData);
      }
    } catch (error) {
      console.error("Error creating or updating user:", error);
    }
  };

  useEffect(() => {
    if (isSuccess || isUpdateSuccess || created) {
      setTimeout(() => {
        navigate("/clients");
      }, 1000);
    }
  }, [isSuccess, isUpdateSuccess, created, navigate]);

  return (
    <BaseDashboardNavigation
      title={clientDetails ? "Edit Client" : "Create Client"}
      subtitle="Displays an overview of operation data and allows navigation to different actions."
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Create Client", path: "/clients" },
      ]}
    >
      {isClientLoading && <Loader />}
      <div className="w-full flex flex-col gap-5 pt-3">
        <div className="flex flex-col gap-0 bg-white w-full p-5 rounded-[10px]">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bulk Clients Upload
            </label>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-green-50 file:text-brandGreen
          hover:file:bg-green-100"
                accept=".xlsx"
              />
              {fileName && (
                <span className="text-sm text-gray-500">{fileName}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-5">
            <div className="flex-1">
              <InputWithFullBoarder
                label={"Client Name"}
                placeholder={"Enter Client Name"}
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={selectedFile}
                required
              />
            </div>
            <div className="flex-1">
              <InputWithFullBoarder
                label={"Admin Email Address"}
                placeholder={"Enter Admin Email Address"}
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={selectedFile}
                required
              />
            </div>
            <div className="flex-1">
              <SelectWithFullBorder
                label={"Client Type"}
                selectOptions={types}
                value={clientType}
                onChange={(e) => setClientType(e.target.value)}
                placeholder="Select Client Type"
                required
              />
            </div>
          </div>
          {clientType === "OPERATOR" && (
            <div className="flex flex-col md:flex-row md:space-x-5">
              <div className="flex-1">
                <SelectWithFullBorder
                  selectOptions={[
                    { label: "Select Asset Group", value: "" },
                    ...(assetGroups?.data?.results?.map((ag) => ({
                      label: ag.name,
                      value: ag.id,
                    })) || []),
                  ]}
                  value={selectedAssetGroup}
                  onChange={handleAssetGroupChange}
                  placeholder="Select Asset Group"
                  label="Select Asset Group"
                  required
                />
              </div>
              <div className="flex-1">
                <InputWithFullBoarder
                  label={"Operator Contribution %"}
                  placeholder={"Enter Contribution %"}
                  type={"number"}
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <ClientsPermissionsConfiguration
            clientType={clientType}
            selectedPermissions={selectedPermissions}
            setSelectedPermissions={setSelectedPermissions}
          />
          <div className="w-full flex items-center justify-end gap-5">
            <CustomButton
              buttonText={"Cancel"}
              buttonColor={"bg-whiteColor"}
              textColor={"text-black"}
              className={"h-[55px] w-[187px] border border-[#344054]"}
              onClick={() => navigate("/clients")}
            />
            <CustomButton
              buttonText={clientDetails ? "Update Client" : "Create Client"}
              className={"h-[55px] w-[187px]"}
              onClick={handleCreateUpdateClient}
              disabled={isLoading || creating}
            />
          </div>
        </div>
      </div>
    </BaseDashboardNavigation>
  );
};

export default CreateClients;

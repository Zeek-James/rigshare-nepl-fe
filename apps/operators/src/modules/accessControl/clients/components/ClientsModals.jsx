import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalManagement from "../../../../generalComponents/ModalManagement";
import InputWithFullBoarder from "../../../../generalComponents/InputWithFullBoarder";
import ButtonWithIcon from "../../../../generalComponents/ButtonWithIcon";
import { BiPlus } from "react-icons/bi";
import useGetClientsManager from "../controllers/getClientByIdController";

const ClientsModals = ({ selectedClient }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  

  const {
    data: clientData,
  } = useGetClientsManager();

  useEffect(() => {
    if (clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
    }
  }, [clientData]);

  

  const handleAddPermissions = () => {
    const clientData = {
      id: selectedClient?.id,
      email: email,
      client: { name, permissions: [] },
    };
    

    navigate(`/access-control/roles/`, { state: { clientData } });
  };
  

  useEffect(() => {
    if (selectedClient) {
      setName(selectedClient.name);
      setEmail(selectedClient.email);
    }
  }, [selectedClient]);

  return (
    <div>
      <ModalManagement id={"create_client"} title={"Create Client"}>
        <div className="md:w-[599px] h-auto rounded-[6px] relative bg-white flex flex-col pt-6">
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <InputWithFullBoarder
                label={"Client Name"}
                placeholder={"Enter Client Name"}
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <InputWithFullBoarder
                label={"Admin Email Address"}
                placeholder={"Enter Admin Email Address"}
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-2">
            <ButtonWithIcon
              icon={BiPlus}
              buttonText={selectedClient ? "Update Permission" : "Add Permission"}
              textColor={"#344054"}
              className={"bg-white border border-gray-600 h-[40px] w-auto"}
              onClick={handleAddPermissions}
            />
          </div>
        </div>
      </ModalManagement>
    </div>
  );
};

export default ClientsModals;

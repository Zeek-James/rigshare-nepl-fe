import { useNavigate } from "react-router-dom";
import useGetUserDetailsManager from "../modules/settings/controllers/get_UserDetails_controller";
import { useEffect } from "react";
import Inventory from "../modules/inventory/stockItems/components/Inventory";

const InventoryRouter = () => {
  const { data: client } = useGetUserDetailsManager();
  const navigate = useNavigate();

  const clientDetails = client?.data?.client;

  useEffect(() => {
    if (clientDetails?.type === "OPERATOR") {
      navigate(`/inventory/${clientDetails?.id}`);
    }
  }, [clientDetails, navigate]);

  return <Inventory />;
};

export default InventoryRouter;

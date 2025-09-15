import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputWithFullBoarder from "../../../../generalComponents/InputWithFullBoarder";
import BaseDashboardNavigation from "../../../../generalComponents/BaseDashboardNavigation";
import CustomButton from "../../../../generalComponents/Button";
import GoBackButton from "../../../../generalComponents/GoBackButton";
import PageHeading from "../../../../generalComponents/PageHeading";
import { UpdateRoleManager } from "../controllers/updateRoleController";
import useGetRoleById from "../controllers/getRoleByIdController";
import RolePermissionsConfiguration from "../components/RolePermissionsConfiguration";
import { PostRolesManager } from "../controllers/postRolesController";
import Loader from "../../../../generalComponents/Loader";

const CreateRole = () => {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const { postRole, isLoading, isSuccess } = PostRolesManager();
  const { data: roleDetails, isLoading: isClientLoading } = useGetRoleById({
    id: id,
  });
  const {
    updateClient,
    isSuccess: isUpdateSuccess,
    isLoading: updatingRole,
  } = UpdateRoleManager({
    id: id,
  });

  useEffect(() => {
    if (roleDetails) {
      setRoleName(roleDetails?.data?.name);

      const permissionIds = roleDetails?.data?.permissions
        .flatMap((module) => module.permissions)
        .map((permission) => permission.id);

      setSelectedPermissions(permissionIds);
    }
  }, [roleDetails]);

  const handleCreateUpdateClient = async () => {
    const clientData = {
      name: roleName,
      permissions: selectedPermissions,
    };

    try {
      if (roleDetails) {
        await updateClient(clientData);
      } else {
        await postRole(clientData);
      }
    } catch (error) {
      console.error("Error creating or updating user:", error);
    }
  };

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      setTimeout(() => {
        navigate("/access-control");
      }, 1000);
    }
  }, [isSuccess, isUpdateSuccess, navigate]);

  return (
    <BaseDashboardNavigation>
      {isClientLoading && <Loader />}
      <div className="w-full flex flex-col gap-5 pt-3">
        <GoBackButton />
        <PageHeading title={roleDetails ? "Edit Role" : "Create Role"} />
        <div className="flex flex-col gap-10 bg-white w-full p-5 rounded-[10px]">
          <div className="flex flex-col md:flex-row md:space-x-5">
            <div className="flex-1">
              <InputWithFullBoarder
                label={"Role Name"}
                placeholder={"Enter Role Name"}
                type={"text"}
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
              />
            </div>
          </div>
          <RolePermissionsConfiguration
            selectedPermissions={selectedPermissions}
            setSelectedPermissions={setSelectedPermissions}
          />
          <div className="w-full flex items-center justify-end gap-5">
            <CustomButton
              onClick={() => {
                navigate(-1);
              }}
              buttonText={"Cancel"}
              buttonColor={"bg-whiteColor"}
              textColor={"text-black"}
              className={"h-[55px] w-[187px] border border-[#344054]"}
            />
            <CustomButton
              buttonText={roleDetails ? "Update Role" : "Create Role"}
              isLoading={isLoading || updatingRole}
              className={"h-[55px] w-[187px]"}
              onClick={handleCreateUpdateClient}
              disabled={isLoading || isClientLoading}
            />
          </div>
        </div>
      </div>
    </BaseDashboardNavigation>
  );
};

export default CreateRole;

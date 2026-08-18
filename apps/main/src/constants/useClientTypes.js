import { useMemo } from "react";

export const useClientType = () => {
  const clientType = localStorage.getItem("client_type");

  const types = useMemo(
    () => ({
      isOperator: clientType === "OPERATOR",
      isVendor: clientType === "VENDOR",
      isClient: clientType === "CLIENT",
      isAdmin: clientType === "admin",
      clientType,
    }),
    [clientType]
  );

  return types;
};

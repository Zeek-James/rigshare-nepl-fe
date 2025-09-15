import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, protectedRoutes, vendorRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import { hasPermissions } from "@rigshare/shared-auth";

const ProtectedRoute = ({ isLoggedIn }) => {
  const clientType = localStorage.getItem("client_type");
  const isVendor = clientType === "VENDOR";
  const isAdmin = clientType === "admin";

  const getAccessibleRoutes = () => {
    if (isAdmin) {
      return [...publicRoutes, ...protectedRoutes, ...vendorRoutes];
    }
    if (isVendor) {
      return [...publicRoutes, ...vendorRoutes];
    }
    return [...publicRoutes, ...protectedRoutes];
  };

  return (
    <div>
      <ToastContainer />
      <Routes>
        {getAccessibleRoutes().map((route, index) => {
          const requiredPermissions = route.requiredPermissions || [];

          return (
            <Route
              key={index}
              path={route.path}
              element={
                isLoggedIn && requiredPermissions.length > 0 ? (
                  hasPermissions(requiredPermissions) ? (
                    route.element
                  ) : (
                    <Navigate to="/not-permitted" replace />
                  )
                ) : (
                  route.element
                )
              }
            />
          );
        })}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default ProtectedRoute;

import { createContext, createElement, useCallback, useContext, useState } from "react";
import { clearPermissionCache } from "./permissions";

// NOTE: this file is intentionally plain JS (no JSX). Create React App's
// babel-loader only transpiles JSX inside the app's own src/ tree, not
// workspace packages resolved from node_modules (even npm-workspace
// symlinked ones like this package) - JSX here would fail to compile in
// apps/main. Use createElement instead of <JSX />.
const AuthContext = createContext(undefined);

const readIsLoggedIn = () => Boolean(localStorage.getItem("token"));
const readClientType = () => localStorage.getItem("client_type");

// Centralizes login/logout state so the rest of the app can react to auth
// changes (e.g. re-render, redirect) without a full page reload. Login and
// logout still persist to localStorage - that's what the HTTP layer and a
// fresh page load read from - but components no longer have to force a
// reload just to see the new state.
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(readIsLoggedIn);
  const [clientType, setClientType] = useState(readClientType);

  const login = useCallback((token, userClientType) => {
    localStorage.setItem("token", token);
    if (userClientType) {
      localStorage.setItem("client_type", userClientType);
    }
    setIsLoggedIn(true);
    setClientType(userClientType ?? readClientType());
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    clearPermissionCache();
    setIsLoggedIn(false);
    setClientType(null);
  }, []);

  return createElement(
    AuthContext.Provider,
    { value: { isLoggedIn, clientType, login, logout } },
    children
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import React, { createContext, useContext } from "react";
import app from "../realm";

const RealmContext = createContext(null);

export const RealmProvider = ({ children }) => {
  return <RealmContext.Provider value={app}>{children}</RealmContext.Provider>;
};

export const useRealm = () => {
  const context = useContext(RealmContext);
  if (!context) {
    throw new Error("useRealm must be used within a RealmProvider");
  }
  return context;
};

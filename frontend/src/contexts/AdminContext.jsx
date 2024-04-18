import React, { useState, createContext, useMemo } from "react";
import PropTypes from "prop-types";

export const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  const value = useMemo(() => ({ admin, setAdmin }), [admin, setAdmin]);

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminContext;

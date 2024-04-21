// Importing necessary dependencies
import React, { useState, createContext, useMemo } from "react"; // Hooks from React for state, context, and memoization
import PropTypes from "prop-types"; // A library for type checking props

// Creating the AdminContext
export const AdminContext = createContext();

// Defining the AdminProvider component
export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null); // Using the useState hook to create a state variable for the admin and a function to update it

  // Using the useMemo hook to memoize the value of the context to avoid unnecessary renders
  const value = useMemo(() => ({ admin, setAdmin }), [admin, setAdmin]);

  // The component returns the AdminContext.Provider with the memoized value and renders its children
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

// Type checking the props of the AdminProvider component
AdminProvider.propTypes = {
  children: PropTypes.node.isRequired, // The children prop is required and must be a React node
};

export default AdminContext;

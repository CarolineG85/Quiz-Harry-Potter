// Importing necessary dependencies
import React, { useState, createContext, useMemo } from "react"; // Hooks from React for state, context, and memoization
import PropTypes from "prop-types"; // A library for type checking props

// Creating the ScoreContext
export const ScoreContext = createContext();

// Defining the ScoreProvider component
export function ScoreProvider({ children }) {
  const [score, setScore] = useState(0); // Using the useState hook to create a state variable for the score and a function to update it

  // Defining a function to reset the score
  const resetScore = () => {
    setScore(0); // Setting the score to 0
  };

  // Using the useMemo hook to memoize the value of the context to avoid unnecessary renders
  const value = useMemo(() => ({ score, setScore, resetScore }), [score]);

  // The component returns the ScoreContext.Provider with the memoized value and renders its children
  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}

// Type checking the props of the ScoreProvider component
ScoreProvider.propTypes = {
  children: PropTypes.node.isRequired, // The children prop is required and must be a React node
};

export default ScoreContext;

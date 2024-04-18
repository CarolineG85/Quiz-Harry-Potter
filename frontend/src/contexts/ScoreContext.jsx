import React, { useState, createContext, useMemo } from "react";
import PropTypes from "prop-types";

export const ScoreContext = createContext();

export function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);

  const value = useMemo(() => ({ score, setScore }), [score, setScore]);

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}

ScoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScoreContext;

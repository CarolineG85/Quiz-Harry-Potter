// Importing necessary dependencies
import { NavLink } from "react-router-dom"; // A component from React Router for creating links
import { useEffect, useState, useContext } from "react"; // Hooks from React for side effects, state, and context
import { ScoreContext } from "../contexts/ScoreContext"; // The ScoreContext for accessing the score state

// Defining the RestartGame component
function RestartGame() {
  // The component returns a div containing a link to the home page with a button to restart the game
  return (
    <div className="restart">
      <NavLink to="/">
        <button type="button" className="restart-but">
          Rejouer
        </button>
      </NavLink>
    </div>
  );
}

// Defining the Score component
function Score() {
  const [showRestart, setShowRestart] = useState(false); // Using the useState hook to create a state variable for showing the restart button and a function to update it
  const { score } = useContext(ScoreContext); // Using the useContext hook to get the score from the ScoreContext

  useEffect(() => {
    // Using the useEffect hook to run a side effect
    const timer = setTimeout(() => {
      // Setting a timeout to show the restart button after 5 seconds
      setShowRestart(true);
    }, 5000);

    return () => clearTimeout(timer); // Clearing the timeout when the component is unmounted
  }, []); // The side effect does not depend on any state or props

  // The component returns a div containing the score and the restart button when it is shown
  return (
    <div className="score-page">
      <div className="score-superposition">
        <div className="score-container">
          <div className="score-result">
            <div className="result">
              <h1> 🪄 Voici ton résultat 🪄</h1>
            </div>
            <div className="result-image">
              <img src="/harry-potter-gif-9.gif" alt="harry's smiling" />
            </div>
            <div className="score">
              <p>
                Tu as obtenu un score de <span>{score} </span>sur
                <span> 10</span> !!!
              </p>
            </div>
            {showRestart && <RestartGame />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Score;

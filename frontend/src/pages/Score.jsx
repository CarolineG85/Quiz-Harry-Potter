import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ScoreContext } from "../contexts/ScoreContext";

function RestartGame() {
  // const { resetScore } = useContext(ScoreContext);

  // const handleResetscore = () => {
  //   resetScore();
  // };
  return (
    <div className="restart">
      <NavLink to="/">
        <button
          type="button"
          className="restart-but"
          // onClick={handleResetscore}
        >
          Rejouer
        </button>
      </NavLink>
    </div>
  );
}

function Score() {
  const [showRestart, setShowRestart] = useState(false);
  const { score } = useContext(ScoreContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRestart(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="score-page">
      <div className="score-superposition">
        <div className="score-container">
          <div className="score-result">
            <div className="result">
              <h1> 🪄 Voici ton résultat 🪄</h1>
            </div>
            <div className="result-image">
              <img src="/harry-potter-gif-9.gif" alt="harry smiling" />
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

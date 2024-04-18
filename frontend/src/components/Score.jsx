import { useEffect, useState } from "react";

function RestartGame() {
  return (
    <div className="restart">
      <button type="button" className="restart-but">
        Rejouer
      </button>
    </div>
  );
}

function Score() {
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRestart(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="score-container">
      <div className="score-result">
        <div className="result">
          <h1> 🪄 Voici ton résultat 🪄</h1>
        </div>
        <div className="result-image">
          <img src="/triwizard-tournament.gif" alt="Coupe des 3 sorciers" />
        </div>
        <div className="score">
          <p>Tu as obtenu un score de sur </p>
        </div>
        {showRestart && <RestartGame />}
      </div>
    </div>
  );
}

export default Score;

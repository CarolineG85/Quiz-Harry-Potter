function Score() {
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
        <div className="restart">
          <button type="button" className="restart-but">
            Rejouer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Score;
// TODO add a restart button with a setTimeout in a useEffect?

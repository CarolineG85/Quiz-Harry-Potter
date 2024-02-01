import { Link } from "react-router-dom";

function ConnexionAdmin() {
  return (
    <div className="connexion-page">
      <h1>Connexion Admin</h1>
      <Link to="/" className="accueil">
        <button className="button-accueil" type="button">
          Accueil
        </button>
      </Link>
    </div>
  );
}
export default ConnexionAdmin;

// TODO background différent

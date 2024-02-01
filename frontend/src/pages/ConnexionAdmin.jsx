import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

function ConnexionAdmin() {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        navigate("/home-admin");
      } else {
        // eslint-disable-next-line no-alert
        alert("Identifiant ou mot de passe incorrect"); // TODO popups
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="connexion-page">
      <div className="button-connexion-container">
        <Link to="/" className="accueil">
          <button className="button-accueil" type="button">
            Retour
          </button>
        </Link>
      </div>
      <form className="cnx-form" onSubmit={handleLogin}>
        <h1>Bienvenue</h1>
        <div className="cnx-container">
          <input
            className="cnx-input"
            type="text"
            placeholder="Adresse mail"
            required
            ref={emailRef}
          />
        </div>
        <div className="cnx-container">
          <input
            className="cnx-input"
            type="password"
            placeholder="Mot de passe"
            required
            ref={passwordRef}
          />
        </div>
        <div className="button-submit-container">
          <button type="submit" className="button-cnx">
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
}
export default ConnexionAdmin;

// TODO background différent

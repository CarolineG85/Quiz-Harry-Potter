import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../contexts/AdminContext";

function ConnexionAdmin() {
  const navigate = useNavigate();
  const { setAdmin } = useContext(AdminContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isIncorrect, setIsIncorrect] = useState("");

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
        const { admin } = response.data;
        const { token } = response.data;

        setAdmin(admin);
        localStorage.setItem("token", token);
        localStorage.setItem("adminId", admin.id);

        setAdmin(response.data);
        navigate("/home-admin");
      }
    } catch (error) {
      console.error(error);
      setIsIncorrect("Identifiant ou mot de passe incorrect");
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
        <h1 className="bien">Bienvenue</h1>
        <div className="cnx-container">
          <input
            className="cnx-input"
            type="email"
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
      {isIncorrect && <h1 className="incorrect">{isIncorrect}</h1>}
    </div>
  );
}
export default ConnexionAdmin;

// TODO background différent

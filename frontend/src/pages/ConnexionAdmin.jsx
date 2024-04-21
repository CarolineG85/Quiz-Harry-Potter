// Importing necessary dependencies
import { Link, useNavigate } from "react-router-dom"; // Components from React Router for creating links and navigating
import { useRef, useState, useContext } from "react"; // Hooks from React for references, state, and context
import axios from "axios"; // A library for making HTTP requests
import { AdminContext } from "../contexts/AdminContext"; // The AdminContext for accessing the admin state

// Defining the ConnexionAdmin component
function ConnexionAdmin() {
  const navigate = useNavigate(); // Using the useNavigate hook to get the navigate function
  const { setAdmin } = useContext(AdminContext); // Using the useContext hook to get the setAdmin function from the AdminContext
  const emailRef = useRef(); // Using the useRef hook to create a reference for the email input
  const passwordRef = useRef(); // Using the useRef hook to create a reference for the password input
  const [isIncorrect, setIsIncorrect] = useState(""); // Using the useState hook to create a state variable for the incorrect message and a function to update it

  const handleLogin = async (e) => {
    // Defining a function to handle the login
    e.preventDefault(); // Preventing the default form submission

    try {
      const email = emailRef.current.value; // Getting the value of the email input
      const password = passwordRef.current.value; // Getting the value of the password input

      const response = await axios.post(
        // Making a POST request to the login API
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // If the response status is 200
        const { admin } = response.data; // Getting the admin from the response data
        const { token } = response.data; // Getting the token from the response data

        setAdmin(admin); // Updating the admin state
        localStorage.setItem("token", token); // Storing the token in the local storage
        localStorage.setItem("adminId", admin.id); // Storing the admin id in the local storage

        setAdmin(response.data); // Updating the admin state
        navigate("/home-admin"); // Navigating to the home admin page
      }
    } catch (error) {
      console.error(error); // If an error occurs, log it
      setIsIncorrect("Identifiant ou mot de passe incorrect"); // Updating the incorrect message
    }
  };

  // The component returns a div containing a form for the admin to log in
  return (
    <div className="connexion-page">
      <div className="cnx-superposition">
        <div className="button-connexion-container">
          <Link to="/" className="accueil">
            <button className="button-accueil" type="button">
              Retour
            </button>
          </Link>
        </div>
        <div className="cnx-form-container">
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
            {/* Displaying the incorrect message if it exists */}
            {isIncorrect && <p className="incorrect">{isIncorrect}</p>}
            <div className="button-submit-container">
              <button type="submit" className="button-cnx">
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConnexionAdmin;

// Importing necessary dependencies
import { Link, useLocation } from "react-router-dom"; // A component for creating links and a hook for accessing the current location from React Router

// Defining the AdminNavbar component
function AdminNavbar() {
  const location = useLocation(); // Using the useLocation hook to get the current location

  // The component returns a div containing different buttons depending on the current location
  return (
    <div className="adminNavbar">
      <div className="admin-buttons">
        {location.pathname === "/home-admin" ? ( // If the current location is "/home-admin"
          <>
            {/* Display a button to add a question and a button to log out */}
            {/* Display a link to "/questions-admin" and "/" */}
            <Link to="/questions-admin" className="addQuestion">
              <button className="button-add" type="button">
                Ajouter une question
              </button>
            </Link>
            <Link to="/" className="deconnexion">
              <button className="button-deconnexion" type="button">
                Déconnexion
              </button>
            </Link>
          </>
        ) : (
          // If the current location is not "/home-admin"
          // Display a link to "/connexion"
          <Link to="/connexion" className="connexion">
            <button className="button-connexion" type="button">
              Connexion
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default AdminNavbar;

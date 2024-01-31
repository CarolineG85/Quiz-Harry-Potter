import { Link, useLocation } from "react-router-dom";

function AdminNavbar() {
  const location = useLocation();

  return (
    <div className="adminNavbar">
      <div className="admin-buttons">
        {location.pathname === "/home-admin" ||
        location.pathname === "/questions-admin/modify/:id" ||
        location.pathname === "/questions-admin" ? (
          <>
            <Link to="/questions-admin/modify/:id">
              <button type="button" className="button-modify">
                Modifier les questions
              </button>
            </Link>
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

// remplacer le bouton connexion par une image
// cacher bouton modifier les questions quand on est sur la page modifier les questions et pareil pour ajouter une question

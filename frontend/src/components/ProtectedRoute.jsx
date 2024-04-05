import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);

  useEffect(() => {
    if (!admin) {
      navigate("/connexion");
    }
  }, [admin]);

  return children;
}
export default ProtectedRoute;

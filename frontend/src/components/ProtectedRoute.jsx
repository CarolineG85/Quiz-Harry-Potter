// Importing necessary dependencies
import { useEffect, useContext } from "react"; // Hooks from React for side effects and context
import { useNavigate } from "react-router-dom"; // A hook from React Router for navigation
import { AdminContext } from "../contexts/AdminContext"; // The AdminContext for accessing the admin state

// Defining the ProtectedRoute component
function ProtectedRoute({ children }) {
  const navigate = useNavigate(); // Using the useNavigate hook to get a navigate function
  const { admin } = useContext(AdminContext); // Using the useContext hook to get the admin state from the AdminContext

  useEffect(() => {
    // Using the useEffect hook to run a side effect
    if (!admin) {
      // If there is no admin
      navigate("/connexion"); // Navigate to "/connexion"
    }
  }, [admin]); // The side effect depends on the admin state

  return children; // The component renders its children
}

export default ProtectedRoute;

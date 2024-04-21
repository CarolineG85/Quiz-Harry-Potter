// Importing necessary dependencies
import { useEffect, useState } from "react"; // Hooks from React for side effects and state
import { useNavigate, useLoaderData, Outlet, Navigate } from "react-router-dom"; // Components from React Router for navigation, loading data, and rendering routes
import axios from "axios"; // A library for making HTTP requests
import AdminNavbar from "../components/AdminNavbar"; // The AdminNavbar component

// Defining the App component
function App() {
  const navigate = useNavigate(); // Using the useNavigate hook to get the navigate function
  const questions = useLoaderData(); // Using the useLoaderData hook to get the questions
  const shuffledQuestions = questions.sort(() => 0.5 - Math.random()); // Shuffling the questions
  const [questArray] = useState(shuffledQuestions.slice(0, 10)); // Using the useState hook to create a state variable for the question array and a function to update it
  const [index, setIndex] = useState(0); // Using the useState hook to create a state variable for the index and a function to update it
  const [isQuestEnd, setIsQuestEnd] = useState(false); // Using the useState hook to create a state variable for the end of the questions and a function to update it

  useEffect(() => {
    // Using the useEffect hook to run a side effect
    if (index < questArray.length) {
      // If the index is less than the length of the question array
      navigate(`/question/${questArray[index].id}`); // Navigate to the question page with the id of the current question
    } else if (index === questArray.length) {
      // If the index is equal to the length of the question array
      setIsQuestEnd(true); // Set the end of the questions to true
    }
  }, [index, navigate, questArray]); // The side effect depends on the index, the navigate function, and the question array

  const handleNextQuest = () => {
    // Defining a function to handle the next question
    if (index < questArray.length) {
      // If the index is less than the length of the question array
      setIndex((prevIndex) => prevIndex + 1); // Increment the index
      setIsQuestEnd(false); // Set the end of the questions to false
    }
  };

  // The component returns a div containing the AdminNavbar component, the Outlet component for rendering the routes, and a button to go to the next question
  // If the questions have ended, it navigates to the score page
  return (
    <div className="app-page">
      <div className="app-superposition">
        <AdminNavbar />

        {isQuestEnd ? (
          <Navigate to="/score" />
        ) : (
          <>
            <Outlet />

            <button
              type="button"
              onClick={handleNextQuest}
              className="button-next-quest"
            >
              Question suivante
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Defining a function to load the questions
export const loadQuestions = async () => {
  try {
    const questions = await axios.get(
      // Making a GET request to the questions API
      `${import.meta.env.VITE_BACKEND_URL}/api/questions`
    );
    return questions.data; // Returning the questions data
  } catch (error) {
    console.error(error); // If an error occurs, log it
    return []; // Return an empty array
  }
};

export default App;
// Question is a page represented by the outlet component
// Don't forget to db migrate!!

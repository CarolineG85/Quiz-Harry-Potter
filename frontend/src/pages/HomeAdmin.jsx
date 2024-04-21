// Importing necessary dependencies
import { useLoaderData } from "react-router-dom"; // A hook from React Router to access the loader data of the current route
import axios from "axios"; // A library for making HTTP requests
import AdminNavbar from "../components/AdminNavbar"; // A component for the admin navigation bar
import QuestionCard from "../components/QuestionCard"; // A component for displaying a question card

// Defining the HomeAdmin component
function HomeAdmin() {
  const questions = useLoaderData(); // Using the useLoaderData hook to get the loader data of the current route, which are the questions in this case
  return (
    <div className="homeAdmin-page">
      {/* Rendering the admin navigation bar */}
      <AdminNavbar />
      <div className="questions-element">
        {/* Mapping through the questions and rendering a QuestionCard component for each question */}
        {questions.map((question) => {
          return <QuestionCard key={question.id} question={question} />;
        })}
      </div>
    </div>
  );
}

// Defining the load function for this route
// Making a GET request to the API to get the questions
export const load = async () => {
  try {
    const questions = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/questions`
    );
    return questions.data; // Returning the question data
  } catch (error) {
    console.error(error); // If an error occurs, log it to the console
    return []; // And return an empty array
  }
};
export default HomeAdmin;

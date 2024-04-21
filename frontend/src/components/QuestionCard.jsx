// Importing necessary dependencies
import { Link, useRevalidator } from "react-router-dom"; // A component for creating links and a hook for revalidating data from React Router
import axios from "axios"; // A library for making HTTP requests
import PropTypes from "prop-types"; // A library for type checking props

// Defining the QuestionCard component
function QuestionCard({ question }) {
  const revalidator = useRevalidator(); // Using the useRevalidator hook to get a revalidator function

  // Defining a function to handle deleting a question
  const handleDeleteQuestion = async () => {
    try {
      // Making a DELETE request to the API to delete the question
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions/${question.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Sending the token from local storage in the headers
        }
      );
      revalidator.revalidate(); // Revalidating the data after the question is deleted
    } catch (error) {
      console.error(error); // If an error occurs, log it
    }
  };

  // The component returns a div containing a delete button and a link to the question
  return (
    <div className="question-space">
      <div className="butCard-cont">
        <div className="button-card-container">
          <button
            type="button"
            className="button-card"
            onClick={handleDeleteQuestion} // The delete button calls handleDeleteQuestion when clicked
          >
            <img src="/close-button.png" alt="supprimer" />
          </button>
        </div>
      </div>
      <div className="quest-cont">
        {/* The link leads to the modify page for the question */}
        <Link to={`/questions-admin/modify/${question.id}`}>
          <div className="question-card-container">
            {/* The link displays the question content */}
            <div className="question-card">{question.content}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

// Type checking the props of the QuestionCard component
QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired, // The question object must have a number id
    content: PropTypes.string.isRequired, // The question object must have a string content
  }).isRequired, // The question prop is required
};

export default QuestionCard;
// TODO: Add a modal to confirm the deletion of a question
// TODO: Change the system by adding a put and delete button in the QuestionCard component?

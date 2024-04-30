// Importing necessary libraries and components
import PropTypes from "prop-types";
import axios from "axios";

// Function component for adding answers
function AnswersForm({ réponse, questionId, setAnswers }) {
  // Storing the questionId in a local variable
  const questId = questionId;

  // Function to handle the creation of an answer
  const handleCreateAnswer = async (event) => {
    event.preventDefault();

    // Creating an object for the new answer
    const answerToCreate = {
      contentAnswer: event.target.contentAnswer.value,
      isTheRightAnswer: event.target.isTheRightAnswer.checked,
      question_id: questId,
    };

    // Making a POST request to create a new answer
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/answers`,
        answerToCreate,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // If the response status is 201, add the new answer to the answers state
      if (response.status === 201) {
        setAnswers((prevAnswers) => [...prevAnswers, answerToCreate]);
      } else {
        console.error("Error creating answers: ", response);
      }
    } catch (error) {
      console.error(error); // TODO replace with toastify popups
    }
  };

  // Rendering the component
  return (
    <form onSubmit={handleCreateAnswer}>
      <div className="answer-cont">
        <label htmlFor="contentAnswer">Réponse {réponse} </label>
        <input
          className="input-ans"
          type="text"
          name="contentAnswer"
          placeholder=" Réponse à ajouter"
          required
        />
        <div className="checkbox">
          <input type="checkbox" name="isTheRightAnswer" />
          C'est la bonne réponse
        </div>
      </div>
      <div className="but-mess-add-cont">
        <button className="button-add" type="submit">
          Ajouter
        </button>
      </div>
    </form>
  );
}

// Defining the prop types for the component
AnswersForm.propTypes = {
  réponse: PropTypes.number.isRequired,
  questionId: PropTypes.number.isRequired,
  setAnswers: PropTypes.func.isRequired,
};

// Exporting the component
export default AnswersForm;

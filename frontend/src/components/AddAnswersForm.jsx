// Importing necessary libraries and components
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

// Function component for adding answers
function AnswersForm({ réponse, questionId, setAnswers }) {
  // Storing the questionId in a local variable
  const questId = questionId;

  // State for the success message
  const [messCorrect, setMessCorrect] = useState("");
  // State for the success status
  const [isOk, setIsOk] = useState(false);
  // State for the error message
  const [messError, setMessError] = useState("");
  // State for the error status
  const [isNotOk, setIsNotOk] = useState(false);

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
        setIsOk(true);
        setMessCorrect("Création réussie");
        // Make the success message disappear after 5 seconds
        setTimeout(() => {
          setIsOk(false);
          setMessCorrect("");
        }, 5000);
      } else {
        console.error("Error creating answers: ", response);
        setIsNotOk(true);
        setMessError("Erreur lors de la création");

        setTimeout(() => {
          setIsNotOk(false);
          setMessError("");
        }, 5000);
      }
    } catch (error) {
      console.error(error); // TODO replace with toastify popups
    }
  };

  // Rendering the component
  return (
    <form className="add" onSubmit={handleCreateAnswer}>
      <div className="answer-cont">
        <label htmlFor="contentAnswer">Réponse {réponse} </label>
        <textarea
          className="input-ans"
          type="text"
          name="contentAnswer"
          placeholder=" Réponse à ajouter"
          required
        />
        <div className="checkbox">
          <input type="checkbox" name="isTheRightAnswer" />
          <p>C'est la bonne réponse</p>
        </div>
      </div>
      <div className="but-mess-add-cont">
        <button className="button-add" type="submit">
          Ajouter
        </button>
        {isOk && <p className="messCo"> {messCorrect}</p>}
        {isNotOk && <p className="messEr"> {messError}</p>}
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

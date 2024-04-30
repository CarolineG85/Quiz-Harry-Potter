// Importing the PropTypes library, which is used for typechecking in React.
import PropTypes from "prop-types";
// Importing the axios library, which is a promise-based HTTP client for the browser and Node.js.
import axios from "axios";
// Importing the useState hook from React.

import { useState } from "react";
// ModifyAnswer is a component that allows the user to modify an answer.
// It takes as props the answer number, the answer content, a boolean indicating if the answer is correct, the answer id and the question id.
function ModifyAnswer({
  numéro, // The number of the answer
  answerContent, // The content of the answer
  isRight, // Boolean indicating if the answer is correct
  answerId, // The id of the answer
  questionId, // The id of the question
}) {
  // State for the answer to modify
  const [answerModify, setAnswerModify] = useState({
    contentAnswer: answerContent,
    isTheRightAnswer: isRight,
    question_id: questionId,
  });

  // State for the success message
  const [messCorrect, setMessCorrect] = useState("");
  // State for the success status
  const [isOk, setIsOk] = useState(false);
  // State for the error message
  const [messError, setMessError] = useState("");
  // State for the error status
  const [isNotOk, setIsNotOk] = useState(false);

  // Function to handle the answer modification
  const handleAnsEdit = async (event) => {
    event.preventDefault();
    // Create a new object to store the updated answer
    const answerToUpdate = {
      contentAnswer: event.target.contentAnswer.value,
      isTheRightAnswer: event.target.isTheRightAnswer.checked,
      question_id: questionId,
    };

    try {
      // Send a PUT request to the server to update the answer
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/answers/${answerId}`,
        answerToUpdate,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // If the request is successful, update the state with the new answer and display a success message
      if (response.status === 200) {
        setAnswerModify(answerToUpdate);
        setMessCorrect("Modification réussie");
        setIsOk(true);
      } else {
        // If the request fails, display an error message
        setIsNotOk(true); // TODO replace with popups
        setMessError("Erreur lors de la modification");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // The component returns a form that allows the user to modify the answer
  // The form contains a textarea to enter the answer content and a checkbox to indicate if the answer is correct
  // Each answer also contains a button to submit the form (that's the only way I've found to make it work with the PUT request)
  return (
    <form className="modify" onSubmit={handleAnsEdit}>
      <div className="answer">
        <label htmlFor="contentAnswer-mod">Réponse {numéro}</label>
        <textarea
          className="input-ans-mod"
          type="text"
          name="contentAnswer"
          maxLength="100"
          defaultValue={
            answerModify ? answerModify.contentAnswer : answerContent
          } // The content of the answer by default
        />
        <div className="checkbox-mod">
          <input
            type="checkbox"
            name="isTheRightAnswer"
            defaultChecked={
              answerModify ? answerModify.isTheRightAnswer : isRight
            } // The correct answer by default
          />
          <p> C'est la bonne réponse</p>
        </div>
      </div>
      <div className="but-mess-mod-cont">
        <button className="button-modify" type="submit">
          Modifier
        </button>
        {isOk && <p className="messCo"> {messCorrect}</p>}
        {isNotOk && <p className="messEr"> {messError}</p>}
      </div>
    </form>
  );
}

// PropTypes for the ModifyAnswer component
ModifyAnswer.propTypes = {
  numéro: PropTypes.number.isRequired,
  answerContent: PropTypes.string.isRequired,
  isRight: PropTypes.number.isRequired,
  answerId: PropTypes.number.isRequired,
  questionId: PropTypes.number.isRequired,
};

export default ModifyAnswer;

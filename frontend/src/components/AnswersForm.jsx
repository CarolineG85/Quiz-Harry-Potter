import PropTypes from "prop-types";
// import { useState } from "react";
import axios from "axios";
// add props answers
function AnswersForm({ réponse, questionId, setAnswers }) {
  const questId = questionId;
  // console.log("id", questId);
  const handleCreate = async (event) => {
    event.preventDefault();

    const answerToCreate = {
      contentAnswer: event.target.contentAnswer.value,
      isTheRightAnswer: event.target.isTheRightAnswer.checked,
      question_id: questId,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/answers`,
        answerToCreate,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 201) {
        setAnswers(answerToCreate);
        // console.log("réponses ajoutées: ", answerToCreate);
      } else {
        console.error("Error creating answers: ", response);
      }
    } catch (error) {
      console.error(error); // TODO remplacer par des popups avec toastify
    }
  };

  return (
    <form onSubmit={handleCreate}>
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
    </form>
  );
}

AnswersForm.propTypes = {
  réponse: PropTypes.number.isRequired,
  questionId: PropTypes.number.isRequired,
  setAnswers: PropTypes.func.isRequired,
  // answers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnswersForm;
// TODO: axios post en obtenant question_id depuis addFormQuestions; garder target value, un bouton pour ajouter chaque réponse? (pas très ux)
// changer route post comme read? mais toujours pb de question_id

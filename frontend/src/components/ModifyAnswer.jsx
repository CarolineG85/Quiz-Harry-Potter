import PropTypes from "prop-types";
import axios from "axios";

import { useState } from "react";

function ModifyAnswer({
  numéro,
  answerContent,
  isRight,
  answerId,
  questionId,
}) {
  const [answerModify, setAnswerModify] = useState({
    contentAnswer: answerContent,
    isTheRightAnswer: isRight,
    question_id: questionId,
  });
  const [messCorrect, setMessCorrect] = useState("");
  const [isOk, setIsOk] = useState(false);
  const [messError, setMessError] = useState("");
  const [isNotOk, setIsNotOk] = useState(false);

  const handleAnsEdit = async (event) => {
    event.preventDefault();
    const answerToUpdate = {
      contentAnswer: event.target.contentAnswer.value,
      isTheRightAnswer: event.target.isTheRightAnswer.checked,
      question_id: questionId,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/answers/${answerId}`,
        answerToUpdate,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        setAnswerModify(answerToUpdate);
        setMessCorrect("Modification réussie");
        setIsOk(true);
      } else {
        setIsNotOk(true); // TODO remplacer par des popups
        setMessError("Erreur lors de la modification");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          }
        />
        <div className="checkbox-mod">
          <input
            type="checkbox"
            name="isTheRightAnswer"
            defaultChecked={
              answerModify ? answerModify.isTheRightAnswer : isRight
            }
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

ModifyAnswer.propTypes = {
  numéro: PropTypes.number.isRequired,
  answerContent: PropTypes.string.isRequired,
  isRight: PropTypes.number.isRequired,
  answerId: PropTypes.number.isRequired,
  questionId: PropTypes.number.isRequired,
};
export default ModifyAnswer;
// see usestate to put answers in an array like question.jsx...

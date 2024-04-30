import PropTypes from "prop-types";

function ModifyAnswer({ numéro, answerContent, isRight }) {
  return (
    <div className="modify">
      <div className="answer">
        <label htmlFor="contentAnswer-mod">Réponse {numéro}</label>
        <input
          className="input-ans-mod"
          type="text"
          name="contentAnswer"
          defaultValue={answerContent}
        />
        <div className="checkbox-mod">
          <input
            type="checkbox"
            name="isTheRightAnswer"
            value="true"
            defaultChecked={isRight}
          />
          C'est la bonne réponse
        </div>
      </div>
    </div>
  );
}

ModifyAnswer.propTypes = {
  numéro: PropTypes.number.isRequired,
  answerContent: PropTypes.string.isRequired,
  isRight: PropTypes.number.isRequired,
};
export default ModifyAnswer;
// see usestate to put answers in an array like question.jsx...

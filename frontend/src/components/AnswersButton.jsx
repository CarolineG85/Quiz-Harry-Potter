import PropTypes from "prop-types";

function AnswersButton({ contentAnswer }) {
  return (
    <div className="ansbut-container">
      <button className="ansbutton" type="button">
        {contentAnswer}
        {/* {isRight ? "✅" : "❌"} */}
      </button>
    </div>
  );
}

AnswersButton.propTypes = {
  contentAnswer: PropTypes.string.isRequired,
};

export default AnswersButton;
// TODO: style, isRight with onClick and score system
// isRight props and  isRight: PropTypes.bool.isRequired,

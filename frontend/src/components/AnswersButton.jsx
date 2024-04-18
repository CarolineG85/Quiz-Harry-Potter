import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { ScoreContext } from "../contexts/ScoreContext";

function AnswersButton({
  contentAnswer,
  result,
  clickedButtons,
  setClickedButtons,
}) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const { score, setScore } = useContext(ScoreContext);

  const handleClick = () => {
    if (clickedButtons.length < 1) {
      setClickedButtons([...clickedButtons, contentAnswer]);
      if (result === 1) {
        setScore(score + 1);
        setIsCorrect(true);
      } else if (result === 0) {
        setScore(score);
        setIsWrong(true);
      }
    }
  };

  return (
    <div className="ansbut-container">
      <button
        className="ansbutton"
        type="button"
        onClick={handleClick}
        disabled={clickedButtons.length > 0}
      >
        {contentAnswer}
        {isCorrect && "✅"}
        {isWrong && "❌"}
      </button>
    </div>
  );
}

AnswersButton.propTypes = {
  contentAnswer: PropTypes.string.isRequired,
  result: PropTypes.number.isRequired,

  clickedButtons: PropTypes.arrayOf(PropTypes.string).isRequired,
  setClickedButtons: PropTypes.func.isRequired,
};

export default AnswersButton;
// TODO: style

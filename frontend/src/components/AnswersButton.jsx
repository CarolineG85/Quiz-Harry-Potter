import { useState } from "react";
import PropTypes from "prop-types";

function AnswersButton({
  contentAnswer,
  result,
  setPoint,
  point,
  clickedButtons,
  setClickedButtons,
}) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const handleClick = () => {
    if (clickedButtons.length < 1) {
      setClickedButtons([...clickedButtons, contentAnswer]);
      if (result === 1) {
        setPoint(point + 1);
        setIsCorrect(true);
      } else if (result === 0) {
        setPoint(point);
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
  setPoint: PropTypes.func.isRequired,
  point: PropTypes.number.isRequired,
  clickedButtons: PropTypes.arrayOf(PropTypes.string).isRequired,
  setClickedButtons: PropTypes.func.isRequired,
};

export default AnswersButton;
// TODO: style

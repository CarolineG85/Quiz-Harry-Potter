import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { ScoreContext } from "../contexts/ScoreContext";

// AnswersButton is a component that displays an answer button for a quiz question.
// It takes the following props:
// - contentAnswer: The text of the answer.
// - result: A number indicating whether the answer is correct (1) or not (0).
// - clickedButtons: An array of the answers that have been clicked.
// - setClickedButtons: A function to update the clickedButtons array.
function AnswersButton({
  contentAnswer,
  result,
  clickedButtons,
  setClickedButtons,
}) {
  // isCorrect is a state variable that is true if the answer is correct and has been clicked.
  const [isCorrect, setIsCorrect] = useState(false);
  // isWrong is a state variable that is true if the answer is incorrect and has been clicked.
  const [isWrong, setIsWrong] = useState(false);
  // score and setScore are the current score and a function to update it, from the ScoreContext.
  const { score, setScore } = useContext(ScoreContext);

  // handleClick is a function that is called when the answer button is clicked.
  // It updates clickedButtons and score, and sets isCorrect or isWrong based on whether the answer is correct.
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

  // The component renders a button with the answer text.
  // If the answer has been clicked and is correct, it displays a check mark.
  // If the answer has been clicked and is incorrect, it displays a cross.
  // The button is disabled after an answer has been clicked.
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

// PropTypes are used to validate the types of the props.
AnswersButton.propTypes = {
  contentAnswer: PropTypes.string.isRequired,
  result: PropTypes.number.isRequired,
  clickedButtons: PropTypes.arrayOf(PropTypes.string).isRequired,
  setClickedButtons: PropTypes.func.isRequired,
};

export default AnswersButton;

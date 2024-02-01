import { Link, useRevalidator } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

function QuestionCard({ question }) {
  const revalidator = useRevalidator();

  const handleDeleteQuestion = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions/${question.id}`
      );
      revalidator.revalidate();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="question-space">
      <div className="button-card-container">
        <button
          type="button"
          className="button-card"
          onClick={handleDeleteQuestion}
        >
          <img src="/close-button.png" alt="annuler" />
        </button>
      </div>
      <div className="question-card">
        <Link to={`/questions-admin/modify/${question.id}`}>
          {question.content}
        </Link>
      </div>
    </div>
  );
}
QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};
export default QuestionCard;

import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ScoreContext } from "../contexts/ScoreContext";

import AnswersButton from "../components/AnswersButton";

function Question() {
  const [question, setQuestion] = useState([]);
  const { id } = useParams();

  const [answers, setAnswers] = useState([]);

  const [clickedButtons, setClickedButtons] = useState([]);
  const [prevId, setPrevId] = useState(null);
  const { resetScore } = useContext(ScoreContext);

  useEffect(() => {
    resetScore();
  }, []);

  useEffect(() => {
    if (id !== prevId) {
      setClickedButtons([]);
      setPrevId(id);
    }
  }, [id, prevId]);

  const getQuestion = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions/${id}`
      );
      setQuestion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAnswers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/answers-question/${id}`
      );
      setAnswers(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getQuestion();
    getAnswers();
  }, [id]);

  return (
    <div className="question-page-container">
      <div className="question-answer-container">{question.content}</div>
      <div className="answers">
        {answers.map((answer) => {
          return (
            <AnswersButton
              key={answer.id}
              contentAnswer={answer.contentAnswer}
              result={answer.isTheRightAnswer}
              clickedButtons={clickedButtons}
              setClickedButtons={setClickedButtons}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Question;

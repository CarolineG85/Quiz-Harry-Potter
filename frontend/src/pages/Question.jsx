import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Question() {
  const [question, setQuestion] = useState([]);
  const { id } = useParams();
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

  useEffect(() => {
    getQuestion();
  }, [id]);

  return (
    <div className="question-page-container">
      <div className="question-answer-container">{question.content}</div>
    </div>
  );
}

export default Question;

// TODO récup id questions et mettre dans un tableau pour récupérer l'index

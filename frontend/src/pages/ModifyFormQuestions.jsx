import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import ModifyAnswer from "../components/ModifyAnswer";
// TODO add bearer token to the request and create a component to handle each answer...
function ModifyFormQuestions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState();
  const [setAnswerModify] = useState([]); // answerModify,
  const [answers, setAnswers] = useState([]);

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
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/answers-question/${id}`
      );
      setAnswers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestion();
    getAnswers();
  }, [id]);

  const handleEdit = async (event) => {
    event.preventDefault();

    const questionToUpdate = {
      content: event.target.content.value,
    };
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions/${id}`,
        questionToUpdate,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setQuestion(questionToUpdate);
      }
    } catch (error) {
      console.error(error);
      // TODO remplacer par des popups avec toastify
    }

    const answerToUpdate = {
      contentAnswer: event.target.contentAnswer.value,
      isTheRightAnswer: event.target.isTheRightAnswer.checked,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/answers/${id}`,
        answerToUpdate,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        setAnswerModify(answerToUpdate);
        setTimeout(() => {
          navigate("/home-admin");
        }, 1000);
      } else {
        // alert("Erreur lors de la modification"); // TODO remplacer par des popups
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-modify-page">
      <div className="button-home-container">
        <Link to="/home-admin" className="home-admin">
          <button className="button-homeAd" type="button">
            Espace Administrateur
          </button>
        </Link>
      </div>
      <form className="modify-form" onSubmit={handleEdit}>
        <div className="modify-question">
          <label htmlFor="content">Question</label>
          <textarea
            name="content"
            maxLength="255"
            placeholder="Question à modifier"
            required
            defaultValue={question && question.content}
          />
        </div>
        <div className="modify-answers">
          <h3>Réponses</h3>
          <div className="modify-ans-grid">
            {answers.map((answer, index) => {
              return (
                <ModifyAnswer
                  key={answer.id}
                  numéro={index + 1}
                  answerContent={answer.contentAnswer}
                  isRight={answer.isTheRightAnswer}
                />
              );
            })}
          </div>
        </div>
        <div className="button-modify-container">
          <button className="button-modify" type="submit">
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModifyFormQuestions;

// TODO rajouter default value dans les input

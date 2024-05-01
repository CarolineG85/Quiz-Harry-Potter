import { Link, useParams } from "react-router-dom"; // Importing necessary dependencies, useParams is a hook from React Router to access the parameters of the current route
import axios from "axios"; // A library for making HTTP requests
import { useState, useEffect } from "react"; // React hooks for managing state and side effects

import ModifyAnswer from "../components/ModifyAnswer"; // Component for modifying an answer

// ModifyFormQuestions is a component that allows the user to modify a question and its answers.
// It fetches the question and its answers from the server and displays a form for modifying them.
function ModifyFormQuestions() {
  // Getting the id parameter from the URL
  const { id } = useParams();
  // State for the question and its id
  const [question, setQuestion] = useState();
  const [questionId, setQuestionId] = useState();
  // State to get the answers
  const [answers, setAnswers] = useState([]);
  // State for the success message
  const [messCorrect, setMessCorrect] = useState("");
  // State for the success status
  const [isOk, setIsOk] = useState(false);
  // State for the error message
  const [messError, setMessError] = useState("");
  // State for the error status
  const [isNotOk, setIsNotOk] = useState(false);

  // Function for fetching the question from the server
  const getQuestion = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions/${id}`
      );
      setQuestion(response.data);
      setQuestionId(response.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  // Function for fetching the answers from the server
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

  // Using the useEffect hook to fetch the question and answers when the component mounts
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
        setMessCorrect("Modification réussie");
        setIsOk(true);
        // Make the success message disappear after 5 seconds
        setTimeout(() => {
          setIsOk(false);
          setMessCorrect("");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      setIsNotOk(true); // TODO replace with popups
      setMessError("Erreur lors de la modification");
      setTimeout(() => {
        setIsNotOk(false);
        setMessError("");
      }, 5000);
      // TODO remplacer par des popups avec toastify
    }
  };

  // The component returns a form for modifying the question and a list of ModifyAnswer components for modifying the answers
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
          {isOk && <p className="messCo">{messCorrect}</p>}
          {isNotOk && <p className="messEr">{messError}</p>}
        </div>
        <div className="button-modify-container">
          <button className="button-modify" type="submit">
            Modifier
          </button>
        </div>
      </form>
      <div className="modify-answers">
        <div className="modify-ans-grid">
          {answers.map((answer, index) => {
            return (
              <ModifyAnswer
                key={answer.id}
                numéro={index + 1}
                answerContent={answer.contentAnswer}
                isRight={answer.isTheRightAnswer}
                answerId={answer.id}
                questionId={questionId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ModifyFormQuestions;

// Importing necessary libraries and components
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AddAnswersForm from "../components/AddAnswersForm";

// Function component for adding questions
function AddFormQuestions() {
  // State variables for the question, questionId, answers, a boolean to check if the add button is clicked and state to prevent success or error
  const [question, setQuestion] = useState();
  const [questionId, setQuestionId] = useState();
  const [answers, setAnswers] = useState([]);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [messCorrect, setMessCorrect] = useState("");
  const [messError, setMessError] = useState("");
  const [isOk, setIsOk] = useState(false);
  const [isNotOk, setIsNotOk] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  // Redirect to homeAdmin when 4 answers have been added
  useEffect(() => {
    if (answers.length === 4) {
      setTimeout(() => {
        navigate("/home-admin");
      }, 2000);
    }
  }, [answers, navigate]);

  // Function to handle the creation of a question
  const handleCreateQuest = async (event) => {
    event.preventDefault();
    setIsAddClicked(true);
    const questionToCreate = {
      content: event.target.content.value,
    };

    // Making a POST request to create a new question
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions`,
        questionToCreate,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 201) {
        setQuestion(questionToCreate);
        setQuestionId(response.data.insertId.insertId);
        setIsOk(true);
        setMessCorrect("Création réussie");
        // Make the success message disappear after 5 seconds
        setTimeout(() => {
          setIsOk(false);
          setMessCorrect("");
        }, 5000);
      } else {
        setIsNotOk(true);
        setMessError("Erreur lors de la création");
        console.error("Error creating question: ", response);
        setTimeout(() => {
          setIsNotOk(false);
          setMessError("");
        }, 5000);
      }
    } catch (error) {
      console.error(error); // TODO replace with toastify popups
    }
  };

  // Rendering the component
  return (
    <div className="form-add-page">
      <div className="button-home-container">
        <Link to="/home-admin" className="home-admin">
          <button className="button-homeAd" type="button">
            Espace administrateur
          </button>
        </Link>
      </div>
      <form className="add-form" onSubmit={handleCreateQuest}>
        <div className="add-question">
          <label htmlFor="content">Question</label>
          <textarea
            name="content"
            maxLength="255"
            placeholder="Question à ajouter"
            required
            value={question && question.content}
          />
          {isOk && <p className="messCo">{messCorrect}</p>}
          {isNotOk && <p className="messEr">{messError}</p>}
        </div>

        <div className="button-add-container">
          <button className="button-add" type="submit">
            Ajouter
          </button>
          <div
            className={isAddClicked ? "info-question-none" : "info-question"}
          >
            <p>
              Cliquez sur "Ajouter" une fois la question écrite <br /> puis
              écrivez une par une quatre suggestions de réponses. <br /> Celle
              qui sera cochée sera la bonne réponse du quiz. <br />
              Si besoin, allez modifier cette nouvelle question <br />
              et ses réponses en retournant sur l'espace administrateur.
            </p>
          </div>
        </div>
      </form>
      <div className="answers">
        <div className="add-ans-grid">
          {/* Displaying AddAnswersForm components based on the length of the answers array, when the answer button to submit isclicked, another answer form is displayed... */}
          {isAddClicked && answers.length >= 0 && (
            <AddAnswersForm
              réponse={1}
              questionId={questionId}
              setAnswers={setAnswers}
            />
          )}
          {isAddClicked && answers.length >= 1 && (
            <AddAnswersForm
              réponse={2}
              questionId={questionId}
              setAnswers={setAnswers}
            />
          )}
          {isAddClicked && answers.length >= 2 && (
            <AddAnswersForm
              réponse={3}
              questionId={questionId}
              setAnswers={setAnswers}
            />
          )}
          {isAddClicked && answers.length >= 3 && (
            <AddAnswersForm
              réponse={4}
              questionId={questionId}
              setAnswers={setAnswers}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Exporting the component
export default AddFormQuestions;

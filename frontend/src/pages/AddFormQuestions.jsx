import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import AnswersForm from "../components/AnswersForm";

function AddFormQuestions() {
  const [question, setQuestion] = useState();
  const [questionId] = useState(); // add setQuestionId
  const [answers, setAnswers] = useState([]);

  const handleCreate = async (event) => {
    event.preventDefault();
    const questionToCreate = {
      content: event.target.content.value,
    };
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
        // setQuestionId(response.data.insertId.insertId);
        // console.log(
        //   "id de la question créée: ",
        //   response.data.insertId.insertId
        // );
      } else {
        console.error("Error creating question: ", response);
      }
    } catch (error) {
      console.error(error); // TODO remplacer par des popups avec toastify
    }
  };
  return (
    <div className="form-add-page">
      <div className="button-home-container">
        <Link to="/home-admin" className="home-admin">
          <button className="button-homeAd" type="button">
            Espace Administrateur
          </button>
        </Link>
      </div>
      <form className="add-form" onSubmit={handleCreate}>
        <div className="add-question">
          <label htmlFor="content">Question</label>
          <textarea
            name="content"
            maxLength="255"
            placeholder="Question à ajouter"
            required
            value={question && question.content}
          />
        </div>
        <div className="answers">
          <h3>Réponses</h3>

          <AnswersForm
            réponse={1}
            questionId={questionId}
            setAnswers={setAnswers}
            answers={answers}
          />
          {/* <AnswersForm
            réponse={2}
            questionId={questionId}
            setAnswers={setAnswers}
            answers={answers}
          />
          <AnswersForm
            réponse={3}
            questionId={questionId}
            setAnswers={setAnswers}
            answers={answers}
          />
          <AnswersForm
            réponse={4}
            questionId={questionId}
            setAnswers={setAnswers}
            answers={answers}
          /> */}
        </div>
        <div className="button-add-container">
          <button className="button-add" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFormQuestions;
// TODO: trouver un moyen de récupérer l'id de la question créée pour l'envoyer à la création des réponses, garder composants comme ça ou revenir à ma logique d'avant?

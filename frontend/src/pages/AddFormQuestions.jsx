import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function AddFormQuestions() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState();

  const handleCreate = async (event) => {
    event.preventDefault();
    const questionToCreate = {
      content: event.target.content.value,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions`,
        questionToCreate
      ); // TODO add bearer token to the request
      if (response.status === 201) {
        setQuestion(questionToCreate);
        setTimeout(() => {
          navigate("/home-admin");
        }, 1000);
      } else {
        console.error("Error creating question: ", response);
      }
    } catch (error) {
      console.error(error);
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
            maxLength="500"
            placeholder="Question à ajouter"
            required
            value={question && question.content}
          />
        </div>
        {/* <div className="add-answers">
          <h3>Réponses</h3>
          <div className="add-raw-one">
            <div className="each-answer">
              <label htmlFor="contentAnswer">Réponse 1</label>
              <input
                className="input-ans"
                type="text"
                name="contentAnswer"
                defaultValue={answer1 && answer1.contentAnswer}
              />
              <div className="checkbox">
                <input type="checkbox" name="isTheRightAnswer" value={1} />
                C'est la bonne réponse
              </div>
            </div>
            <div className="each-answer">
              <label htmlFor="contentAnswer">Réponse 2</label>
              <input
                className="input-ans"
                type="text"
                name="contentAnswer"
                defaultValue={answer2 && answer2.contentAnswer}
              />
              <div className="checkbox">
                <input type="checkbox" name="isTheRightAnswer" value={1} />
                C'est la bonne réponse
              </div>
            </div>
          </div>
          <div className="add-raw-two">
            <div className="each-answer">
              <label htmlFor="contentAnswer">Réponse 3</label>
              <input
                className="input-ans"
                type="text"
                name="contentAnswer"
                defaultValue={answer3 && answer3.contentAnswer}
              />
              <div className="checkbox">
                <input type="checkbox" name="isTheRightAnswer" value={1} />
                C'est la bonne réponse
              </div>
            </div>
            <div className="each-answer">
              <label htmlFor="contentAnswer">Réponse 4</label>
              <input
                className="input-ans"
                type="text"
                name="contentAnswer"
                defaultValue={answer4 && answer4.contentAnswer}
              />
              <div className="checkbox">
                <input type="checkbox" name="isTheRightAnswer" value={1} />
                C'est la bonne réponse
              </div>
            </div>
          </div>
        </div> */}
        <div className="button-add-container">
          <button className="button-add" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

// TODO régler le problème des réponses

export default AddFormQuestions;

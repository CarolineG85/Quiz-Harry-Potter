import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function ModifyFormQuestions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState();
  // const [answer1, setAnswer1] = useState();
  // const [answer2, setAnswer2] = useState();
  // const [answer3, setAnswer3] = useState();
  // const [answer4, setAnswer4] = useState();

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

  // const getAnswers = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/answers-question/${id}`
  //     );
  //     setAnswer1(response.data[0]);
  //     setAnswer2(response.data[1]);
  //     setAnswer3(response.data[2]);
  //     setAnswer4(response.data[3]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    getQuestion();
    // getAnswers();
  }, []);

  const handleEdit = async (event) => {
    event.preventDefault();

    const questionToUpdate = {
      content: event.target.content.value,
    };
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions/${id}`,
        questionToUpdate
      );
      if (response.status === 200) {
        setQuestion(questionToUpdate);
        setTimeout(() => {
          navigate("/home-admin");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la modification"); // TODO remplacer par des popups
    }

    // const answerToUpdate = {
    //   contentAnswer: event.target.contentAnswer.value,
    //   isTheRightAnswer: event.target.isTheRightAnswer.checked,
    // };

    // try {
    //   const response = await axios.put(
    //     `${import.meta.env.VITE_BACKEND_URL}/api/answers/${answer1.id}`,
    //     answerToUpdate
    //   );

    //   if (response.status === 200) {
    //     setAnswer1(answerToUpdate);
    //     setAnswer2(answerToUpdate);
    //     setAnswer3(answerToUpdate);
    //     setAnswer4(answerToUpdate);
    //     setTimeout(() => {
    //       navigate("/home-admin");
    //     }, 1000);
    //   } else {
    //     alert("Erreur lors de la modification"); // TODO remplacer par des popups
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
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
            maxLength="500"
            placeholder="Question à modifier"
            required
            defaultValue={question && question.content}
          />
        </div>
        {/* <div className="modify-answers">
          <h3>Réponses</h3>
          <div className="modify-raw-one">
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
          <div className="modify-raw-two">
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

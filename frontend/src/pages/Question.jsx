// Importing necessary dependencies
import { useParams } from "react-router-dom"; // A hook from React Router for accessing the current route parameters
import axios from "axios"; // A library for making HTTP requests
import { useEffect, useState, useContext } from "react"; // Hooks from React for side effects, state, and context
import { ScoreContext } from "../contexts/ScoreContext"; // The ScoreContext for accessing the score state
import AnswersButton from "../components/AnswersButton"; // A component for displaying answer buttons

// Defining the Question component
function Question() {
  const [question, setQuestion] = useState([]); // Using the useState hook to create a state variable for the question and a function to update it
  const { id } = useParams(); // Using the useParams hook to get the id from the current route parameters

  const [answers, setAnswers] = useState([]); // Using the useState hook to create a state variable for the answers and a function to update it

  const [clickedButtons, setClickedButtons] = useState([]); // Using the useState hook to create a state variable for the clicked buttons and a function to update it
  const [prevId, setPrevId] = useState(null); // Using the useState hook to create a state variable for the previous id and a function to update it
  const { resetScore } = useContext(ScoreContext); // Using the useContext hook to get the resetScore function from the ScoreContext

  useEffect(() => {
    // Using the useEffect hook to run a side effect
    resetScore(); // Resetting the score
  }, []); // The side effect does not depend on any state or props

  useEffect(() => {
    // Using the useEffect hook to run a side effect
    if (id !== prevId) {
      // If the id has changed
      setClickedButtons([]); // Resetting the clicked buttons to let the user answer to the next question
      setPrevId(id); // Updating the previous id
    }
  }, [id, prevId]); // The side effect depends on the id and the previous id

  const getQuestion = async () => {
    // Defining a function to get the question from the API
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions/${id}`
      );
      setQuestion(response.data); // Updating the question with the data from the response
    } catch (error) {
      console.error(error); // If an error occurs, log it
    }
  };

  const getAnswers = async () => {
    // Defining a function to get the answers from the API
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/answers-question/${id}`
      );
      const shuffledAnswers = res.data.sort(() => Math.random() - 0.5);
      setAnswers(shuffledAnswers); // Updating the answers with the shuffled array
    } catch (error) {
      console.error(error); // If an error occurs, log it
    }
  };

  useEffect(() => {
    // Using the useEffect hook to run side effects
    getQuestion(); // Getting the question
    getAnswers(); // Getting the answers
  }, [id]); // The side effects depend on the id

  // The component returns a div containing the question and the answer buttons
  return (
    <div className="question-page-container">
      <div className="question-answer-container">{question.content}</div>
      <div className="answers">
        {answers.map((answer) => {
          // Mapping over the answers to create an AnswersButton for each one and passing props
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

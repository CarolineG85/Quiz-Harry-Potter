import { useEffect, useState } from "react";
import { useNavigate, useLoaderData, Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

function App() {
  const navigate = useNavigate();
  const questions = useLoaderData();
  const [questArray, setQuestArray] = useState([]);
  const [index, setIndex] = useState(0);
  const [isQuestEnd, setIsQuestEnd] = useState(false);

  useEffect(() => {
    if (questions) {
      const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
      setQuestArray(shuffledQuestions.slice(0, 10));
    }
  }, [questions]);

  useEffect(() => {
    if (questArray.length > 0 && index < questArray.length) {
      navigate(`/question/${questArray[index].id}`);
    } else if (questArray.length > 0 && index === questArray.length) {
      setIsQuestEnd(true);
    }
  }, [index, navigate, questArray]);

  const handleNextQuest = () => {
    if (index < questArray.length) {
      setIndex((prevIndex) => prevIndex + 1);
      setIsQuestEnd(false);
    }
  };

  return (
    <div className="app-page">
      <div className="app-superposition">
        <AdminNavbar />

        {isQuestEnd ? (
          <Navigate to="/score" />
        ) : (
          <>
            <Outlet />

            <button
              type="button"
              onClick={handleNextQuest}
              className="button-next-quest"
            >
              Question suivante
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export const loadQuestions = async () => {
  try {
    const questions = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/questions`
    );
    return questions.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default App;
// Question is a page represented by the outlet component

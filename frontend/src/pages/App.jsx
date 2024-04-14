import { Outlet, useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import AdminNavbar from "../components/AdminNavbar";
import Score from "../components/Score";

function App() {
  const navigate = useNavigate();
  const questions = useLoaderData();
  const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
  const [questArray] = useState(shuffledQuestions.slice(0, 10));
  const [index, setIndex] = useState(0);
  const [isQuestEnd, setIsQuestEnd] = useState(false);

  useEffect(() => {
    if (index < questArray.length) {
      navigate(`/question/${questArray[index].id}`);
    } else if (index === questArray.length) {
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
          <Score />
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

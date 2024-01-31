import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import AdminNavbar from "../components/AdminNavbar";
import Score from "../components/Score";

function App() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [isQuestEnd, setIsQuestEnd] = useState(false);

  useEffect(() => {
    if (index < 10) {
      navigate(`/question/${index + 1}`);
    } else if (index === 10) {
      setIsQuestEnd(true);
    }
  }, [index, navigate]);

  const handleNextQuest = () => {
    if (index < 10) {
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

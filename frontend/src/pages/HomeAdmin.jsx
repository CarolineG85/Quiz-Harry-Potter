import { useLoaderData } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import QuestionCard from "../components/QuestionCard";
import { AdminContext } from "../components/AdminContext";

function HomeAdmin() {
  const questions = useLoaderData();
  return (
    <AdminContext.Provider>
      <div className="homeAdmin-page">
        <AdminNavbar />
        <div className="questions-element">
          {questions.map((question) => {
            return <QuestionCard key={question.id} question={question} />;
          })}
        </div>
      </div>
    </AdminContext.Provider>
  );
}

export const load = async () => {
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
export default HomeAdmin;

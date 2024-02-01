import { useLoaderData } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import QuestionCard from "../components/QuestionCard";

function HomeAdmin() {
  const questions = useLoaderData();
  return (
    <div className="homeAdmin-page">
      <AdminNavbar />
      <div className="questions-element">
        {questions.map((question) => {
          return <QuestionCard key={question.id} question={question} />;
        })}
      </div>
    </div>
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

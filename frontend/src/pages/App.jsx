import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function App() {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  );
}

export default App;

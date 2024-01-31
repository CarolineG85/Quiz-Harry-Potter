import { Outlet } from "react-router-dom";

function HomeAdmin() {
  return (
    <div>
      <h1>HomeAdmin</h1>
      <Outlet />
    </div>
  );
}

export default HomeAdmin;

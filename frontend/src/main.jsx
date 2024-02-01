import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App, { loadQuestions } from "./pages/App";
import "./styles/index.scss";
import ConnexionAdmin from "./pages/ConnexionAdmin";
import HomeAdmin, { load } from "./pages/HomeAdmin";
import AddFormQuestions from "./pages/AddFormQuestions";
import ModifyFormQuestions from "./pages/ModifyFormQuestions";
import Question from "./pages/Question";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: loadQuestions,
    children: [
      {
        path: "/question/:id",
        element: <Question />,
      },
    ],
  },
  { path: "/connexion", element: <ConnexionAdmin /> },
  {
    path: "/questions-admin",
    element: <AddFormQuestions />,
  },
  {
    path: "/questions-admin/modify/:id",
    element: <ModifyFormQuestions />,
  },

  { path: "/home-admin", element: <HomeAdmin />, loader: load },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

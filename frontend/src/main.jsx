import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App, { loadQuestions } from "./pages/App";
import "./styles/index.scss";

import Question from "./pages/Question";

import { AdminProvider } from "./contexts/AdminContext";
import Score from "./pages/Score";
import { ScoreProvider } from "./contexts/ScoreContext";

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
  { path: "/score", element: <Score /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AdminProvider>
      <ScoreProvider>
        <RouterProvider router={router} />
      </ScoreProvider>
    </AdminProvider>
  </React.StrictMode>
);

// AdminProvider vu qu'on ne peut pas ici englober tout App

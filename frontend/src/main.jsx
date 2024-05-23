import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App, { loadQuestions } from "./pages/App";
import "./styles/index.scss";

import Question from "./pages/Question";

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
    <ScoreProvider>
      <RouterProvider router={router} />
    </ScoreProvider>
  </React.StrictMode>
);

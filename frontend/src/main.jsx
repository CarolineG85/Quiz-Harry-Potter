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
import ProtectedRoute from "./components/ProtectedRoute";
import { AdminProvider } from "./components/AdminContext";

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
    element: (
      <ProtectedRoute>
        <AddFormQuestions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/questions-admin/modify/:id",
    element: (
      <ProtectedRoute>
        <ModifyFormQuestions />
      </ProtectedRoute>
    ),
  },

  {
    path: "/home-admin",
    element: (
      <ProtectedRoute>
        <HomeAdmin />
      </ProtectedRoute>
    ),
    loader: load,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  </React.StrictMode>
);

// AdminProvider vu qu'on ne peut pas ici englober tout App

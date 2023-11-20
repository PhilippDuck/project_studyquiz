import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { RealmProvider } from "./provider/RealmProvider";
import { useRealm } from "../src/provider/RealmProvider.jsx";
import theme from "./Theme/theme.js";
import Games from "./pages/Games/Games.jsx";
import Create from "./pages/Create/Create.jsx";
import Highscores from "./pages/Highscores/Highscores.jsx";
import Profil from "./pages/Profil.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Adminpanel from "./pages/Adminpanel/Adminpanel.jsx";
import Game from "./pages/Game/Game.jsx";
import Log from "./pages/Log/Log.jsx";
import Register from "./pages/Register.jsx";
import ConfrimRegistration from "./pages/ConfirmRegistration.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Impressum from "./pages/Impressum.jsx";

function AdminProtectedRoute({ children }) {
  const app = useRealm();
  const isAdmin = app.currentUser?.customData?.admin;

  if (!isAdmin) {
    return <Navigate to="/" />; // Oder wohin immer Sie nicht-administrative Benutzer umleiten möchten.
  }

  return children;
}

function RegisteredUserProtectedRoute({ children }) {
  const app = useRealm();
  const isRegistered = app.currentUser?.customData?.registered;

  if (!isRegistered) {
    return <Navigate to="/" />; // Oder wohin immer Sie nicht-administrative Benutzer umleiten möchten.
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Navigate to="games" />,
      },
      {
        path: "games",
        element: <Games />,
      },
      {
        path: "games/:id",
        element: <Game />,
      },
      {
        path: "log",
        element: <Log />,
      },
      {
        path: "create",
        element: (
          <RegisteredUserProtectedRoute>
            <Create />
          </RegisteredUserProtectedRoute>
        ),
      },
      {
        path: "highscores",
        element: <Highscores />,
      },
      {
        path: "profil",
        element: <Profil />,
      },
      {
        path: "admin",
        element: (
          <AdminProtectedRoute>
            <Adminpanel />
          </AdminProtectedRoute>
        ),
      },
      { path: "/impressum", element: <Impressum /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "confirmRegistration",
    element: <ConfrimRegistration />,
  },
  {
    path: "resetpassword",
    element: <ResetPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // React Strict Mode enntfernt um doppeltes laden wärend DEV zu stoppen
  <RealmProvider>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </RealmProvider>
);

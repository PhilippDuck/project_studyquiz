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
import Games from "./pages/Games.jsx";
import Create from "./pages/Create.jsx";
import Highscores from "./pages/Highscores.jsx";
import Profil from "./pages/Profil.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Adminpanel from "./pages/Adminpanel.jsx";
import Game from "./pages/Game.jsx";
import Log from "./pages/Log.jsx";

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
    ],
  },
  {
    path: "login",
    element: <Login />,
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

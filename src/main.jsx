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
import theme from "./Theme/theme.js";
import Games from "./pages/Games.jsx";
import Create from "./pages/Create.jsx";
import Highscores from "./pages/Highscores.jsx";
import Profil from "./pages/Profil.jsx";

const router = createBrowserRouter([
  //TODO: PageNotFound hinzufügen
  {
    path: "/",
    element: <App />,
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
        path: "create",
        element: <Create />,
      },
      {
        path: "highscores",
        element: <Highscores />,
      },
      {
        path: "profil",
        element: <Profil />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RealmProvider>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </RealmProvider>
  </React.StrictMode>
);

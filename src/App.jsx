import React, { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import SidebarWithHeader from "./components/SiedebarWithHeader";
import { Outlet } from "react-router-dom";
import { useRealm } from "./provider/RealmProvider";
import { Credentials } from "realm-web";

function App() {
  const app = useRealm();
  const [isLoginComplete, setIsLoginComplete] = useState(false); // Zustand, um den Abschluss des Anmeldevorgangs zu verfolgen

  /**
   * Beim Aufrufen der App wird geprüft ob der Nutzer bereits bekannt ist
   * Wenn ja, dann wird das Token erneuert
   * Wenn Nein, dann wird der Nutzer anonym eingeloggt
   */
  useEffect(() => {
    const callRealmFunction = async () => {
      // Anonym anmelden
      const credentials = Credentials.anonymous();
      if (app.currentUser) {
        try {
          await app.currentUser.refreshAccessToken();
          console.log(" bereits eingeloggt. " + app.currentUser.id);
          //setIsLogged(true);
        } catch (error) {
          console.log("Fehler beim refresh: " + error);
          localStorage.clear();
          return callRealmFunction(); // return hinzugefügt, um Endlosrekursion zu vermeiden
        }
      } else {
        try {
          const user = await app.logIn(credentials);
          console.log("Erfolgreich anonym angemeldet als", user.id);
          //setIsLogged(true);
          // Serverfunktion aufrufen
        } catch (err) {
          console.error("Fehler:", err.message);
        }
      }
      setIsLoginComplete(true); // Setzen Sie diesen Zustand, um anzuzeigen, dass der Login-Vorgang abgeschlossen ist
    };
    callRealmFunction();
  }, [app]);

  if (!isLoginComplete) {
    return <Spinner />; // Zeige Spinner solange der Login-Vorgang noch nicht abgeschlossen ist
  }

  return (
    <>
      <SidebarWithHeader content={<Outlet />} />
    </>
  );
}

export default App;

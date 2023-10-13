import SidebarWithHeader from "./components/SiedebarWithHeader";
import { Outlet } from "react-router-dom";
import { useRealm } from "./provider/RealmProvider";
import { Credentials } from "realm-web";
import { useEffect } from "react";

function App() {
  const app = useRealm();

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
          callRealmFunction();
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
    };
    callRealmFunction();
  }, []);

  return (
    <>
      <SidebarWithHeader content={<Outlet />} />
    </>
  );
}

export default App;

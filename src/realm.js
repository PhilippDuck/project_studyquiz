import { App } from "realm-web";

const REALM_APP_ID = import.meta.env.VITE_APP_ID; // Ersetzen Sie dies durch Ihre Realm App ID

const app = new App({
  id: REALM_APP_ID,
  timeout: 10000,
});

export default app;

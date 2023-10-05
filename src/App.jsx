import SidebarWithHeader from "./components/SiedebarWithHeader";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <SidebarWithHeader content={<Outlet />} />
    </>
  );
}

export default App;

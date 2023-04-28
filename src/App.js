import { Outlet } from "react-router";
import SearchHeader from "./components/SearchHeader";

function App() {
  return (
    <section>
      <SearchHeader />
      <Outlet />
    </section>
  );
}

export default App;

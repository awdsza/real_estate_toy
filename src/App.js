import { Outlet } from "react-router";
import SearchHeader from "./components/header/SearchHeader";

function App() {
  return (
    <section className="my-3 mx-2 ">
      <SearchHeader />
      <div id="detail">
        <Outlet />
      </div>
    </section>
  );
}

export default App;

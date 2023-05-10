import { Outlet } from "react-router";
import SearchHeader from "./components/header/SearchHeader";
import { JusoProvider } from "./context/JusoProvider";
import { HeaderProvider } from "./context/HeaderProvider";
function App() {
  return (
    <section className="my-3 mx-2 ">
      <HeaderProvider>
        <JusoProvider>
          <SearchHeader />
        </JusoProvider>
      </HeaderProvider>
      <div id="detail">
        <Outlet />
      </div>
    </section>
  );
}

export default App;

import { Outlet } from "react-router";
import SearchHeader from "./components/header/SearchHeader";
import { JusoProvider } from "./context/JusoProvider";
import { HeaderProvider } from "./context/HeaderProvider";
import { EstateAPIProvider } from "./context/EstateAPIProvider";
import { CommonProvider } from "./context/CommonProvider";
function App() {
  return (
    <section className="my-3 mx-2 relative">
      <CommonProvider>
        <HeaderProvider>
          <JusoProvider>
            <SearchHeader />
          </JusoProvider>
        </HeaderProvider>
        <EstateAPIProvider>
          <div id="detail">
            <Outlet />
          </div>
        </EstateAPIProvider>
      </CommonProvider>
    </section>
  );
}

export default App;

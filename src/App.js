import { Outlet } from "react-router";
import SearchHeader from "./components/header/SearchHeader";
import { JusoProvider } from "./context/JusoProvider";
import { HeaderProvider } from "./context/HeaderProvider";
import { EstateAPIProvider } from "./context/EstateAPIProvider";
import { CommonProvider } from "./context/CommonProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  return (
    <section className="my-3 mx-2 relative">
      <QueryClientProvider client={queryClient}>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </section>
  );
}

export default App;

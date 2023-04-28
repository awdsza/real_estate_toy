import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Apartments from "./components/Apartments";
import ApartmentDetail from "./components/ApartmentDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found Error!!</div>,
    children: [
      {
        path: "/apartment/list",
        element: <Apartments />,
      },
      {
        path: "/apartment",
        element: <Apartments />,
      },
      {
        index: true,
        element: <Apartments />,
      },
      {
        path: "/apartment/:apartId",
        element: <ApartmentDetail />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

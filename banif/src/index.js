import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./style.js";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Router
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import UserProvider from './contexts/UserProvider.js';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <GlobalStyle />
      <RouterProvider router={router}/>
    </UserProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./Router";
import "./index.css";
import { SessionProvider } from "./context/SessionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionProvider>
      <AppRouter />
    </SessionProvider>
  </React.StrictMode>
);

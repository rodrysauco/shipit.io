import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="w-screen mx-auto h-screen">
      <Routes />
    </div>
  </React.StrictMode>
);

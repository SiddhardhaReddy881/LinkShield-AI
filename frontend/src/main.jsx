import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ReactGA from "react-ga4";

import App from "./App";
import "./index.css";

ReactGA.initialize("G-B8EL4EK03Q");

ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname + window.location.search,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./js/App";
import { FoodProvider } from "./js/FoodContext.js";

const root = ReactDOM.createRoot(document.querySelector(".container"));
root.render(
  <React.StrictMode>
    <FoodProvider>
      <App />
    </FoodProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import store from "./Redux";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import Store from "./Redux/Store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <NextUIProvider>
          <main className="dark text-foreground bg-background ">
            <App />
          </main>
        </NextUIProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

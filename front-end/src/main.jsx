import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.js";
import DataContext from "./util/DataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <DataContext>
      <Provider store={store}>
        <App />
      </Provider>
    </DataContext>
    </BrowserRouter>
  </React.StrictMode>
);

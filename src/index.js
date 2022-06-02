import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "./store/index";

import { AuthContextProvider } from "./context/AuthContext";
import { CategoriesContextProvider } from "./context/CategoriesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthContextProvider>
          <CategoriesContextProvider>
            <App />
          </CategoriesContextProvider>
        </AuthContextProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

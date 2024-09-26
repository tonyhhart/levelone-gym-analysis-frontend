import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import AppContextProvider from "./AppContextProvider";

setDefaultOptions({ locale: ptBR });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

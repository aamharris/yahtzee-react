import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import Game from "./game";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8b0000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Game />
    </ThemeProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

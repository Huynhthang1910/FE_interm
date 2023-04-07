import React from "react";
<<<<<<< HEAD
=======
import ReactDOM from "react-dom";
>>>>>>> origin/minhnha
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
<<<<<<< HEAD
import * as ReactDOMClient from "react-dom/client";

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
=======

function Root() {
  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
>>>>>>> origin/minhnha
reportWebVitals();

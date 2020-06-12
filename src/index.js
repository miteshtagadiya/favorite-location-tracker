import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Home from "./Components/App/Home/Home";
import SignIn from "./Components/App/SignIn/SignIn";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "./Components/App/SignUp/SignUp";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SignUp />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

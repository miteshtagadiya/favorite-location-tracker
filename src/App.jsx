import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { auth } from "./services/firebase";
import Home from "./components/App/Home/Home";
import SignUp from "./components/App/SignUp/SignUp";
import SignIn from "./components/App/SignIn/SignIn";
import { CircularProgress } from "@material-ui/core";

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    ) : (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              this.state.authenticated === true ? (
                <Home {...props} />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/signup"
            render={(props) =>
              this.state.authenticated === false ? (
                <SignUp {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/login"
            render={(props) =>
              this.state.authenticated === false ? (
                <SignIn {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;

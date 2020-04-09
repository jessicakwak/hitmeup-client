import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import Signup from "./Signup";
import "./styles/App.css";

class App extends Component {
  // Methods
  // Render
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/login" component={Login}></Route>
          <Route
            path="/"
            render={props => {
              //if gettting token from the local storage, render chat
              return localStorage.getItem("token") ? (
                <Chat {...props} />
              ) : (
                //otherwise redirect to the login
                <Redirect to="/login" />
              );
            }}
          ></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

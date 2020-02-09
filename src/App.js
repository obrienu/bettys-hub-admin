import React, { Component } from "react";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./components/header/header.component";
import SignIn from "./components/sign.in/signin.component";
import Register from "./components/register/register.component";
import Home from "./pages/admin/admin.component";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/signin" component={SignIn} />
        </Switch>
      </div>
    );
  }
}

export default App;

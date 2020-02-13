import React, { Component } from "react";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/header.component";
import SignIn from "./components/sign.in/signin.component";
import Register from "./components/register/register.component";
import Admin from "./pages/admin/admin.component";
import { getUser } from "./redux/user/user.action";
import { connect } from "react-redux";
import { authSelector } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.props.isAuthenticated ? (
                <Redirect to="/admin" />
              ) : (
                <Redirect to="/auth/signin" />
              )
            }
          />
          <Route
            path="/admin"
            render={() =>
              this.props.isAuthenticated ? (
                <Admin />
              ) : (
                <Redirect to="/auth/signin" />
              )
            }
          />
          <Route
            path="/auth/register"
            render={() =>
              this.props.isAuthenticated ? <Redirect to="/" /> : <Register />
            }
          />
          <Route
            path="/auth/signin"
            render={() =>
              this.props.isAuthenticated ? <Redirect to="/" /> : <SignIn />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: authSelector
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

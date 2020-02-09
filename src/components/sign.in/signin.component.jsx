import React, { Component } from "react";
import "./signin.style.scss";
import Input from "../CustomInput/custom.input.component";
import { connect } from "react-redux";
import { userLogin } from "../../redux/user/user.action";
import image from "../../assets/image/avatar.png";
import {
  errorIdSelector,
  errorMessageSelector
} from "../../redux/errors/error.selector";
import { createStructuredSelector } from "reselect";

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
      error: ""
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      return this.setState({
        error: "Enter All Fields"
      });
    }
    this.props.userLogin({ email, password });
  }

  componentDidUpdate(prevProps) {
    const { errorId, errorMessage } = this.props;
    if (errorId !== prevProps.errorId && errorId === "Login Failed") {
      this.setState({
        error: errorMessage
      });
    }
  }

  render() {
    return (
      <div>
        <div className="RegisterContainer">
          <div className="Register">
            <div className="RegisterName">Sign In</div>
            <div className="RegisterTop">
              <div className="AvaterHead">
                <img className="AvaterHeadImage" src={image} alt="avater" />
              </div>

              <div className="RegisterError">
                {" "}
                {this.state.error ? this.state.error : null}
              </div>
            </div>
            <form onSubmit={this.onSubmit} className="RegisterForm">
              <Input
                label="Email"
                value={this.state.email}
                onChange={this.onChange}
                name="email"
                type="text"
                isRequired={true}
              />

              <Input
                label="password"
                value={this.state.password}
                onChange={this.onChange}
                name="password"
                type="password"
                isRequired={true}
              />

              <input
                style={{ width: "5rem" }}
                type="submit"
                className="btn btn-info ml-5 mt-3"
                value="Sign In"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  errorId: errorIdSelector,
  errorMessage: errorMessageSelector
});

const mapDispatchToProps = dispatch => ({
  userLogin: user => dispatch(userLogin(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

import React, { Component } from "react";
import "./register.style.scss";
import Input from "../CustomInput/custom.input.component";
import { connect } from "react-redux";
import { registerUser } from "../../redux/user/user.action";
import image from "../../assets/image/avatar.png";
import {
  errorIdSelector,
  errorMessageSelector
} from "../../redux/errors/error.selector";
import { createStructuredSelector } from "reselect";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      cpassword: "",
      mobile: 0,
      adminCode: 0,
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

  async onSubmit(event) {
    event.preventDefault();

    const {
      email,
      username,
      password,
      cpassword,
      adminCode,
      mobile
    } = this.state;
    if (
      !email ||
      !username ||
      !password ||
      !cpassword ||
      !adminCode ||
      !mobile
    ) {
      return this.setState({
        error: "Please Enter All Fields"
      });
    } else if (password !== cpassword) {
      return this.setState({
        error: "Please confirm password"
      });
    }
    let user = {
      email,
      username,
      password,
      cpassword,
      adminCode,
      mobile
    };
    await this.props.registerUser(user);
  }

  componentDidUpdate(prevProps) {
    const { errorId, errorMessage } = this.props;
    if (errorId !== prevProps.errorId && errorId === "Registration Failed") {
      this.setState({
        error: errorMessage
      });
    }
  }

  render() {
    return (
      <div className="RegisterContainer">
        <div className="Register">
          <div className="RegisterName">Sign Up</div>
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
              label="username"
              value={this.state.username}
              onChange={this.onChange}
              name="username"
              type="text"
              isRequired={true}
            />
            <Input
              label="mobile"
              value={this.state.mobile}
              onChange={this.onChange}
              name="mobile"
              type="tel"
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
            <Input
              label="cpassword"
              value={this.state.cpassword}
              onChange={this.onChange}
              name="cpassword"
              type="password"
              isRequired={true}
            />
            <Input
              label="adminCode"
              value={this.state.adminCode}
              onChange={this.onChange}
              name="adminCode"
              type="number"
              isRequired={true}
            />
            <input
              style={{ width: "5rem" }}
              type="submit"
              className="btn btn-info ml-5 mt-3"
              value="Sign Up"
            />
          </form>
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
  registerUser: user => dispatch(registerUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

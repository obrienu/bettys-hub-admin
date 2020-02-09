import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.style.scss";
import { userLogout } from "../../redux/user/user.action";
import { userSelector } from "../../redux/user/user.selector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText
} from "reactstrap";

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const signOut = event => {
    event.preventDefault();
    props.userLogout();
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand to="/">Home</NavbarBrand>
        <NavbarText className="mr-auto">
          {" "}
          {props.user ? props.user.username : null}
        </NavbarText>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink className="NavLink" to="/auth/register">
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="NavLink" to="/auth/signin">
                Sign In
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={signOut} className="NavLink" to="#">
                Sign Out
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: userSelector
});

const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(userLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

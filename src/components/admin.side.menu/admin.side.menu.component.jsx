import React from "react";
import "./admin.side.menu.style.scss";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="AdminMenu">
      <li className="AdminMenuLinks">
        <NavLink
          activeClassName="AdminMenuLinkActive"
          className="AdminMenuLink"
          to="/"
        >
          Add Commodity
        </NavLink>
      </li>
      <li className="AdminMenuLinks">
        <NavLink
          activeClassName="AdminMenuLinkActive"
          className="AdminMenuLink"
          to="/update"
        >
          Update Commodity
        </NavLink>
      </li>
      <li className="AdminMenuLinks">
        <NavLink
          activeClassName="AdminMenuLinkActive"
          className="AdminMenuLink"
          to="/addrich"
        >
          Add Longrich Product
        </NavLink>
      </li>
      <li className="AdminMenuLinks">
        <NavLink
          activeClassName="AdminMenuLinkActive"
          className="AdminMenuLink"
          to="/updaterich"
        >
          Update Longrich Product
        </NavLink>
      </li>
    </div>
  );
};

export default AdminMenu;

import React from "react";
import "./admin.side.menu.style.scss";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="AdminMenu">
      <li className="AdminMenuLinks">
        <NavLink
          exact
          activeClassName="AdminMenuLinkActive"
          className="AdminMenuLink"
          to="/admin"
        >
          Seach Item
        </NavLink>
      </li>
      <li className="AdminMenuLinks">
        <NavLink
          activeClassName="AdminMenuLinkActive"
          className="AdminMenuLink"
          to="/admin/addcomm"
        >
          Add Commodity
        </NavLink>
      </li>
      <li className="AdminMenuLinks">
        <NavLink
          activeClassName="AdminMenuLinkActive"
          className="AdminMenuLink"
          to="/admin/addrich"
        >
          Add Rich Product
        </NavLink>
      </li>
    </div>
  );
};

export default AdminMenu;

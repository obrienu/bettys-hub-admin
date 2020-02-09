import React from "react";
import "./admin.style.scss";
import AdminMenu from "../../components/admin.side.menu/admin.side.menu.component";
import AddCommodityPage from "./add.file/addfile.component";
import { Route, Switch } from "react-router-dom";

const AdminPage = ({ match }) => {
  return (
    <div className="AdminPage">
      <div className="AdminPageMenu">
        <AdminMenu />
      </div>
      <div className="AdminPageContent">
        <Switch>
          <Route exact path={`${match.path}`} component={AddCommodityPage} />
        </Switch>
      </div>
    </div>
  );
};

export default AdminPage;

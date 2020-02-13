import React from "react";
import "./admin.style.scss";
import AdminMenu from "../../components/admin.side.menu/admin.side.menu.component";
import AddCommodityPage from "./add.file/addfile.component";
import UpdateCommodityPage from "./update.commodity/update.file.component";
import { Route, Switch, withRouter } from "react-router-dom";
import Homepage from "../admin/homepage/homepage.component";

const AdminPage = ({ match }) => {
  return (
    <div className="AdminPage">
      <div className="AdminPageMenu">
        <AdminMenu />
      </div>
      <div className="AdminPageContent">
        <Switch>
          <Route exact path={`${match.path}`} component={Homepage} />
          <Route
            exact
            path={`${match.path}/addcomm`}
            component={AddCommodityPage}
          />
          <Route
            exact
            path={`${match.path}/update/:shopId/:commId`}
            component={UpdateCommodityPage}
          />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(AdminPage);

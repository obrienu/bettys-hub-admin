import React from "react";
import "./admin.style.scss";
import AdminMenu from "../../components/admin.side.menu/admin.side.menu.component";
import AddCommodityPage from "./add.file/addfile.component";
import AddRichPage from "./add.rich.file/add.rich.file";
import UpdateCommodityPage from "./update.commodity/update.file.component";
import UpdateRichPage from "./update.rich/update.rich.component";
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
          <Route exact path={`${match.path}/addrich`} component={AddRichPage} />
          <Route
            exact
            path={`${match.path}/update/:shopId/:commId`}
            component={UpdateCommodityPage}
          />
          <Route
            exact
            path={`${match.path}/updaterich/:shopId/:commId`}
            component={UpdateRichPage}
          />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(AdminPage);

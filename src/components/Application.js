import React, { useEffect, Fragment } from "react";
import { NotificationContainer } from "react-notifications";
import { Route, Redirect, Switch } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

import PrivateRoute from "./utils/PrivateRoute";
import HomePage from "./home/HomePage";
import Dashboard from "./dashboard/Dashboard";
import LandingPage from "./landing/LandingPage";
import { UserContext } from "../context";
import CompanyRegisterInfo from "./company/company-register-info/CompanyRegisterInfo";
import CompanyDashboard from "./company/company-dashboard/CompanyDashboard";
import Navbar from "./shared/navbar/Navbar";

const App = (props) => {
  const { getUserInfo } = props.actions;
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const [keycloak] = useKeycloak();

  const { user } = props;
  console.log(user);
  const userIsCompanyAdmin = true;
  const userIsAuthenticated = keycloak.authenticated;

  return (
    <Fragment>
      <UserContext.Provider value={user}>
        {userIsAuthenticated && <Navbar />}
        <NotificationContainer />
        <main>
          <Switch>
            <PrivateRoute
              exact
              path="/company-info"
              component={CompanyRegisterInfo}
              hasPermission={userIsAuthenticated && userIsCompanyAdmin}
            />
            <Route exact path="/landing" component={LandingPage} />
            <PrivateRoute
              exact
              path="/home"
              component={HomePage}
              hasPermission={userIsAuthenticated}
            />
            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
              hasPermission={userIsAuthenticated}
            />
            <PrivateRoute
              exact
              path="/"
              render={() => <Redirect to="/home" />}
              hasPermission={userIsAuthenticated}
            />
            <PrivateRoute
              path="/company-dashboard"
              component={CompanyDashboard}
              hasPermission={userIsAuthenticated && userIsCompanyAdmin}
            />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </main>
      </UserContext.Provider>
    </Fragment>
  );
};

export default App;

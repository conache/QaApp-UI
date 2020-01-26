import React, { Fragment, Component } from "react";
import { NotificationContainer } from "react-notifications";
import { Route, Redirect, Switch } from "react-router-dom";
import { pathOr } from "ramda";
import { connect } from "react-redux";

import PrivateRoute from "./utils/PrivateRoute";
import HomePage from "./home/HomePage";
import Dashboard from "./user/dashboard/Dashboard";
import LandingPage from "./landing/LandingPage";
import { UserContext } from "../context";
import CompanyRegisterInfo from "./company/company-register-info/CompanyRegisterInfo";
import Navbar from "./navbar/Navbar";
import LoadingSpinner from "./shared/LoadingSpinner";
import AskQuestion from "./all-questions/AskQuestion";
import { UserProfile } from "../components/utils/UserProfile";
// const ROLES = ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_COMPANY_ADMINISTRATOR'],
class SubApplication extends Component {
  renderPathByRole = () => {
    const {
      userProfile: { profile }
    } = this.props;
    const role = profile.getRole();

    switch (role) {
      case "ROLE_USER":
        return "/dashboard";
      case "ROLE_COMPANY_ADMINISTRATOR":
        return "/dashboard";
      case "ROLE_ADMIN":
        return "/dashboard";
      default:
        return "/landing";
    }
  };

  render() {
    const {
      keycloak,
      userProfile: { loading, profile }
    } = this.props;

    if (loading) {
      return <LoadingSpinner />;
    }

    const userIsCompanyAdmin = true;
    const userIsAuthenticated = keycloak.authenticated;

    return (
      <Fragment>
        <UserContext.Provider value={profile}>
          {userIsAuthenticated && <Navbar />}
          <NotificationContainer />
          <main>
            <Switch>
              <PrivateRoute
                exact
                path="/"
                render={() => <Redirect to={this.renderPathByRole()} />}
                hasPermission={userIsAuthenticated}
              />
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
                path="/ask-question"
                component={AskQuestion}
                hasPermission={userIsAuthenticated}
              />
              <PrivateRoute
                path="/dashboard"
                component={Dashboard}
                hasPermission={userIsAuthenticated}
              />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </main>
        </UserContext.Provider>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: {
      profile: new UserProfile(pathOr({}, ["user", "profile"], state)),
      loading: pathOr(true, ["user", "loading"], state)
    }
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SubApplication);

import React, { Fragment, Component } from "react";

import { withKeycloak } from "@react-keycloak/web";

import { getAuthToken } from '../session';
import LoadingSpinner from "./shared/LoadingSpinner";
import SubApplication from "./SubApplication";

class App extends Component {
  componentWillMount() {
    const {
      actions: { appLoading },
    } = this.props;

    if (!this.hasToken()) {
      appLoading();
    }
  }

  shouldComponentUpdate(nextProps, _) {
    const {
      actions: { getUserInfo },
      loading,
    } = this.props;

    if (loading !== nextProps.loading && this.hasToken()) {
      getUserInfo();
      return true;
    }

    return false;
  }

  hasToken = () => {
    const token = getAuthToken();
    return token !== null && token !== undefined;
  }

  render() {
    const {
      loading,
    } = this.props;

    if (loading) {
      return <LoadingSpinner />;
    }

  
    return <SubApplication {...this.props} />

  }
};

export default withKeycloak(App);

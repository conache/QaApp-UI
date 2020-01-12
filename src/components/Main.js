import { Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import ApplicationContainer from './ApplicationContainer';
import LoadingSpinner from './shared/LoadingSpinner';

class Main extends Component {
  renderApp() {
    return (
      <HashRouter>
        <Route component={ApplicationContainer} />
      </HashRouter>
    );
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return <LoadingSpinner />;
    }
    return [
      this.renderApp()
    ];
  }
}

function mapStateToProps(state) {
  return {
    loading: state.app.appLoading
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

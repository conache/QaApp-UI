import { Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import ApplicationContainer from './ApplicationContainer';
import ErrorsContainer from './ErrorsContainer';

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
      return <div>Loading..</div>;
    }
    return [
      <ErrorsContainer />,
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

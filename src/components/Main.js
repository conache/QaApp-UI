import { Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import ApplicationContainer from './ApplicationContainer';


class Main extends Component {
 
  renderApp() {
    return (
      <Router>
        <Route component={ApplicationContainer} />
      </Router>
      );
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return <div>Loading..</div>;
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

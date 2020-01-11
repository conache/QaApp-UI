import React, { Component } from "react";
import {connect} from 'react-redux';

import ErrorAlert from "./shared/ErrorAlert";
import {removeAppError} from '../ducks/app';
import {pathOr} from 'ramda';

class ErrorsContainer extends Component {
  render() {
    const {errors} = this.props;
    return errors.map(error => <ErrorAlert error={error} />)
  }

  componentDidUpdate() {
    const {errors, removeAppError} = this.props;
    if (errors && errors.length) {
      this.removeTimeoutId = setTimeout(removeAppError, 3000);
    }
  }

  componentWillUnmount() {
    if (this.removeTimeoutId) {
      clearTimeout(this.removeTimeoutId);
    }
  }
}

export default connect(
  (state) => ({
      errors: pathOr([], ['app','appErrors'], state)
  }), 
  {removeAppError}
)(ErrorsContainer);
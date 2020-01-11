import React, { Component } from "react";
import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

class ErrorAlert extends Component {
  render() {
    const errorObj = this.props.error;
    const {message} = errorObj;

    // it displays alerts one over another (fix it)
    return <Snackbar open={true} message={message}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}>
        <MuiAlert variant="standard" severity="error">
          {message}
        </MuiAlert>
      </Snackbar>
  }
}

export default ErrorAlert;
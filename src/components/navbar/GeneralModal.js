import React, { Component } from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';

class GeneralMModal extends Component {
  render() {
    const { children, show, className } = this.props;
    if (!show) {
      return null;
    }
    return ReactDOM.createPortal(
      <div className={classnames('general-modal modal d-flex flex-column align-items-center', className)}>
        {children}
      </div>,
      document.body,
    );
  }
}

export default GeneralMModal;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Sidebar = ({ children, className }) => {
  return (
    <div className={classnames(className, "sidebar-container d-flex flex-column")}>
      {children}
    </div>
  )
}

export default Sidebar;


Sidebar.propTypes = {
  children: PropTypes.node,
};

Sidebar.defaultProps = {
  children: null,
};

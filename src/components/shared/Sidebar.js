import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import HelpMenu from './HelpMenu';

const Sidebar = ({ children, className }) => {
  return (
    <div className="position-relative">
      <div className={classnames(className, "sidebar-container d-flex flex-column")}>
        {children}
      </div>
      <HelpMenu />
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

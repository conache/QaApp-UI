import React, { Fragment } from 'react';
import { Popover, Menu } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export default function GeneralPopover({ children, popoverAnchor, popoverId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Fragment>
      <Typography
        aria-owns={open ? popoverId : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      // onClose={handlePopoverClose}
      >
        {popoverAnchor}
      </Typography>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className="popover-container">
          {children}
        </div>
      </Popover>
    </Fragment>
  );
}

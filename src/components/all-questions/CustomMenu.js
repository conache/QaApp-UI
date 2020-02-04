import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const CustomMenu = props => {
  const { options } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMoreClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const optionsList = options?.filter(option =>
    option.visible === false ? option.visible : true
  );

  if (!optionsList || !optionsList.length) {
    return [];
  }

  return (
    <Fragment>
      <MoreVertIcon
        className="cursor-pointer p-1"
        style={{ color: '#3f51b5', position: "absolute", right: 10 }}
        onClick={handleMoreClick}
      />
      <Menu
        id="custom-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            border: "1px solid #d3d4d5"
          }
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      // anchorOrigin={{
      //   vertical: 'bottom',
      //   horizontal: 'center',
      // }}
      >
        {optionsList.map((option, key) => (
          <MenuItem
            key={key}
            onClick={() => {
              option.onClick();
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <Icon>{option.icon}</Icon>
            </ListItemIcon>
            <Typography>{option.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default CustomMenu;

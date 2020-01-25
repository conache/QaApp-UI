import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const CustomMenu = props => {
  const { options, disabled } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMoreClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  console.log("Options:");
  console.log(options);
  const optionsList = options?.filter(option =>
    option.visible === false ? option.visible : true
  );

  console.log("Options list:");
  console.log(optionsList);
  if (!optionsList || !optionsList.length) {
    return [];
  }

  return (
    <div>
      <IconButton
        disabled={disabled}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleMoreClick}
      >
        <MoreVertIcon />
      </IconButton>
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
    </div>
  );
};

export default CustomMenu;

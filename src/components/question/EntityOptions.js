import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const EntityOptions = props => {
  const { disabled, onEditClick, onDeleteClick } = props;

  return (
    <div className="d-flex">
      <IconButton disabled={disabled} onClick={onEditClick}>
        <EditIcon />
      </IconButton>
      <IconButton disabled={disabled} onClick={onDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default EntityOptions;

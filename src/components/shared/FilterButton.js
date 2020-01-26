import React from "react";
import { Button } from "@material-ui/core";

const FilterButton = props => {
  const { name, selected, onClick } = props;
  return (
    <Button
      className={{ "filter-button": true, selected: selected }}
      variant="contained"
      onClick={() => !selected && onClick()}
    >
      {name}
    </Button>
  );
};

export default FilterButton;

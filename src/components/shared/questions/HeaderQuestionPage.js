import React, { useState } from 'react';
import { Box, Button, Menu } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';

const FilterButton = ({ name }) => {
  return (
    <Button className="filter-button" variant="contained" >
      {name}
    </Button>
  )
}

const HeaderQuestionPage = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { title } = props;
  return (
    <Box className="header-question" display="flex" justifyContent="space-between">
      <h3>{title}</h3>
      <div className="align-center">
        <div className="px-1">352 questions</div>
        <FilterButton name="Newest" />
        <FilterButton name="Votes" />
        <FilterButton name="No answers" />

        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
          className="filter-button"
          endIcon={<TuneIcon />}
          style={{ marginLeft: '1rem' }}
        >
          Filter
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          Here Goes filters
      </Menu>
      </div>
    </Box>
  );
}


export default HeaderQuestionPage;

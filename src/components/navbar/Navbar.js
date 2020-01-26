import React from 'react';
import LogoutButton from './LogoutButton';
import { withRouter } from 'react-router-dom';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import Search from '../shared/Search';
import { Box, Button } from '@material-ui/core';
import PersonDetails from './PersonDetails';
import NotificationsIcon from '@material-ui/icons/Notifications';

const Navbar = props => {
  const { history, location } = props;

  if(location.pathname === "/company-info/" || location.pathname === "/company-info") {
    return null;
  }

  return (
    <div className="navbar nav">
      <Box display="flex" className="nav-left">
        <QuestionAnswerOutlinedIcon className="logo" onClick={() => history.push("/")} />
        <Search />
      </Box>
      <Box display="flex" className="nav-right">
        <div className="h-100">
          <Button variant="contained" color="primary" className="h-100" onClick={() => history.push("/ask-question")}>
            Ask question
            </Button>
        </div>
        <div style={{ margin: '0 4px' }}>
          <NotificationsIcon className="icon" />
        </div>
        <PersonDetails />
        <LogoutButton />
      </Box>
    </div>
  );
}

export default withRouter(Navbar);
import React from 'react';
import LogoutButton from './LogoutButton';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import Search from '../Search';
import { Box, Button } from '@material-ui/core';
import PersonDetails from './PersonDetails';
import NotificationsIcon from '@material-ui/icons/Notifications';

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar nav">
        <Box display="flex" className="nav-left">
          <QuestionAnswerOutlinedIcon className="logo" onClick={() => window.location = "/home"} />
          <Search />
          <LogoutButton />
        </Box>
        <Box display="flex" className="nav-right">
          <div className="h-100">
            <Button variant="contained" color="primary" className="h-100" onClick={() => window.location="/ask-question"}>
              Ask question
            </Button>
          </div>
          <div style={{ margin: '0 4px' }}>
            <NotificationsIcon className="icon" />
          </div>
          <PersonDetails />
        </Box>
      </div>
    );
  }
}

export default Navbar;
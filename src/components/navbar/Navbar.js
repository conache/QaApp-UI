import React, {useEffect} from 'react';
import LogoutButton from './LogoutButton';
import { withRouter } from 'react-router-dom';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import Search from '../shared/Search';
import { Box, Button } from '@material-ui/core';
import PersonDetails from './PersonDetails';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getAuthToken } from '../../session';
import socketService from "../../socketService";

const Navbar = props => {
  const { history, location } = props;

  useEffect(() => {
    socketService.connectToServer(getAuthToken())
    .then(() => {
      socketService.onNotification((data) => {
        console.log("Received data:");
        console.log(data);
      });
    })
  }, []);
    
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
          <Button className="h-100 main-color-background" onClick={() => history.push("/ask-question")}>
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
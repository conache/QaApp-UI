import React from 'react';
import LogoutButton from './LogoutButton';
import { withRouter } from 'react-router-dom';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import Search from '../shared/Search';
import { Box, Button, Badge, Menu, MenuItem } from '@material-ui/core';
import PersonDetails from './PersonDetails';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getAuthToken } from '../../session';
import socketService from "../../socketService";
import { reverse, isEmpty, findIndex, propEq } from 'ramda';
import { withStyles } from '@material-ui/core/styles';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invisible: true,
      anchorEl: null,
      notifications: [],
    };
  }

  componentDidMount() {
    socketService.connectToServer(getAuthToken())
      .then(() => {
        socketService.onNotification((data) => {
          console.log("Received data:");
          console.log(data);
          this.handleBadgeVisibility(false);
          this.setState(prevState => {
            return { notifications: prevState.notifications.concat([data]) }
          })
        });
      });
  }

  handleBadgeVisibility = (invisible) => {
    this.setState({ invisible });
  };

  handleClickNotifications = event => {
    this.handleBadgeVisibility(true);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseNotification = () => {
    this.handleBadgeVisibility(true);
    this.setState({ anchorEl: null });
  };

  handleSelectNotif = (id) => {
    const { history } = this.props;
    const { notifications } = this.state;
    const index = findIndex(propEq('objectId', id))(notifications);
    notifications[index].seen = true;
    this.handleCloseNotification();
    if(notifications[index].notificationType === 'PROPOSED_QUESTION') {
      history.push(`/dashboard/my-questions/proposed-edits/${id}`);
    } else {
      history.push(`/dashboard/question/${id}`);
    }
  }

  render() {
    const { history, location } = this.props;
    const { invisible, anchorEl, notifications } = this.state;
    const open = Boolean(anchorEl);

    if (location.pathname === "/company-info/" || location.pathname === "/company-info") {
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
          <div style={{ margin: '0 10px' }} className="h-100 notifications-icon">
            <Badge
              color="secondary"
              variant="dot"
              overlap="circle"
              invisible={invisible}
              onClick={open ? this.handleCloseNotification : this.handleClickNotifications}>
              <NotificationsIcon className="icon" />
            </Badge>
            <StyledMenu
              id="notification-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={this.handleCloseNotification}
            >
         
              {isEmpty(notifications) && <div className="container-center">No notifications</div>}
              {reverse(notifications).map((notif, idx) => 
                <MenuItem 
                  key={idx}
                  style={{ background: notif.seen ? 'white' : '#e8e7e7' }}
                  onClick={() => this.handleSelectNotif(notif.objectId)}
                >
                  {notif.notificationText}
                </MenuItem> 
              )}
            </StyledMenu>
          </div>
          <PersonDetails />
          <LogoutButton />
        </Box>
      </div>
    );
  }
}

export default withRouter(Navbar);
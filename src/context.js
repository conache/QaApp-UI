// This is a context for signed-up  users, so that we can have permanently access to useful
// information about the user everywhere in application under -currentUser- key
import React from 'react';

export const UserContext = React.createContext({});

export function withUser(Component) {
  return function DecoratedComponent(props) {
    return (
      <UserContext.Consumer>
        {user => <Component {...props} currentUser={user} />}
      </UserContext.Consumer>
    );
  };
} 
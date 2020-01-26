import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Box } from "@material-ui/core";

import MyQuestions from "./MyQuestions";
import EditProposals from "./EditProposals";
import FilterButton from "../shared/FilterButton";

const UserQuestions = props => {
  const { match, history, location } = props;

  return (
    <div className="d-flex flex-column h-100" style={{ padding: "24px" }}>
      <Box 
        className="user-questions"
        display="flex"
        justifyContent="space-between"
        >
        <div></div>
        <div className="buttons-container align-center">
          <FilterButton
            name="All"
            selected={location.pathname.endsWith("/all")}
            onClick={() => history.replace(`all`)}
          />
          <FilterButton
            name="Edit proposals"
            selected={location.pathname.endsWith("/proposed-edits")}
            onClick={() => history.replace(`proposed-edits`)}
          />
        </div>
      </Box>
      <Switch>
        <Route exact path={`${match.path}/all`} component={MyQuestions} />
        <Route
          exact
          path={`${match.path}/proposed-edits`}
          component={EditProposals}
        />
        <Route render={() => <Redirect to={`${match.path}/all`} />} />
      </Switch>
    </div>
  );
};

export default UserQuestions;

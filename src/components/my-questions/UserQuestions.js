import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Box } from "@material-ui/core";

import MyQuestions from "./MyQuestions";
import EditProposals from "./EditProposals";
import FilterButton from "../shared/FilterButton";
import { pathOr } from "ramda";
import { connect } from "react-redux";
import QuestionPageContainer from "../question/QuestionPageContainer";

const UserQuestions = props => {
  const { match, history, location, questionsCount, proposalsCount } = props;
  const isAllQuestionsPage = location.pathname.endsWith("/all");

  const getTotalInfoElement = () => {
    const totalCount = isAllQuestionsPage ?  questionsCount : proposalsCount;
    const entityName = isAllQuestionsPage ? "questions" : "edit proposals";

    return totalCount <= 0 ? null : <div style={{ marginRight: '24px' }}>{totalCount} {entityName}</div>
  }

  return (
    <div className="d-flex flex-column h-100" style={{ padding: "24px" }}>
      <Box 
        className="user-questions"
        display="flex"
        justifyContent="space-between"
        >
        <h3>{isAllQuestionsPage ? "Your questions" : "Edit proposals for your questions"}</h3>
        <div className="buttons-container align-center">
          {getTotalInfoElement()}
          <FilterButton
            name="All"
            selected={isAllQuestionsPage}
            onClick={() => history.replace(`all`)}
          />
          <FilterButton
            name="Edit proposals"
            selected={!isAllQuestionsPage}
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

function mapStateToProps(state) {
  return {
    proposalsCount: pathOr(0, ["proposals", "totalCount"], state),
    questionsCount: pathOr(0,["user", "totalQuestionsCount"], state)
  }
} 

export default connect(mapStateToProps, null)(UserQuestions);

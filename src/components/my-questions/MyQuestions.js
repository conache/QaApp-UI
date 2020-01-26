import React from "react";
import {connect} from 'react-redux';
import { pathOr } from "ramda";

import {
  DEFAULT_PAGE_SIZE
} from "../utils/Constants";
import { getQuestions } from "../../ducks/user";
import PaginatedComponent from "../shared/PaginatedComponent";
import QuestionsList from "../shared/questions/QuestionsList";

class MyQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE,
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {actions: {getUserQuestions}} = this.props;
    const {page, pageSize} = this.state;

    getUserQuestions(page, pageSize);
  }

  onPageChange(page) {
    this.setState({page}, () => this.loadData());
  }

  render() {
    const {page, pageSize} = this.state;
    const {questions, totalCount, loading} = this.props;

    return (
      <PaginatedComponent
        label="questions"
        count={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={page => this.onPageChange(page)}
        loading={loading}
      >
        <QuestionsList questions={questions} />
      </PaginatedComponent>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: pathOr(false, ["user", "lodaingQuestions"], state),
    questions: pathOr([], ["user", "questions"], state),
    totalCount: pathOr(0, ["user", "totalQuestionsCount"], state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUserQuestions: (page, pageSize) => {
        return dispatch(getQuestions(page, pageSize))
      }
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyQuestions);

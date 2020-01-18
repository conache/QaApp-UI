import React from "react";
import { connect } from "react-redux";
import { pathOr } from "ramda";

import {
  DEFAULT_PAGE_SIZE,
  QUESTIONS_SORT_CRITERIA
} from "../../utils/Constants";
import { getAllQuestions } from "../../../ducks/questions";
import LoadingSpinner from "../LoadingSpinner";
import QuestionsFilter from "./QuestionsFilter";
import QuestionsList from "./QuestionsList";
import PaginatedComponent from "../PaginatedComponent";

class AllQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE,
      filters: {
        tags: [],
        sortBy: QUESTIONS_SORT_CRITERIA.NEWEST
      }
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {
      actions: { loadQuestions }
    } = this.props;
    const { page, pageSize, filters } = this.state;

    loadQuestions({
      page,
      pageSize,
      ...filters
    });
  }

  onPageChange(page) {
    this.setState({ page: page }, () => this.loadData());
  }

  onFilterChange(key, value) {
    this.setState(
      prevState => ({
        page: 0,
        filters: {
          ...prevState.filters,
          [key]: value,
        },
      }),
      () => {
        console.log("New statE:");
        console.log(this.state);
        this.loadData();
      }
    );
  }

  render() {
    const { page, pageSize } = this.state;

    const {
      questions: { loadingAllQuestions, allQuestions }
    } = this.props;
    let totalElements = 0;
    let questions = [];

    if (allQuestions) {
      totalElements = pathOr(0, ["totalElements"], allQuestions);
      questions = pathOr([], ["content"], allQuestions);
    }

    return (
      <div
        className="all-questions d-flex flex-column h-100"
        style={{ padding: "24px" }}
      >
        <QuestionsFilter
          title="All questions page"
          onFilterChange={(...args) => this.onFilterChange(...args)}
        />
        <div className="list-container">
          {loadingAllQuestions && <LoadingSpinner />}
          <PaginatedComponent
            style={{marginRight: "auto"}}
            label="questions"
            count={totalElements}
            page={page}
            pageSize={pageSize}
            onPageChange={page => this.onPageChange(page)}
          >
            <QuestionsList questions={questions} />
          </PaginatedComponent>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: pathOr({}, ["questions"], state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadQuestions: params => {
        return dispatch(getAllQuestions(params));
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllQuestions);

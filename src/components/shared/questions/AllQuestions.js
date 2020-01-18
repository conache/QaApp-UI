import React from 'react';
import {connect} from 'react-redux';
import { pathOr } from 'ramda';
import QuestionCard from './QuestionCard';
import HeaderQuestionPage from './HeaderQuestionPage';

class AllQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {actions: {loadQuestions}} = this.props;
    loadQuestions();
  }

  render() {
    const {questions: {loadingAllQuestions, allQuestions}} = this.props;
    if (loadingAllQuestions) {
      return <LoadingSpinner />
    }
    const questions = allQuestions || [];
    return (
      <div className="all-questions d-flex flex-column h-100" style={{ padding: '24px' }}>
        <HeaderQuestionPage 
          title="All questions page"
        />
        {/* {questions.map((question, idx) =>
          <QuestionCard question={question} key={idx}/>
        )} */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: pathOr({}, ['questions'], state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadQuestions: () => {return dispatch(getAllQuestions())}
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllQuestions);
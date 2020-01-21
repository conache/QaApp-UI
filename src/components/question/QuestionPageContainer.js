import { connect } from 'react-redux';
import { getQuestion, subscribeQuestin, getAnswers } from '../../ducks/questions'
import { pathOr } from 'ramda';
import QuestionPage from './QuestionPage';

function mapStateToProps(state) {
  return {
    currentQuestion: pathOr({}, ['questions'], state),
    // answers: pathOr([], 'answers', state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadQuestionById: (id) => { return dispatch(getQuestion(id)) },
      getAnswers: (params) => { return dispatch(getAnswers(params)) },
      subscribe: (id) => { return dispatch(subscribeQuestin(id))},
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionPage);
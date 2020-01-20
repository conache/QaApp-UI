import { connect } from 'react-redux';
import { getQuestion } from '../../ducks/questions'
import { pathOr } from 'ramda';
import QuestionPage from './QuestionPage';

function mapStateToProps(state) {
  return {
    currentQuestion: pathOr({}, ['questions'], state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadQuestionById: (id) => { return dispatch(getQuestion(id)) }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionPage);
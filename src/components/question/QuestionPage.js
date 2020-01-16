import React from 'react';
import {connect} from 'react-redux';
import {getQuestion} from '../../ducks/questions'
import { pathOr } from 'ramda';
import LoadingSpinner from '../shared/LoadingSpinner';
import QuestionCard from '../shared/questions/QuestionCard';

class QuestionPage extends React.Component {
  componentDidMount() {
    const {actions: {loadQuestionById}, match} = this.props;
    loadQuestionById(match.params.id);
  }

  render() {
    const {match, currentQuestion: {loading, question}} = this.props;
    if (loading) {
      return <LoadingSpinner />
    }

    return (
      <QuestionCard question={question} />
    )
  }
}

function mapStateToProps(state) {
  return {
    currentQuestion: pathOr({}, ['questions'], state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadQuestionById: (id) => {return dispatch(getQuestion(id))}
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionPage);
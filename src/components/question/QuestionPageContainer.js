import { connect } from "react-redux";
import {
  getQuestion,
  subscribeToQuestion,
  voteQuestion,
  deleteQuestion,
  editQuestion
} from "../../ducks/questions";
import { getAnswers, addAnswer } from "../../ducks/answers";
import { pathOr } from "ramda";
import QuestionPage from "./QuestionPage";

function mapStateToProps(state) {
  return {
    currentQuestion: pathOr({}, ["questions"], state),
    currentAnswers: pathOr([], ["answers"], state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadQuestionById: id => {
        return dispatch(getQuestion(id));
      },
      getAnswers: params => {
        return dispatch(getAnswers(params));
      },
      addAnswer: params => {
        return dispatch(addAnswer(params));
      },
      subscribeToQuestion: params => {
        return dispatch(subscribeToQuestion(params));
      },
      voteQuestion: params => {
        return dispatch(voteQuestion(params));
      },
      deleteQuestion: params => {
        return dispatch(deleteQuestion(params));
      },
      editQuestion: params => {
        return dispatch(editQuestion(params));
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);

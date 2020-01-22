import { connect } from "react-redux";
import { getQuestion, subscribeQuestin } from "../../ducks/questions";
import { getAnswers, addAnswer } from "../../ducks/answers";
import { pathOr } from "ramda";
import QuestionPage from "./QuestionPage";

function mapStateToProps(state) {
  return {
    currentQuestion: pathOr({}, ["questions"], state),
    currentAnswers: pathOr([], ["answers"], state),
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
      subscribe: id => {
        return dispatch(subscribeQuestin(id));
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);

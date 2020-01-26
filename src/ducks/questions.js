import { createAction } from "redux-actions";
import Immutable from "seamless-immutable";
import { NotificationManager } from "react-notifications";
import { pathOr } from "ramda";
import * as Questions from "../api/questions";
// TODO: move Constants file to app level
import { VOTE_SATUS } from "../components/utils/Constants";

export default function reducer(state = Immutable({}), action) {
  const currentQuestion = pathOr({}, ["question"], state);

  switch (action.type) {
    case "questions/GET_QUESTION_LOADING":
      return state.merge({ loading: action.payload });
    case "questions/QUESTION":
      return state.merge({ question: action.payload }, { deep: true });
    case "questions/ALL_QUESTIONS_LOADING":
      return state.merge(
        { loadingAllQuestions: action.payload },
        { deep: true }
      );
    case "questions/ALL_QUESTIONS":
      return state.merge({ allQuestions: action.payload }, { deep: true });
    case "questions/CREATE_QUESTION_LOADING":
      return state.merge(
        { loadingCreateQuestion: action.payload },
        { deep: true }
      );
    case "questions/CREATE_QUESTION":
      return state;
    case "questions/VOTE_QUESTION":
      let voteCount = 0;

      if (action.payload.isUpVote) {
        voteCount = currentQuestion.voteStatus === VOTE_SATUS.NO_VOTE ? 1 : 2;
      } else {
        voteCount = currentQuestion.voteStatus === VOTE_SATUS.NO_VOTE ? -1 : -2;
      }

      return state.merge(
        {
          question: {
            ...currentQuestion,
            score: currentQuestion.score + voteCount,
            voteStatus: action.payload.isUpVote
              ? VOTE_SATUS.UPVOTE
              : VOTE_SATUS.DOWNVOTE
          }
        },
        { deep: true }
      );
    case "questions/EDIT_QUESTION":
      return state.merge(
        {
          question: {
            ...currentQuestion,
            questionText: action.payload.questionText
          }
        },
        { deep: true }
      );
    case "questions/SUBSCRIBE_TO_QUESTION":
      return state.merge(
        {
          question: {
            ...currentQuestion,
            subscribed: action.payload.subscribe
          }
        },
        { deep: true }
      );
    default:
      return state;
  }
}

export const loadingQuestion = createAction("questions/GET_QUESTION_LOADING");
export const setQuestion = createAction("questions/QUESTION");
export const loadingAllQuestions = createAction(
  "questions/ALL_QUESTIONS_LOADING"
);
export const setAllQuestions = createAction("questions/ALL_QUESTIONS");
export const loadingCreateQuestion = createAction(
  "questions/CREATE_QUESTION_LOADING"
);
export const createQuestion = createAction("questions/CREATE_QUESTION");
export const applyQuestionVote = createAction("questions/VOTE_QUESTION");
export const applyQuestionEdit = createAction("questions/EDIT_QUESTION");
export const applyQuestionSubscribe = createAction(
  "questions/SUBSCRIBE_TO_QUESTION"
);

export const getQuestion = id => {
  return dispatch => {
    dispatch(loadingQuestion(true));
    return Questions.getQuestion(id)
      .then(resp => {
        dispatch(setQuestion(resp.data));
        dispatch(loadingQuestion(false));
      })
      .catch(err => {
        dispatch(loadingQuestion(false));
        NotificationManager.error(
          `Could not load question. Please refresh the page. Error: ${err.message}`
        );
      });
  };
};

export const getAllQuestions = params => {
  return dispatch => {
    dispatch(loadingAllQuestions(true));
    return Questions.getAllQuestions(params)
      .then(resp => {
        dispatch(setAllQuestions(resp.data));
        dispatch(loadingAllQuestions(false));
      })
      .catch(err => {
        dispatch(loadingAllQuestions(false));
        NotificationManager.error(
          `Could not load questions. Please refresh the page. Error: ${err.message}`
        );
      });
  };
};

export const addNewQuestion = params => {
  return dispatch => {
    dispatch(loadingCreateQuestion(true));
    return Questions.addQuestion(params)
      .then(resp => {
        dispatch(createQuestion(resp.data));
        dispatch(loadingCreateQuestion(false));
      })
      .catch(err => {
        dispatch(loadingCreateQuestion(false));
        NotificationManager.error(
          `We've encountered some troubles adding your question. Please try again. Error: ${err.message}`
        );
      });
  };
};

export const subscribeToQuestion = params => {
  return dispatch => {
    return Questions.subscribe(params)
      .then(resp => {
        dispatch(applyQuestionSubscribe(params));
        NotificationManager.success(
          params.subscribe
            ? "Successfully subscribed! You will receive updates regarding this question."
            : "Successfully unusubscribed! You will not receive updates regarding this question anymore."
        );
      })
      .catch(err => {
        NotificationManager.error(
          `We've encountered some troubles. Please try again. Error: ${err.message}`
        );
      });
  };
};

export const voteQuestion = params => {
  return dispatch => {
    return Questions.voteQuestion(params)
      .then(resp => {
        dispatch(applyQuestionVote(params));
      })
      .catch(err => {
        NotificationManager.error(
          `Error encountered while request. Error: ${err.message}`
        );
      });
  };
};

export const deleteQuestion = id => {
  return dispatch => {
    return Questions.deleteQuestion(id)
      .then(resp => {
        NotificationManager.success("Question successfully deleted.");
      })
      .catch(err => {
        NotificationManager.error(
          `Could not delete answer. Error: ${err.message}`
        );
      });
  };
};

export const editQuestion = params => {
  return dispatch => {
    return Questions.updateQuestion(params)
      .then(resp => {
        dispatch(applyQuestionEdit(params));
      })
      .catch(err => {
        NotificationManager.error(
          `Error encountered while editing. Error: ${err.message}`
        );
      });
  };
};

import { createAction } from "redux-actions";
import Immutable from "seamless-immutable";
import {NotificationManager} from 'react-notifications';

import * as Questions from "../api/questions";
import * as Answers from "../api/answers";


export default function reducer(state = Immutable({}), action) {
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
      return state.merge({ newQuestionId: action.payload }, {deep: true})
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
        NotificationManager.error(`Could not load question. Please refresh the page. Error: ${err.message}`);
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
        NotificationManager.error(`Could not load questions. Please refresh the page. Error: ${err.message}`);
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

export const subscribeQuestin = (params) => {
  // TODO: need more work
  return dispatch => {
    return Questions.subscribe(params)
      .then(resp => {
        // dispatch(createQuestion(resp.data));
      })
      .catch(err => {
        NotificationManager.error(
          `We've encountered some troubles. Please try again. Error: ${err.message}`
        );
      });
  };
}


export const getAnswers = params => {
  return dispatch => {
    return Answers.getAnswers(params)
      .then(resp => {
        // dispatch(createQuestion(resp.data));
      })
      .catch(err => {
        NotificationManager.error(
          `We've encountered some troubles getting your answers. Please try again. Error: ${err.message}`
        );
      });
  };
}

export const addAnswer = params => {
  return dispatch => {
    return Answers.addAnswer(params)
      .then(resp => {
        // dispatch(createQuestion(resp.data));
        NotificationManager.success("Succesfully submitted your answer.")
      })
      .catch(err => {
        NotificationManager.error(
          `We've encountered some troubles adding your answer. Please try again. Error: ${err.message}`
        );
      });
  };
}
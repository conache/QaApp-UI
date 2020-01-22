import { createAction } from "redux-actions";
import Immutable from "seamless-immutable";
import {NotificationManager} from 'react-notifications';

import * as Answers from '../api/answers';

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case "answers/GET_ANSWERS_LOADING":
      return state.merge({loadingAnswers: action.payload});
    case "answers/ANSWERS":
      return state.merge({answers: action.payload}, {deep: true});
    case "answers/CREATE_ANSWER_LOADING":
      return state.merge({loadingCreateAnswer: action.payload}, {deep: true});
    case "answers/CREATE_ANSWER":
      return state.merge({newAnswerId: action.payload }, {deep: true})
    default:
      return state;
  }
}

export const loadingAnswers = createAction("answers/GET_ANSWERS_LOADING");
export const setAnswers = createAction("answers/ANSWERS");
export const loadingCreateAnswer = createAction("answers/CREATE_ANSWER_LOADING");
export const createAnswer = createAction("answers/CREATE_ANSWER");

export const getAnswers = params => {
  return dispatch => {
    dispatch(loadingAnswers(true));
    return Answers.getAnswers(params)
      .then(resp => {
        dispatch(loadingAnswers(false));
        dispatch(setAnswers(resp.data));
      })
      .catch(err => {
        dispatch(loadingAnswers(false));
        NotificationManager.error(
          `We've encountered some troubles getting the answers for this question. Please try again. Error: ${err.message}`
        );
      });
  };
}

export const addAnswer = params => {
  return dispatch => {
    dispatch(loadingCreateAnswer(true));
    return Answers.addAnswer(params)
      .then(resp => {
        dispatch(loadingCreateAnswer(false));
        dispatch(createAnswer(resp.data));
        NotificationManager.success("Your answer was posted.");
      })
      .catch(err => {
        dispatch(loadingCreateAnswer(false));
        NotificationManager.error(
          `We've encountered some troubles adding your answer. Please try again. Error: ${err.message}`
        );
      });
  };
}
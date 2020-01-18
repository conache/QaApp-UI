import { createAction, createActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as Questions from '../api/questions';

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case 'questions/GET_QUESTION_LOADING':
      return state.merge({ loading: action.payload });
    case 'questions/QUESTION':
      return state.merge({ question: action.payload }, { deep: true });
    case 'questions/ALL_QUESTIONS_LOADING':
      return state.merge({ loadingAllQuestions: action.payload }, {deep: true});
    case 'questions/ALL_QUESTIONS':
      console.log("ALL QUESTIONS:");
      console.log(action);
      return state.merge({ allQuestions: action.payload }, {deep: true});
    default:
      return state;
  }
}

export const loadingQuestion = createAction('questions/GET_QUESTION_LOADING');
export const setQuestion = createAction('questions/QUESTION');
export const loadingAllQuestions = createAction('questions/ALL_QUESTIONS_LOADING');
export const setAllQuestions = createAction('questions/ALL_QUESTIONS');

export const getQuestion = (id) => {
  return dispatch => {
    dispatch(loadingQuestion(true));
    return Questions.getQuestion(id)
      .then(resp => {
        dispatch(setQuestion(resp.data));
        dispatch(loadingQuestion(false));
      })
      .catch((err) => {
        dispatch(loadingQuestion(false));
        console.log(err);
      });
  };
}

export const getAllQuestions = (params) => {
  return dispatch => {
    console.log("Get all questions with following filters:");
    console.log(params);
    dispatch(loadingAllQuestions(true));
    return Questions.getAllQuestions(params)
      .then(resp => {
        dispatch(setAllQuestions(resp.data));
        dispatch(loadingAllQuestions(false));
      })
      .catch((err) => {
        dispatch(loadingAllQuestions(false));
        console.log(err);
      });
  }
}
import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as Questions from '../api/questions';

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case 'questions/GET_QUESTION_LOADING':
      return state.merge({ loading: action.payload });
    case 'questions/QUESTION':
      return state.merge({ question: action.payload }, { deep: true });
    default:
      return state;
  }
}

export const loadingQuestion = createAction('questions/GET_QUESTION_LOADING');
export const setQuestion = createAction('questions/QUESTION');

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
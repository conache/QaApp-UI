import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import { NotificationManager } from 'react-notifications';
import * as Questions from '../api/questions';

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case 'search/GET_QUESTIONS_LOADING':
      return state.merge({ loading: action.payload });
    case 'search/SIMILAR_QUESTIONS':
      return state.merge({ results: { data: action.payload } }, { deep: true });
    default:
      return state;
  }
}

export const getSimilarQuestionsLoading = createAction('search/GET_QUESTIONS_LOADING');
export const setSimilarQuestions = createAction('search/SIMILAR_QUESTIONS');

export const getSimilarQuestions = (text) => {
  return dispatch => {
    dispatch(getSimilarQuestionsLoading(true));
    return Questions.getSimilarQuestions(text)
      .then((res) => {
        dispatch(setSimilarQuestions(res.data));
        dispatch(getSimilarQuestionsLoading(false));
      })
      .catch((err) => {
        dispatch(getSimilarQuestionsLoading(false));
        NotificationManager.error(`Error: ${err.message}`)
      })
  }
}


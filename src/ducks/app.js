import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';

export default function reducer(state = Immutable({}), action) {
  switch (action.type)  {
    case 'app/APP_LOADING':
      return state.merge({ appLoading: true });
    case 'app/APP_LOADED':
      return state.merge({ appLoading: false });
    case 'app/NEW_APP_ERROR':
      return state.merge({ appErrors: state.appErrors.concat(action.payload) });
    case 'app/REMOVE_APP_ERROR':
      return state.merge({ appErrors: state.appErrors.slice(0, -1) });
    default:
      return state;
  }
}

export const appLoading         = createAction('app/APP_LOADING');
export const appLoaded          = createAction('app/APP_LOADED');
export const newAppError        = createAction('app/NEW_APP_ERROR');
export const removeAppError     = createAction('app/REMOVE_APP_ERROR');


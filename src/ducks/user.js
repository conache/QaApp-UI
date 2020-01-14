import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as User from '../api/user';
import { setAuthToken } from '../session';

export default function reducer(state = Immutable({}), action) {
  switch (action.type)  {
    case 'profile/PROFILE_LOADING':
      return state.merge({ loading: action.payload }, { deep: true });
    case 'profile/GET_PROFILE_INFO':
      return state.merge({ profile: action.payload }, { deep: true });
    case 'profile/LOGOUT':
      return state.set('profile', {});
    default:
      return state;
  }
}

export const loadingProfile         = createAction('profile/PROFILE_LOADING');

export const getProfileInfo         = createAction('profile/GET_PROFILE_INFO');
export const userLogOut             = createAction('profile/LOGOUT');

export const getUserInfo = () => {
  return dispatch => {
    dispatch(loadingProfile(true));
    return User.getUserProfile()
      .then(resp => {
        dispatch(getProfileInfo(resp.data));
        dispatch(loadingProfile(false));
      })
      .catch((err) => {
        dispatch(loadingProfile(false));
        console.error(err);
      })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(userLogOut());
    setAuthToken(null);
  }
}

export const loadingProfileUser = () => {
  return dispatch => {
    dispatch(loadingProfile(true))
  }
}
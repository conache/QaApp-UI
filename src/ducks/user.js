import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as User from '../api/user';

export default function reducer(state = Immutable({}), action) {
  switch (action.type)  {
    case 'user/GET_PROFILE_INFO':
      return state.merge({ user: action.payload }, { deep: true });
    case 'user/LOGOUT':
      return state.set('user', {});
    default:
      return state;
  }
}

export const getProfileInfo         = createAction('user/GET_PROFILE_INFO');
export const userLogOut             = createAction('user/LOGOUT');

export const getUserInfo = () => {
  return dispatch => {
    return User.getUserProfile()
      .then(resp => {
        console.log(resp);
        dispatch(getProfileInfo(resp.data));
      })
      .catch((err) => {
        console.error(err);
      })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(userLogOut());
  }
}
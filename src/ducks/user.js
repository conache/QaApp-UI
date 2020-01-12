import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as User from '../api/user';
import { deleteSession } from '../session';

export default function reducer(state = Immutable({}), action) {
  switch (action.type)  {
    case 'user/GET_PROFILE_INFO':
      return state.merge({ profile: action.payload }, { deep: true });
    case 'user/LOGOUT':
      return state.set('user', {});
    default:
      return state;
  }
}

export const getProfileInfo         = createAction('app/GET_PROFILE_INFO');
export const userLogOut             = createAction('app/LOGOUT');

export const getUserInformation = params => {
  return dispatch => {
    return User.getUserInfo(params)
      .then(resp => {
        console.log(resp);
        dispatch(getProfileInfo(resp));
      })
      .catch((err) => {
        console.error(err);
      })
  }
}

export const logOut = () => {
  return (dispatch) => {
    User.logout()
        .then(() => dispatch(userLogOut()))
        .catch()
        .finally(() => deleteSession())
  }
}
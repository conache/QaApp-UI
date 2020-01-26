import { createAction, createActions } from "redux-actions";
import Immutable from "seamless-immutable";
import { NotificationManager } from "react-notifications";

import * as User from "../api/user";
import { setAuthToken } from "../session";
import { pathOr } from "ramda";

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case "profile/PROFILE_LOADING":
      return state.merge({ loading: action.payload }, { deep: true });
    case "profile/GET_PROFILE_INFO":
      return state.merge({ profile: action.payload }, { deep: true });
    case "profile/QUESTIONS_LOADING":
      return state.merge({ lodaingQuestions: action.payload }, { deep: true });
    case "profile/QUESTIONS":
      return state.merge({ 
        totalQuestionsCount: pathOr(0, ["value1"], action.payload),
        questions: pathOr([], ["value0"], action.payload)
      }, { deep: true });
    case "profile/LOGOUT":
      return state.set("profile", {});
    default:
      return state;
  }
}

export const loadingProfile = createAction("profile/PROFILE_LOADING");

export const getProfileInfo = createAction("profile/GET_PROFILE_INFO");
export const userLogOut = createAction("profile/LOGOUT");

export const setQuestions = createAction("profile/QUESTIONS");
export const loadingQuestions = createAction("profile/QUESTIONS_LOADING");

export const getUserInfo = () => {
  return dispatch => {
    dispatch(loadingProfile(true));
    return User.getUserProfile()
      .then(resp => {
        dispatch(getProfileInfo(resp.data));
        dispatch(loadingProfile(false));
      })
      .catch(err => {
        dispatch(loadingProfile(false));
        console.error(err);
      });
  };
};

export const getQuestions = (page, pageSize) => {
  return dispatch => {
    dispatch(loadingQuestions(true));
    return User.getQuestions(page, pageSize)
      .then(resp => {
        dispatch(setQuestions(resp.data));
        dispatch(loadingQuestions(false));
      })
      .catch(err => {
        dispatch(loadingQuestions(false));
        NotificationManager.error(
          `An error encountered while fetching your questions. Error: ${err.message}`
        );
      });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(userLogOut());
    setAuthToken(null);
  };
};

export const loadingProfileUser = () => {
  return dispatch => {
    dispatch(loadingProfile(true));
  };
};

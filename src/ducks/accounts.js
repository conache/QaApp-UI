import { createAction } from "redux-actions";
import Immutable from "seamless-immutable";
import { NotificationManager } from "react-notifications";
import * as Accounts from "../api/accounts";
import { pathOr } from "ramda";

function formatUserJSON(userJSON) {
  const { attributes } = userJSON;
  if (!attributes) {
    return userJSON;
  }

  const additional = {};
  ["job", "role"].forEach(key => {
    const fieldValue = attributes[key];
    if (!fieldValue) {
      additional[key] = null;
      return;
    }
    additional[key] = fieldValue[0] || "";
  });

  return {
    ...userJSON,
    ...additional
  };
}

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case "accounts/REQUEST_ACCOUNTS":
      return state.merge({ loading: action.payload }, { deep: true });
    case "accounts/GET_ACCOUNTS":
      return state.merge(
        {
          totalCount: action.payload.totalCount,
          data: (action.payload.users || []).map(formatUserJSON)
        },
        { deep: true }
      );
    case "accounts/EDIT_ACCOUNT":
      const currentAccounts = pathOr([], ["data"], state);
      return state.merge(
        {
          data: currentAccounts.map(account => {
            if (account.id !== action.payload.id) {
              return account;
            }

            return {
              ...account,
              ...action.payload
            };
          })
        },
        { deep: true }
      );
    default:
      return state;
  }
}

export const requestAccounts = createAction("accounts/REQUEST_ACCOUNTS");
export const getAccounts = createAction("accounts/GET_ACCOUNTS");
export const applyAccountEdit = createAction("accounts/EDIT_ACCOUNT");

export const createAccount = params => {
  return dispatch => {
    return Accounts.createUserAccount(params)
      .then(res => {
        NotificationManager.success("User successfully added to company");
      })
      .catch(err => {
        NotificationManager.error(
          `Could not add user to company. Error: ${err.message}`
        );
      });
  };
};

export const getAllAccounts = (page, pageSize) => {
  return dispatch => {
    dispatch(requestAccounts(true));
    return Accounts.getUserAccounts(page, pageSize)
      .then(res => {
        dispatch(requestAccounts(false));
        dispatch(getAccounts(res.data));
      })
      .catch(err => {
        dispatch(requestAccounts(false));
        NotificationManager.error(
          `Could not fetch users. Error: ${err.message}`
        );
      });
  };
};

export const deleteAccount = id => {
  return dispatch => {
    return Accounts.removeUserAccount(id)
      .then(res => {
        NotificationManager.success("User removed successfully");
      })
      .catch(err => {
        NotificationManager.error(
          `Could not remove user. Error: ${err.message}`
        );
      })
  }
};

export const editAccount = params => {
  return dispatch => {
    return Accounts.updateUserAccount(params)
      .then(res => {
        dispatch(applyAccountEdit(params));
      })
      .catch(error => {
        NotificationManager.error(
          `Could not finish editing user. Error: ${error.message}`
        );
      });
  };
};

import { createAction } from "redux-actions";
import Immutable from "seamless-immutable";
import { NotificationManager } from "react-notifications";
import { pathOr } from "ramda";

import * as Proposals from "../api/proposals";

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case "proposals/PROPOSALS_LOADING":
      return state.merge({ loadingAllProposals: action.payload }, { deep: true });
    case "proposals/PROPOSALS":
    return state.merge(
        {
          totalCount: pathOr(0, ["value1"], action.payload),
          data: pathOr([], ["value0"], action.payload)
        },
        { deep: true }
      );
    case "proposals/PROPOSAL":
      return state.merge(
        {
          currentProposal: action.payload
        },
        {deep: true}
      );
    case "proposals/GET_PROPOSAL_LOADING":
      return state.merge(
        {
          loadingProposal: action.payload
        },
        {deep: true}
      )
    default:
      return state;
  }
}

export const loadingProposals = createAction("proposals/PROPOSALS_LOADING");
export const setProposals = createAction("proposals/PROPOSALS");

export const loadingProposal = createAction("proposals/GET_PROPOSAL_LOADING");
export const setProposal = createAction("proposals/PROPOSAL");

export const getEditProposals = (page, pageSize) => {
  return dispatch => {
    dispatch(loadingProposals(true));
    return Proposals.getProposals(page, pageSize)
      .then(res => {
        dispatch(loadingProposals(false));
        dispatch(setProposals(res.data));
      })
      .catch(err => {
        dispatch(loadingProposals(false));
        NotificationManager.error(
          `Error encountered while fetching edit proposals. Error: ${err.message}`
        );
      });
  };
};

export const getEditProposal = id => {
  return dispatch => {
    dispatch(loadingProposal(true));
    return Proposals.getProposal(id)
      .then(res => {
        dispatch(loadingProposal(false));
        dispatch(setProposal(res.data));
      })
      .catch(err => {
        dispatch(loadingProposal(false));
      })
  }
}

export const acceptEditProposal = id => {
  return dispatch => {
    return Proposals.acceptProposal(id)
    .then(res => {
      NotificationManager.success(`Question successfully edited!`);
      return res;
    })
    .catch(err => {
      NotificationManager.error(
        `Could not accept edit proposal. Error: ${err.message}`
      );
      return err;
    });
  };
};

export const declineEditProposal = id => {
  return dispatch => {
    return Proposals.declineProposal(id)
    .catch(err => {
      NotificationManager.error(
        `Could not decline edit proposal. Error: ${err.message}`
      );
    });
  };
};

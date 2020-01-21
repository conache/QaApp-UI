import { createAction } from "redux-actions";
import Immutable from "seamless-immutable";
import { NotificationManager } from "react-notifications";
import * as Tags from "../api/tags";

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case "tags/ALL_TAGS_LOADING":
      return state.merge({ tags: { loading: action.payload } }, { deep: true });
    case "tags/ALL_TAGS":
      return state.merge({ tags: { data: action.payload } }, { deep: true });
    case "tags/ALL_ACTIVE_TAGS_LOADING":
      return state.merge(
        { activeTags: { loading: action.payload } },
        { deep: true }
      );
    case "tags/ALL_ACTIVE_TAGS":
      return state.merge(
        { activeTags: { data: action.payload } },
        { deep: true }
      );
    case "tags/PROPOSED_TAGS_LOADING":
      return state.merge(
        { proposedTags: { data: action.payload } },
        { deep: true }
      );
    case "tags/PROPOSED_TAGS":
      return state.merge(
        { proposedTags: { loading: action.payload } },
        { deep: true }
      );
    default:
      return state;
  }
}

export const setAllTags = createAction("tags/ALL_TAGS");
export const getAllTagsLoading = createAction("tags/ALL_TAGS_LOADING");

export const getAllActiveTagsLoading = createAction(
  "tags/ALL_ACTIVE_TAGS_LOADING"
);
export const setAllActiveTags = createAction("tags/ALL_ACTIVE_TAGS");

export const getProposedTagsLoading = createAction(
  "tagas/PROPOSED_TAGS_LOADING"
);
export const setProposedTags = createAction("tags/PROPOSED_TAGS");

export const getAllActiveTags = () => {
  return dispatch => {
    dispatch(getAllActiveTagsLoading(true));
    return Tags.getAllActiveTags()
      .then(res => {
        dispatch(setAllActiveTags(res.data));
        dispatch(getAllActiveTagsLoading(false));
      })
      .catch(err => {
        dispatch(getAllTagsLoading(false));
      });
  };
};

export const getTags = () => {
  return dispatch => {
    dispatch(getAllTagsLoading(true));
    return Tags.getAllTags()
      .then(res => {
        dispatch(setAllTags(res));
        dispatch(getAllTagsLoading(false));
      })
      .catch(err => {
        dispatch(getAllTagsLoading(false));
        NotificationManager.error(`Error: ${err.message}`);
      });
  };
};

export const addTag = params => {
  return dispatch => {
    return Tags.addTag(params)
      .then(res => {
        // dispatch(getTags());
      })
      .catch(err => {
        NotificationManager.error(`Could not add tag. Error: ${err.message}`);
      });
  };
};

export const editTag = params => {
  return dispatch => {
    return Tags.editTag(params)
      .then(res => {
        // dispatch(getTags());
      })
      .catch(err => {
        NotificationManager.error(`Could not edit tag. Error: ${err.message}`);
      });
  };
};

export const deleteTag = id => {
  return dispatch => {
    return Tags.deleteTag(id)
      .then(res => {
        NotificationManager.success("Succesfully deleted");
        // dispatch(getTags());
      })
      .catch(err => {
        NotificationManager.error(
          `Could not delete tag. Error: ${err.message}`
        );
      });
  };
};

// Proposed tags
export const getProposedTags = params => {
  return dispatch => {
    return Tags.getProposedTags(params)
      .then(res => {})
      .catch(err => {});
  };
};

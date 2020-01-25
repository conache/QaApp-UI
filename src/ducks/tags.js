import { createAction } from "redux-actions";
import Immutable from "seamless-immutable";
import { NotificationManager } from "react-notifications";
import { pathOr } from "ramda";
import * as Tags from "../api/tags";

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case "tags/ALL_TAGS_LOADING":
      return state.merge({ tags: { loading: action.payload } }, { deep: true });
    case "tags/ALL_TAGS":
      return state.merge(
        {
          tags: {
            totalCount: action.payload.data.totalElements,
            data: action.payload.data.content
          }
        },
        { deep: true }
      );
    case "tags/EDIT_TAG":
      const currentTags = pathOr([], ["tags"], state);
      return state.merge({
        tags: {
          ...currentTags,
          data: currentTags.data.map(tag => {
            if (tag.id !== action.payload.id) {
              return tag;
            }

            return {
              ...tag,
              ...action.payload
            };
          })
        }
      });
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
    default:
      return state;
  }
}

export const setAllTags = createAction("tags/ALL_TAGS");
export const getAllTagsLoading = createAction("tags/ALL_TAGS_LOADING");
export const applyTagEdit = createAction("tags/EDIT_TAG");

export const getAllActiveTagsLoading = createAction(
  "tags/ALL_ACTIVE_TAGS_LOADING"
);
export const setAllActiveTags = createAction("tags/ALL_ACTIVE_TAGS");

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

export const getTags = (page, pageSize) => {
  return dispatch => {
    dispatch(getAllTagsLoading(true));
    return Tags.getAllTags(page, pageSize)
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
        NotificationManager.success("Tag successfully created");
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
        dispatch(applyTagEdit(params));
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
        NotificationManager.success("Tag succesfully deleted");
      })
      .catch(err => {
        NotificationManager.error(
          `Could not delete tag. Error: ${err.message}`
        );
      });
  };
};

export const getProposedTags = (page, pageSize) => {
  return dispatch => {
    return Tags.getProposedTags(page, pageSize)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        NotificationManager.error(
          `Could not fetch proposed tags. Error: ${err.message}`
        );
      });
  };
};

export const declineProposedTag = id => {
  return dispatch => {
    return Tags.declineProposedTag(id)
      .then(res => {
        NotificationManager.success("Tag successfully declined.");
        return res.data;
      })
      .catch(err => {
        NotificationManager.error(
          `Could not decline tag proposal. Error: ${err.message}`
        );
      });
  };
};

export const acceptProposedTag = id => {
  return dispatch => {
    return Tags.acceptProposedTag(id)
      .then(res => {
        NotificationManager.success("Tag successfully accepted.");
        return res.data;
      })
      .catch(err => {
        NotificationManager.error(
          `Could not accept tag. Error: ${err.message}`
        );
      });
  };
};

import { createAction } from "redux-actions";
import Immutable from "seamless-immutable";
import { NotificationManager } from "react-notifications";
import { pathOr } from "ramda";
import * as Answers from "../api/answers";
// TODO: move Constants file to app level
import { VOTE_SATUS } from "../components/utils/Constants";

export default function reducer(state = Immutable({}), action) {
  const currentAnswers = pathOr({}, ["answers"], state);

  switch (action.type) {
    case "answers/GET_ANSWERS_LOADING":
      return state.merge({ loadingAnswers: action.payload });
    case "answers/ANSWERS":
      return state.merge(
        {
          answers: {
            data: pathOr([], ["value0"], action.payload),
            totalCount: pathOr([], ["value1"], action.payload)
          }
        },
        { deep: true }
      );
    case "answers/CREATE_ANSWER_LOADING":
      return state.merge(
        { loadingCreateAnswer: action.payload },
        { deep: true }
      );
    case "answers/CREATE_ANSWER":
      return state.merge({ newAnswerId: action.payload }, { deep: true });
    case "answers/VOTE_ANSWER":
      return state.merge(
        {
          answers: {
            ...currentAnswers,
            data: currentAnswers.data.map(answer => {
              if (answer.modelId !== action.payload.answerId) {
                return answer;
              }
              let voteCount = 0;

              if (action.payload.isUpVote) {
                voteCount = answer.voteStatus === VOTE_SATUS.NO_VOTE ? 1 : 2;
              } else {
                voteCount = answer.voteStatus === VOTE_SATUS.NO_VOTE ? -1 : -2;
              }

              return {
                ...answer,
                score: answer.score + voteCount,
                voteStatus: action.payload.isUpVote
                  ? VOTE_SATUS.UPVOTE
                  : VOTE_SATUS.DOWNVOTE
              };
            })
          }
        },
        { deep: true }
      );
    case "answers/EDIT_ANSWER":
      return state.merge(
        {
          answers: {
            ...currentAnswers,
            data: currentAnswers.data.map(answer => {
              if (answer.modelId !== action.payload.modelId) {
                return answer;
              }
              return {
                ...answer,
                answerText: action.payload.answerText
              };
            })
          }
        },
        { deep: true }
      );
    case "answers/MARK_AS_CORRECT_ANSWER":
      return state.merge(
        {
          answers: {
            ...currentAnswers,
            data: currentAnswers.data.map(answer => {
              return {
                ...answer,
                correct: action.payload.modelId === answer.modelId
              }
            })
          }
        }
      );
    default:
      return state;
  }
}

export const loadingAnswers = createAction("answers/GET_ANSWERS_LOADING");
export const setAnswers = createAction("answers/ANSWERS");
export const loadingCreateAnswer = createAction(
  "answers/CREATE_ANSWER_LOADING"
);
export const createAnswer = createAction("answers/CREATE_ANSWER");
export const applyAnswerVote = createAction("answers/VOTE_ANSWER");
export const applyAnswerEdit = createAction("answers/EDIT_ANSWER");
export const markCorrectAnswer = createAction("answers/MARK_AS_CORRECT_ANSWER");

export const getAnswers = params => {
  return dispatch => {
    dispatch(loadingAnswers(true));
    return Answers.getAnswers(params)
      .then(resp => {
        dispatch(loadingAnswers(false));
        dispatch(setAnswers(resp.data));
      })
      .catch(err => {
        dispatch(loadingAnswers(false));
        NotificationManager.error(
          `We've encountered some troubles getting the answers for this question. Please try again. Error: ${err.message}`
        );
      });
  };
};

export const addAnswer = params => {
  return dispatch => {
    dispatch(loadingCreateAnswer(true));
    return Answers.addAnswer(params)
      .then(resp => {
        dispatch(loadingCreateAnswer(false));
        dispatch(createAnswer(resp.data));
        NotificationManager.success("Your answer was posted.");
      })
      .catch(err => {
        dispatch(loadingCreateAnswer(false));
        NotificationManager.error(
          `We've encountered some troubles adding your answer. Please try again. Error: ${err.message}`
        );
      });
  };
};

export const voteAnswer = params => {
  return dispatch => {
    return Answers.voteAnswer(params)
      .then(resp => {
        dispatch(applyAnswerVote(params));
      })
      .catch(err => {
        NotificationManager.error(
          `Error encountered while request. Error: ${err.message}`
        );
      });
  };
};

export const deleteAnswer = params => {
  return dispatch => {
    return Answers.deleteAnswer(params)
      .then(resp => {
        NotificationManager.success("Answer successfully deleted.");
      })
      .catch(err => {
        NotificationManager.error(
          `Could not delete answer. Error: ${err.message}`
        );
      });
  };
};

export const editAnswer = params => {
  return dispatch => {
    return Answers.updateAnswer(params)
      .then(resp => {
        dispatch(applyAnswerEdit(params));
      })
      .catch(err => {
        NotificationManager.error(
          `Error encountered while editing. Error: ${err.message}`
        );
      });
  };
};

export const markAsCorrect = params => {
  return dispatch => {
    return Answers.markAnswerAsCorrect(params)
      .then(() => {
        // TODO: Change in store the updated answer!
        NotificationManager.success('The answer is succesfully marked as correct');
        dispatch(markCorrectAnswer(params));
      })
      .catch(err => {
        NotificationManager.error(
          `Error encountered while marking answer as correct. Error: ${err.message}`
        );
      });
  }
}
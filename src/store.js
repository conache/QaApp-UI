/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */

import {
    compose,
    createStore,
    applyMiddleware,
    combineReducers,
  } from 'redux';
  import thunk from 'redux-thunk';
  import Immutable from 'seamless-immutable';
  
  import app from './ducks/app';
  import user from './ducks/user';
  import tags from './ducks/tags';
  import search from './ducks/search';
  import questions from './ducks/questions';
  import answers from './ducks/answers';

  const initialState = Immutable({
    app: {
      appLoading: false,
      appErrors: []
    },
    user: {
      loading: false,
    }
  });
  
  // A Middleware got logging 
  const logger = store => next => (action) => {
    const result = next(action);
  
    console.groupCollapsed('[ACTION]', action.type);
    console.log('Payload:', action.payload);
  
    console.log('State:', store.getState());
    console.groupEnd('[ACTION]', action.type);
  
    return result;
  };
  
  // Here goes all reducers
  const reducer = combineReducers(Object.assign({}, {
    app,
    user,
    tags,
    search,
    questions,
    answers
  }));
  
  const middlewares = [thunk];
  middlewares.push(logger);

  
  let finalCreateStore = compose(applyMiddleware(...middlewares));
  
  finalCreateStore = finalCreateStore(createStore);
  
  const store = finalCreateStore(reducer, initialState);
  
  export default store;
  
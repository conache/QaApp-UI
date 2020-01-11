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
  
  const initialState = Immutable({
    app: {
      appLoading: false,
    },
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
  }));
  
  const middlewares = [thunk];
  middlewares.push(logger);

  
  let finalCreateStore = compose(applyMiddleware(...middlewares));
  
  finalCreateStore = finalCreateStore(createStore);
  
  const store = finalCreateStore(reducer, initialState);
  
  export default store;
  
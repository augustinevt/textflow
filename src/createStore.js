import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import documentReducer from './documents/operations/reducers';
import rootSaga from './saga';

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({
      document: documentReducer
    }),
    applyMiddleware(logger, sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default makeStore;

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducer from './documents/operations/reducers';
import rootSaga from './saga';

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    applyMiddleware(logger, sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default makeStore;
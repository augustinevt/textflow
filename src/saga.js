import articleSaga from './documents/operations/sagas';
import { fork, all } from 'redux-saga/effects';

function* rootSaga () {
  yield all([
    fork(articleSaga),
  ])
}

export default rootSaga;
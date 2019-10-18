import { call, put, takeEvery } from 'redux-saga/effects';
import api from './../../api.mock.js';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchDocuments(action) {
  try {
    const documents = yield call(api.dummyDocumentList);
    yield put({type: "DOCUMENTS_FETCH_SUCCEEDED", payload: {documents}});
  } catch (e) {
    yield put({type: "DOCUMENTS_FETCH_FAILED", message: e.message});
  }
}

export function* fetchDocument(action) {
  try {
    const documents = yield call(api.getDocumentList);
    yield put({type: "DOCUMENT_FETCH_SUCCEEDED", payload: {documents}});
  } catch (e) {
    yield put({type: "DOCUMENT_FETCH_FAILED", message: e.message});
  }
}

function* mySaga() {
  yield takeEvery("DOCUMENTS_FETCH_REQUESTED", fetchDocuments);
  yield takeEvery("DOCUMENTS_FETCH_REQUESTED", fetchDocument);
}

export default mySaga;
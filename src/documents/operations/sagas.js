import { call, put, takeLatest } from 'redux-saga/effects'

import uuid from 'uuid'

import api from './../../api.mock.js'

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

export function* documentItemAdd(action) {
  try {
    // const documents = yield call(api.dummyDocumentList);
    const id = uuid()
    const payload = {...action.payload}
    payload.loc.id = id
    payload.item.id = id

    yield put({type: "DOCUMENT_ITEM_ADD", payload});
  } catch (e) {
    console.log('document item add failed...', e)
  }
}

export function* documentItemRemove(action) {
  try {
    // const documents = yield call(api.dummyDocumentList);
    const payload = {...action.payload}

    yield put({type: "DOCUMENT_ITEM_REMOVE", payload});
  } catch (e) {
    console.log('document item add failed...', e)
  }
}

export function* documentItemUpdate(action) {
  try {
    // const documents = yield call(api.dummyDocumentList);
    const payload = {...action.payload}

    yield put({type: "DOCUMENT_ITEM_UPDATE", payload});
  } catch (e) {
    console.log('document item add failed...', e)
  }
}

function* mySaga() {
  yield takeLatest("DOCUMENTS_FETCH_REQUESTED", fetchDocuments);
  yield takeLatest("DOCUMENTS_FETCH_REQUESTED", fetchDocument);
  yield takeLatest("DOCUMENTS_ITEM_ADD", documentItemAdd);
  yield takeLatest("DOCUMENTS_ITEM_REMOVE", documentItemRemove);
  yield takeLatest("DOCUMENTS_ITEM_UPDATE", documentItemUpdate);
}

export default mySaga;
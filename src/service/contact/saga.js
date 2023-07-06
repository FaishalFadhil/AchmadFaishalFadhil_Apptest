import {put, takeLatest} from 'redux-saga/effects';
import {
  fetchContactListSuccess,
  fetchContactListFailure,
  fetchContactByIdSuccess,
  fetchContactByIdFailure,
  createContactSuccess,
  createContactFailure,
  updateContactSuccess,
  updateContactFailure,
  deleteContactSuccess,
  deleteContactFailure,
} from './actions';
import axios from 'axios';

function* fetchContactSaga() {
  try {
    const response = yield axios.get('https://contact.herokuapp.com/contact');
    yield put(fetchContactListSuccess(response.data.data));
  } catch (error) {
    yield put(fetchContactListFailure(error.message));
  }
}

function* fetchContactIdSaga({payload}) {
  try {
    const response = yield axios.get(
      `https://contact.herokuapp.com/contact/${payload}`,
    );
    yield put(fetchContactByIdSuccess(response.data.data));
  } catch (error) {
    yield put(fetchContactByIdFailure(error.message));
  }
}

function* createContactSaga({payload}) {
  try {
    const response = yield axios.post(
      'https://contact.herokuapp.com/contact',
      payload,
    );
    yield put(createContactSuccess(response.data));
  } catch (error) {
    yield put(createContactFailure(error.message));
  }
}

function* updateContactSaga({payload}) {
  try {
    const response = yield axios.put(
      `https://contact.herokuapp.com/contact/${payload.id}`,
      payload.body,
    );
    yield put(updateContactSuccess(response.data));
  } catch (error) {
    yield put(updateContactFailure(error.message));
  }
}

function* deleteContactSaga({payload}) {
  try {
    const response = yield axios.delete(
      `https://contact.herokuapp.com/contact/${payload.id}`,
    );
    yield put(deleteContactSuccess(response.data));
  } catch (error) {
    yield put(deleteContactFailure(error.message));
  }
}

export function* watchDataSaga() {
  yield takeLatest('FETCH_CONTACT', fetchContactSaga);
  yield takeLatest('FETCH_CONTACT_ID', fetchContactIdSaga);
  yield takeLatest('CREATE_CONTACT', createContactSaga);
  yield takeLatest('UPDATE_CONTACT', updateContactSaga);
  yield takeLatest('DELETE_CONTACT', deleteContactSaga);
}

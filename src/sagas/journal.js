import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_JOURNALS,
  POST_JOURNAL,
  GET_JOURNAL_CATEGORIES,
  DELETE_JOURNAL,
  SHARE_JOURNAL,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {userChallengeSuccess} from '../actions/ChallengeActions';
import {
  GET_JOURNALS as GET_JOURNALS_URL,
  POST_JOURNAL as POST_JOURNAL_URL,
  GET_JOURNAL_CATEGORIES as GET_JOURNAL_CATEGORIES_URL,
  DELETE_JOURNAL as DELETE_JOURNAL_URL,
  SHARE_JOURNAL as SHARE_JOURNAL_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import DataHandler from '../services/DataHandler';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}
function* postJournal() {
  while (true) {
    const {payload, responseCallback} = yield take(POST_JOURNAL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_JOURNAL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        //  alert(response.message, 'success');

        if (responseCallback) responseCallback(response.data, response.data);
      } else {
        if (responseCallback) responseCallback(null, null);
        // alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* getJournal() {
  while (true) {
    const {responseCallback} = yield take(GET_JOURNALS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_JOURNALS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        //  alert(response.message, 'success');

        if (responseCallback) responseCallback(response.data, response.data);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* deleteJournal() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_JOURNAL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_JOURNAL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        //  alert(response.message, 'success');

        if (responseCallback) responseCallback(response.data, response.data);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* getJournalCategories() {
  while (true) {
    const {responseCallback} = yield take(GET_JOURNAL_CATEGORIES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_JOURNAL_CATEGORIES_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        //  alert(response.message, 'success');

        if (responseCallback) responseCallback(response.data, response.data);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* shareJournal() {
  while (true) {
    const {payload, responseCallback} = yield take(SHARE_JOURNAL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SHARE_JOURNAL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        //  alert(response.message, 'success');

        if (responseCallback) responseCallback(response.data, response.data);
      } else {
        if (responseCallback) responseCallback(null, null);
        // alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
export default function* root() {
  yield fork(postJournal);
  yield fork(getJournal);
  yield fork(deleteJournal);
  yield fork(getJournalCategories);
  yield fork(shareJournal);
}

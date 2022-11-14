import {take, put, call, fork} from 'redux-saga/effects';
import {
  CONTENT,
  HELP_FEEDBACK,
  HOTLINES,
  GET_NOTIFICATIONS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import // termsSuccess,
// aboutSuccess,
// privacySuccess,
// contactUsSuccess,
'../actions/AppInfoActions';
import {
  // PRIVACY_POLICY as PRIVACY_POLICY_URL,
  // ABOUT_US as ABOUT_US_URL,
  // TERMS_AND_CONDITION as TERMS_AND_CONDITION_URL,
  // CONTACT_US as CONTACT_US_URL,
  CONTENT as CONTENT_URL,
  HELP_FEEDBACK as HELP_FEEDBACK_URL,
  HOTLINES as HOTLINES_URL,
  GET_NOTIFICATIONS as GET_NOTIFICATIONS_URL,
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

function* helpFeedback() {
  while (true) {
    const {payload, responseCallback} = yield take(HELP_FEEDBACK.REQUEST);
    try {
      const response = yield call(
        callRequest,
        HELP_FEEDBACK_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* hotlines() {
  while (true) {
    const {responseCallback} = yield take(HOTLINES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        HOTLINES_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* content() {
  while (true) {
    const {payload, responseCallback} = yield take(CONTENT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CONTENT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* notifications() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_NOTIFICATIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_NOTIFICATIONS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
export default function* root() {
  // yield fork(termsrequest);
  // yield fork(aboutusrequest);
  // yield fork(privacypolicyRequest);
  // yield fork(contactUSRequest);
  yield fork(helpFeedback);
  yield fork(hotlines);
  yield fork(content);
  yield fork(notifications);
}

import {take, put, call, fork} from 'redux-saga/effects';
import {
  UPLOAD_MEDIA,
  GET_MEDIA,
  FOLLOW,
  VIEW_PROFILE,
  SHARE_POST,
  ENCOURAGE_LIST,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {
  UPLOAD_MEDIA as UPLOAD_MEDIA_URL,
  GET_MEDIA as GET_MEDIA_URL,
  FOLLOW as FOLLOW_URL,
  VIEW_PROFILE as VIEW_PROFILE_URL,
  SHARE_POST as SHARE_POST_URL,
  ENCOURAGE_LIST as ENCOURAGE_LIST_URL,
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

function* uploadMedia() {
  while (true) {
    const {payload, responseCallback} = yield take(UPLOAD_MEDIA.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPLOAD_MEDIA_URL,
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
function* getMedia() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_MEDIA.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_MEDIA_URL,
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
function* follow() {
  while (true) {
    const {payload, responseCallback} = yield take(FOLLOW.REQUEST);
    try {
      const response = yield call(
        callRequest,
        FOLLOW_URL,
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
function* viewProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(VIEW_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        VIEW_PROFILE_URL,
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
function* sharePost() {
  while (true) {
    const {payload, responseCallback} = yield take(SHARE_POST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SHARE_POST_URL,
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
function* encourageList() {
  while (true) {
    const {payload, responseCallback} = yield take(ENCOURAGE_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ENCOURAGE_LIST_URL,
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
export default function* root() {
  yield fork(uploadMedia);
  yield fork(getMedia);
  yield fork(follow);
  yield fork(viewProfile);
  yield fork(sharePost);
  yield fork(encourageList);
}

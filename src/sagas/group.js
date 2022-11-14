import {take, put, call, fork} from 'redux-saga/effects';
import {CREATE_GROUP, PRAYER_GROUP, JOIN_GROUP} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {userChallengeSuccess} from '../actions/ChallengeActions';
import {
  CREATE_GROUP as CREATE_GROUP_URL,
  PRAYER_GROUP as PRAYER_GROUP_URL,
  JOIN_GROUP as JOIN_GROUP_URL,
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

function* createGroup() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_GROUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CREATE_GROUP_URL,
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
function* prayerGroup() {
  while (true) {
    const {responseCallback} = yield take(PRAYER_GROUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        PRAYER_GROUP_URL,
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
function* joinGroup() {
  while (true) {
    const {payload, responseCallback} = yield take(JOIN_GROUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        JOIN_GROUP_URL,
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
  yield fork(createGroup);
  yield fork(prayerGroup);
  yield fork(joinGroup);
}

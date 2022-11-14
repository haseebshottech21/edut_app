import {take, put, call, fork} from 'redux-saga/effects';
import {
  USER_CHALLENGE,
  TAKE_CHALLENGE,
  CHALLENGE_STATUS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {userChallengeSuccess} from '../actions/ChallengeActions';
import {
  USER_CHALLENGE as USER_CHALLENGE_URL,
  TAKE_CHALLENGE as TAKE_CHALLENGE_URL,
  CHALLENGE_STATUS as CHALLENGE_STATUS_URL,
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
function* challenge() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_CHALLENGE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_CHALLENGE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        //  alert(response.message, 'success');

        if (responseCallback) responseCallback(response.data, response.data);

        yield put(userChallengeSuccess(response.data, responseCallback));
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(userChallengeSuccess([], null));
        // alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* AcceptChallenge() {
  while (true) {
    const {payload, responseCallback} = yield take(TAKE_CHALLENGE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        TAKE_CHALLENGE_URL,
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
function* ChallengeStatus() {
  while (true) {
    const {payload, responseCallback} = yield take(CHALLENGE_STATUS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHALLENGE_STATUS_URL,
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
  yield fork(challenge);
  yield fork(AcceptChallenge);
  yield fork(ChallengeStatus);
}

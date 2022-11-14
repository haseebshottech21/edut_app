// @flow

import {USER_CHALLENGE, TAKE_CHALLENGE, CHALLENGE_STATUS} from './ActionTypes';

export function userChallengeRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_CHALLENGE.REQUEST,
  };
}

export function userChallengeSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    // save_token,
    type: USER_CHALLENGE.SUCCESS,
  };
}
export function userTakeChallengeRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: TAKE_CHALLENGE.REQUEST,
  };
}
export function userChallengeStatusRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHALLENGE_STATUS.REQUEST,
  };
}

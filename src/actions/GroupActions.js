// @flow

import {CREATE_GROUP, PRAYER_GROUP, JOIN_GROUP} from './ActionTypes';

export function createGroupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_GROUP.REQUEST,
  };
}
export function prayerGroupRequest(responseCallback) {
  return {
    responseCallback,
    type: PRAYER_GROUP.REQUEST,
  };
}
export function joinGroupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: JOIN_GROUP.REQUEST,
  };
}

// @flow

import {
  UPLOAD_MEDIA,
  GET_MEDIA,
  FOLLOW,
  VIEW_PROFILE,
  share,
  SHARE_POST,
  ENCOURAGE_LIST,
} from './ActionTypes';

export function uploadMediaRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPLOAD_MEDIA.REQUEST,
  };
}
export function getMediaRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_MEDIA.REQUEST,
  };
}
export function followPeopleRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: FOLLOW.REQUEST,
  };
}
export function viewProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: VIEW_PROFILE.REQUEST,
  };
}

export function sharePostRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SHARE_POST.REQUEST,
  };
}

export function encouragerListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ENCOURAGE_LIST.REQUEST,
  };
}

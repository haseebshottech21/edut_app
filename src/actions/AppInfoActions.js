// @flow

import {
  CONTENT,
  HOTLINES,
  HELP_FEEDBACK,
  GET_NOTIFICATIONS,
} from './ActionTypes';

export function getContentRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CONTENT.REQUEST,
  };
}
export function getHotlinesRequest(responseCallback) {
  return {
    responseCallback,
    type: HOTLINES.REQUEST,
  };
}

export function helpFeedBackRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: HELP_FEEDBACK.REQUEST,
  };
}
export function getNotificationsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_NOTIFICATIONS.REQUEST,
  };
}

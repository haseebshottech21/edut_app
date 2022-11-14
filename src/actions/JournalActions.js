// @flow

import {
  GET_JOURNALS,
  POST_JOURNAL,
  GET_JOURNAL_CATEGORIES,
  DELETE_JOURNAL,
  SHARE_JOURNAL,
} from './ActionTypes';

export function getJournalRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_JOURNALS.REQUEST,
  };
}

export function postJournalRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_JOURNAL.REQUEST,
  };
}
export function getJournalCategories(responseCallback) {
  return {
    responseCallback,
    type: GET_JOURNAL_CATEGORIES.REQUEST,
  };
}
export function deleteJournalRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_JOURNAL.REQUEST,
  };
}

export function shareJournalRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SHARE_JOURNAL.REQUEST,
  };
}

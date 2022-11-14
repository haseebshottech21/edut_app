// @flow

import {
  CREATE_CUSTOMER,
  CREATE_TOKEN,
  CREATE_CARD,
  CARD_LIST,
  DELETE_CARD,
} from './ActionTypes';

export function createStripeCusRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_CUSTOMER.REQUEST,
  };
}

export function createtokenRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_TOKEN.REQUEST,
  };
}

export function createcardRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_CARD.REQUEST,
  };
}
export function getCardListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CARD_LIST.REQUEST,
  };
}
export function deleteCardRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_CARD.REQUEST,
  };
}

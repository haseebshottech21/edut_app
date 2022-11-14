import {take, put, call, fork} from 'redux-saga/effects';
import {
  CREATE_CUSTOMER,
  CREATE_TOKEN,
  CREATE_CARD,
  CARD_LIST,
  DELETE_CARD,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {userChallengeSuccess} from '../actions/ChallengeActions';
import {
  CREATE_CUSTOMER as CREATE_CUSTOMER_URL,
  CREATE_CARD as CREATE_CARD_URL,
  CREATE_TOKEN as CREATE_TOKEN_URL,
  CARD_LIST as CARD_LIST_URL,
  DELETE_CARD as DELETE_CARD_URL,
  callRequest,
  STRIPE_BASE_URL,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import DataHandler from '../services/DataHandler';
import util from '../util';
import store from '../store';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}
let headers = {
  Authorization:
    'Bearer ' +
    'sk_test_51H0UoCJELxddsoRYdF40WwR8HUvA8U5wgUNqQwDCweZT4TnbAuIGINVtVWAItPMcSoMOighLxdZR1Jjl8vdUwldb00EMPAVgIE',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
};
function* createCustomer() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_CUSTOMER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CREATE_CUSTOMER_URL,
        payload,
        '',
        headers,
        ApiSauce,
        STRIPE_BASE_URL,
      );
      console.log(response);
      if (response) {
        if (responseCallback) responseCallback(response.id, response.id);
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
function* createToken() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_TOKEN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CREATE_TOKEN_URL,
        payload,
        '',
        headers,
        ApiSauce,
        STRIPE_BASE_URL,
      );
      console.log('>>>>>>>>>>>>', response);
      if (response) {
        if (responseCallback) responseCallback(response.id, response.id);
      } else if (response.error) {
        if (responseCallback) responseCallback(null, null);
        alert('Please provide all details Correct');
      }
    } catch (err) {
      console.log(err);
      if (responseCallback) responseCallback(null, null);
      alert(err.error.code);
    }
  }
}
function* createCard() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_CARD.REQUEST);
    const parameters = Util.getCurrentUserStripeToken() + '/sources';

    try {
      const response = yield call(
        callRequest,
        CREATE_CARD_URL,
        payload,
        parameters,
        headers,
        ApiSauce,
        STRIPE_BASE_URL,
      );
      console.log(response);
      if (response) {
        if (responseCallback) responseCallback(response.id, response.id);
      } else {
        if (responseCallback) responseCallback(null, null);
        // alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      // alert(Util.getErrorText(err.message));
    }
  }
}
function* getCardList() {
  while (true) {
    const {payload, responseCallback} = yield take(CARD_LIST.REQUEST);
    const parameters = Util.getCurrentUserStripeToken() + '/sources';

    try {
      const response = yield call(
        callRequest,
        CARD_LIST_URL,
        {},
        parameters,
        headers,
        ApiSauce,
        STRIPE_BASE_URL,
      );
      console.log(response);
      if (response.problem == null) {
        if (responseCallback) responseCallback(response.data, response.data);
      } else {
        if (responseCallback) responseCallback(null, null);
        // alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      // alert(Util.getErrorText(err.message));
    }
  }
}
function* deleteCard() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_CARD.REQUEST);
    const parameters =
      Util.getCurrentUserStripeToken() + '/sources' + '/' + payload.card_id;

    try {
      const response = yield call(
        callRequest,
        DELETE_CARD_URL,
        {},
        parameters,
        headers,
        ApiSauce,
        STRIPE_BASE_URL,
      );
      console.log(response);
      if (response.problem == null) {
        if (responseCallback) responseCallback(response, response);
      } else {
        if (responseCallback) responseCallback(null, null);
        // alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      // alert(Util.getErrorText(err.message));
    }
  }
}
export default function* root() {
  yield fork(createCustomer);
  yield fork(createToken);
  yield fork(createCard);
  yield fork(getCardList);
  yield fork(deleteCard);
}

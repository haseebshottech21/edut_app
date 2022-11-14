import { take, call, fork } from 'redux-saga/effects';
import { GET_USERS, SEARCH_USERS, POST_CHAT_ATTACHMENTS } from '../actions/ActionTypes';
import { SAGA_ALERT_TIMEOUT } from '../constants';
import {
    GET_USERS as GET_USERS_URL,
    POST_CHAT_ATTACHMENTS as POST_CHAT_ATTACHMENTS_URL,
    callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';

function alert(message, type = 'error') {
    setTimeout(() => {
        Util.topAlert(message, type);
    }, SAGA_ALERT_TIMEOUT);
}

function* getAllUsers() {
    while (true) {
        const { payload, responseCallback } = yield take(GET_USERS.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_USERS_URL,
                payload,
                '',
                {},
                ApiSauce,
            );
            if (response.status == 1) {

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
function* getSearchUsers() {
    while (true) {
        const { payload, responseCallback } = yield take(SEARCH_USERS.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_USERS_URL,
                payload,
                '',
                {},
                ApiSauce,
            );
            if (response.status == 1) {

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
function* postChatAttachments() {
    while (true) {
        const { payload, responseCallback } = yield take(POST_CHAT_ATTACHMENTS.REQUEST);
        try {
            const response = yield call(
                callRequest,
                POST_CHAT_ATTACHMENTS_URL,
                payload,
                '',
                {},
                ApiSauce,
            );
            if (response.status == 1) {

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
    yield fork(getAllUsers);
    yield fork(getSearchUsers);
    yield fork(postChatAttachments);
}

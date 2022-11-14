// @flow

import { GET_USERS, SEARCH_USERS,POST_CHAT_ATTACHMENTS } from './ActionTypes';

export function getAllUsers(responseCallback) {
    return {
        responseCallback,
        type: GET_USERS.REQUEST,
    };
}
export function getSearchUsers(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: SEARCH_USERS.REQUEST,
    };
}
export function postChatAttachments(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: POST_CHAT_ATTACHMENTS.REQUEST,
    };
}


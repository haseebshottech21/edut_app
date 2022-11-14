// @flow

import {
  GET_SOCKET_REF,
  SELECT_USER_TYPE,
  USER_SIGNIN,
  USER_SIGNUP,
  USER_FORGOT_PASSWORD,
  UPDATE_PASSWORD,
  RESET_PASSWORD,
  USER_SIGNOUT,
  OTP_VERIFY,
  RESEND_OTP,
  COMPLETE_PROFILE,
  SOCIAL_LOGIN,
  GET_POSTS,
  CREATE_POST,
  GET_PEOPLES,
  LIKE_POST,
  GET_COMMENTS,
  POST_COMMENTS,
  UPDATE_POST,
  SPECIALTIES,
  BOOKING_SESSION,
  BOOKING_LIST,
  UPDATE_BOOKING_SESSION,
  PAYMENT_HISTORY,
  START_SESSION,
  REQUEST_TO_START_SESSION,
  REQUEST_TO_END_SESSION,
} from './ActionTypes';

export function selectUserType(payload) {
  return {
    payload,
    type: SELECT_USER_TYPE,
  };
}
export function storeSocketRef(payload) {
  return {
    payload,
    type: GET_SOCKET_REF,
  };
}

export function userSignOutRequest(responseCallback) {
  return {
    responseCallback,
    type: USER_SIGNOUT.REQUEST,
  };
}

export function userSignOutSuccess() {
  return {
    type: USER_SIGNOUT.SUCCESS,
  };
}
export function userSigninRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNIN.REQUEST,
  };
}

export function userSigninSuccess(data, access_token, payload) {
  return {
    data,
    access_token,
    payload,
    // save_token,
    type: USER_SIGNIN.SUCCESS,
  };
}
export function userSignupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNUP.REQUEST,
  };
}

export function userSignupSuccess(data) {
  return {
    data,
    type: USER_SIGNUP.SUCCESS,
  };
}
export function forgotPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_FORGOT_PASSWORD.REQUEST,
  };
}
export function updatePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_PASSWORD.REQUEST,
  };
}
export function resetPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: RESET_PASSWORD.REQUEST,
  };
}
export function verifyOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: OTP_VERIFY.REQUEST,
  };
}
export function resendOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: RESEND_OTP.REQUEST,
  };
}

export function completeProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: COMPLETE_PROFILE.REQUEST,
  };
}
export function completeProfileSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: COMPLETE_PROFILE.SUCCESS,
  };
}
export function socialSigninRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SOCIAL_LOGIN.REQUEST,
  };
}

export function socialSigninSuccess(data, access_token, payload) {
  return {
    data,
    access_token,
    payload,
    // save_token,
    type: SOCIAL_LOGIN.SUCCESS,
  };
}

export function getPostRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_POSTS.REQUEST,
  };
}

export function getPostSuccess(data, payload, responseCallback) {
  return {
    data,
    payload,
    responseCallback,
    // save_token,
    type: GET_POSTS.SUCCESS,
  };
}
export function createPostRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_POST.REQUEST,
  };
}
export function updatePostRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_POST.REQUEST,
  };
}
export function getPeoplesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_PEOPLES.REQUEST,
  };
}

export function likePostRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: LIKE_POST.REQUEST,
  };
}
export function likePostSuccess(data, payload) {
  return {
    data,
    payload,
    type: LIKE_POST.SUCCESS,
  };
}
export function getCommentsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_COMMENTS.REQUEST,
  };
}
export function postCommentRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_COMMENTS.REQUEST,
  };
}
export function getSpecialtiesRequest(responseCallback) {
  return {
    responseCallback,
    type: SPECIALTIES.REQUEST,
  };
}
export function bookSessionRequest(payload, responseCallback) {
  return {
    responseCallback,
    payload,
    type: BOOKING_SESSION.REQUEST,
  };
}
export function updateBookSessionRequest(payload, responseCallback) {
  return {
    responseCallback,
    payload,
    type: UPDATE_BOOKING_SESSION.REQUEST,
  };
}
export function bookingsRequest(payload, responseCallback) {
  return {
    responseCallback,
    payload,
    type: BOOKING_LIST.REQUEST,
  };
}

export function getPaymentHistoryRequest(payload, responseCallback) {
  return {
    responseCallback,
    payload,
    type: PAYMENT_HISTORY.REQUEST,
  };
}
export function startSessionRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: START_SESSION.REQUEST,
  };
}
export function requestToStartSessionRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REQUEST_TO_START_SESSION.REQUEST,
  };
}

export function requestToEndSessionRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REQUEST_TO_END_SESSION.REQUEST,
  };
}

import {take, put, call, fork} from 'redux-saga/effects';
import {
  EMPTY,
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
  UPDATE_POST,
  GET_PEOPLES,
  LIKE_POST,
  GET_COMMENTS,
  POST_COMMENTS,
  SPECIALTIES,
  BOOKING_SESSION,
  BOOKING_LIST,
  UPDATE_BOOKING_SESSION,
  PAYMENT_HISTORY,
  START_SESSION,
  REQUEST_TO_START_SESSION,
  REQUEST_TO_END_SESSION,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {
  userSignupSuccess,
  userSigninSuccess,
  userSignOutSuccess,
  completeProfileSuccess,
  socialSigninSuccess,
  getPostSuccess,
  likePostSuccess,
} from '../actions/UserActions';
import {
  EMPTY as EMPTY_URL,
  USER_SIGNIN as USER_SIGNIN_URL,
  USER_SIGNUP as USER_SIGNUP_URL,
  USER_FORGOT_PASSWORD as USER_FORGOT_PASSWORD_URL,
  UPDATE_PASSWORD as UPDATE_PASSWORD_URL,
  RESET_PASSWORD as RESET_PASSWORD_URL,
  USER_SIGNOUT as USER_SIGNOUT_URL,
  OTP_VERIFY as OTP_VERIFY_URL,
  RESEND_OTP as RESEND_OTP_URL,
  COMPLETE_PROFILE as COMPLETE_PROFILE_URL,
  SOCIAL_LOGIN as SOCIAL_LOGIN_URL,
  GET_POSTS as GET_POSTS_URL,
  CREATE_POST as CREATE_POST_URL,
  UPDATE_POST as UPDATE_POST_URL,
  GET_PEOPLES as GET_PEOPLES_URL,
  LIKE_POST as LIKE_POST_URL,
  GET_COMMENTS as GET_COMMENTS_URL,
  POST_COMMENTS as POST_COMMENTS_URL,
  SPECIALTIES as SPECIALTIES_URL,
  BOOKING_SESSION as BOOKING_SESSION_URL,
  BOOKING_LIST as BOOKING_LIST_URL,
  UPDATE_BOOKING_SESSION as UPDATE_BOOKING_SESSION_URL,
  PAYMENT_HISTORY as PAYMENT_HISTORY_URL,
  START_SESSION as START_SESSION_URL,
  REQUEST_TO_START_SESSION as REQUEST_TO_START_SESSION_URL,
  REQUEST_TO_END_SESSION as REQUEST_TO_END_SESSION_URL,
  SESSION_BASE_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import DataHandler from '../services/DataHandler';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}
let headers = {};
function* signin() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log('response', response);
      if (response.status == 1 && response.data.email_verified == 1) {
        if (responseCallback) responseCallback(response.data, null);
        yield put(
          userSigninSuccess(response.data, response.brear_token, payload),
        );
      } else if (response.status == 1 && response.data.email_verified == 0) {
        if (responseCallback) responseCallback(response.data, null);
        alert(response.message);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      console.log(err, 'check');
      alert(Util.getErrorText(err.error));
    }
  }
}
function* signup() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        //  alert(response.message, 'success');

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
function* completeProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(COMPLETE_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        COMPLETE_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log('response', response);
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, null);
        yield put(completeProfileSuccess(response.data));
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      console.log(err, 'check');
      alert(Util.getErrorText(err.error));
    }
  }
}
function* forgotPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_FORGOT_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_FORGOT_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'fotgot response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
        // alert(response.message, (type = 'success'));
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
function* updatePassword() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'fotgot response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(true, null);
        // alert(response.message, (type = 'success'));
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
function* resetPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(RESET_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        RESET_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'reset response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(true, null);
        // alert(response.message, (type = 'success'));
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
function* signout() {
  while (true) {
    const {responseCallback} = yield take(USER_SIGNOUT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNOUT_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        if (responseCallback) responseCallback(true, null);
        yield put(userSignOutSuccess());
      } else {
        alert('Something went wrong');
        yield put(userSignOutSuccess());
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
      yield put(userSignOutSuccess());
    }
  }
}
function* verifyOtp() {
  while (true) {
    const {payload, responseCallback} = yield take(OTP_VERIFY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        OTP_VERIFY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'veirfy response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(response, response);
        yield put(
          userSigninSuccess(response.data, response.brear_token, payload),
        );
        // alert(response.message, (type = 'success'));
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
function* resendOtp() {
  while (true) {
    const {payload, responseCallback} = yield take(RESEND_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        RESEND_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'veirfy response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(response, response);
        // alert(response.message, (type = 'success'));
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
function* socialLogin() {
  while (true) {
    const {payload, responseCallback} = yield take(SOCIAL_LOGIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SOCIAL_LOGIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log('response', response);
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, null);
        yield put(userSigninSuccess(response.data, response.bearer_token));
      } else if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, null);
        alert(response.message);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      console.log(err, 'check');
      alert(Util.getErrorText(err.error));
    }
  }
}
function* Posts() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_POSTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_POSTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log('response', response);
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, null);
        yield put(getPostSuccess(response.data, payload));
      } else {
        if (responseCallback) responseCallback(null, null);
        yield put(getPostSuccess([], payload));

        //   alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      console.log(err, 'check');
      alert(Util.getErrorText(err.error));
    }
  }
}
function* createPost() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_POST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CREATE_POST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'post create response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
        // alert(response.message, (type = 'success'));
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
function* updatePost() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_POST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_POST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'post create response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
        // alert(response.message, (type = 'success'));
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

function* getUsers() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_PEOPLES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PEOPLES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        //  alert(response.message, 'success');

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
function* PostComment() {
  while (true) {
    const {payload, responseCallback} = yield take(POST_COMMENTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_COMMENTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'comment create response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
        // alert(response.message, (type = 'success'));
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
function* likePost() {
  while (true) {
    const {payload, responseCallback} = yield take(LIKE_POST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        LIKE_POST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
        yield put(likePostSuccess(response.data, payload));
        // alert(response.message, (type = 'success'));
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
function* comments() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_COMMENTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_COMMENTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'get comments  response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
        // alert(response.message, (type = 'success'));
      } else {
        if (responseCallback) responseCallback(null, null);
        //  alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* specialties() {
  while (true) {
    const {responseCallback} = yield take(SPECIALTIES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SPECIALTIES_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'get comments  response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
        // alert(response.message, (type = 'success'));
      } else {
        if (responseCallback) responseCallback(null, null);
        //  alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* Booking() {
  while (true) {
    const {payload, responseCallback} = yield take(BOOKING_SESSION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        BOOKING_SESSION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'get comments  response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
        // alert(response.message, (type = 'success'));
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
function* updateBooking() {
  while (true) {
    const {payload, responseCallback} = yield take(
      UPDATE_BOOKING_SESSION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        UPDATE_BOOKING_SESSION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'get comments  response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
        // alert(response.message, (type = 'success'));
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
function* BookingList() {
  while (true) {
    const {payload, responseCallback} = yield take(BOOKING_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        BOOKING_LIST_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      console.log(response, 'get comments  response');
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
        // alert(response.message, (type = 'success'));
      } else {
        if (responseCallback) responseCallback(null, null);
        //  alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* paymentsHistory() {
  while (true) {
    const {payload, responseCallback} = yield take(PAYMENT_HISTORY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        PAYMENT_HISTORY_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      console.log(response, '');
      if (response.status == 1) {
        if (responseCallback) responseCallback(response.data, response.data);
        // alert(response.message, (type = 'success'));
      } else {
        if (responseCallback) responseCallback(null, null);
        //  alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* startSession() {
  while (true) {
    const {payload, responseCallback} = yield take(START_SESSION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        START_SESSION_URL,
        payload,
        '',
        {},
        ApiSauce,
        SESSION_BASE_URL,
      );
      console.log('responsessss', response);
      if (response) {
        if (responseCallback) responseCallback(response, response);
        // alert(response.message, (type = 'success'));
      } else {
        if (responseCallback) responseCallback(null, null);
        //  alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}
function* sessionStartRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(
      REQUEST_TO_START_SESSION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        REQUEST_TO_START_SESSION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        //  alert(response.message, 'success');

        if (responseCallback) responseCallback(true, true);
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
function* sessionEndRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(
      REQUEST_TO_END_SESSION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        REQUEST_TO_END_SESSION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status == 1) {
        //  alert(response.message, 'success');

        if (responseCallback) responseCallback(true, true);
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
  yield fork(signin);
  yield fork(signup);
  yield fork(forgotPassword);
  yield fork(updatePassword);
  yield fork(resetPassword);
  yield fork(signout);
  yield fork(verifyOtp);
  yield fork(resendOtp);
  yield fork(completeProfile);
  yield fork(socialLogin);
  yield fork(Posts);
  yield fork(createPost);
  yield fork(updatePost);
  yield fork(getUsers);
  yield fork(PostComment);
  yield fork(comments);
  yield fork(likePost);
  yield fork(specialties);
  yield fork(Booking);
  yield fork(BookingList);
  yield fork(updateBooking);
  yield fork(paymentsHistory);
  yield fork(startSession);
  yield fork(sessionStartRequest);
  yield fork(sessionEndRequest);
}

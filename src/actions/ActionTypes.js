// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}
//auth
export const USER_SIGNIN = createRequestTypes('USER_SIGNIN');
export const SOCIAL_LOGIN = createRequestTypes('SOCIAL_LOGIN');
export const USER_SIGNUP = createRequestTypes('USER_SIGNUP');
export const USER_FORGOT_PASSWORD = createRequestTypes('USER_FORGOT_PASSWORD');
export const UPDATE_PASSWORD = createRequestTypes('UPDATE_PASSWORD');
export const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD');
export const USER_SIGNOUT = createRequestTypes('USER_SIGNOUT');
export const OTP_VERIFY = createRequestTypes('OTP_VERIFY');
export const RESEND_OTP = createRequestTypes('RESEND_OTP');
export const COMPLETE_PROFILE = createRequestTypes('COMPLETE_PROFILE');
export const SPECIALTIES = createRequestTypes('SPECIALTIES');

// Challenge Module
export const USER_CHALLENGE = createRequestTypes('USER_CHALLENGE');
export const TAKE_CHALLENGE = createRequestTypes('TAKE_CHALLENGE');
export const CHALLENGE_STATUS = createRequestTypes('CHALLENGE_STATUS');

//Posts Apis
export const GET_POSTS = createRequestTypes('GET_POSTS');
export const CREATE_POST = createRequestTypes('CREATE_POST');
export const UPDATE_POST = createRequestTypes('UPDATE_POST');

export const LIKE_POST = createRequestTypes('LIKE_POST');
export const GET_COMMENTS = createRequestTypes('GET_COMMENTS');
export const POST_COMMENTS = createRequestTypes('POST_COMMENTS');

export const GET_PEOPLES = createRequestTypes('GET_PEOPLES');

//Journal APis
export const GET_JOURNALS = createRequestTypes('GET_JOURNALS');
export const GET_JOURNAL_CATEGORIES = createRequestTypes(
  'GET_JOURNAL_CATEGORIES',
);
export const POST_JOURNAL = createRequestTypes('POST_JOURNAL');
export const DELETE_JOURNAL = createRequestTypes('DELETE_JOURNAL');
export const SHARE_JOURNAL = createRequestTypes('SHARE_JOURNAL');

//Prayer Groups and Chat Apis
export const CREATE_GROUP = createRequestTypes('CREATE_GROUP');
export const PRAYER_GROUP = createRequestTypes('PRAYER_GROUP');
export const JOIN_GROUP = createRequestTypes('JOIN_GROUP');

export const NETWORK_INFO = 'NETWORK_INFO';

// help & Feed Back content
export const HELP_FEEDBACK = createRequestTypes('HELP_FEEDBACK');
export const CONTENT = createRequestTypes('CONTENT');
export const HOTLINES = createRequestTypes('HOTLINES');

// Profile Actions
export const UPLOAD_MEDIA = createRequestTypes('UPLOAD_MEDIA');
export const GET_MEDIA = createRequestTypes('GET_MEDIA');
export const FOLLOW = createRequestTypes('FOLLOW');
export const VIEW_PROFILE = createRequestTypes('VIEW_PROFILE');
export const SHARE_POST = createRequestTypes('SHARE_POST');
export const ENCOURAGE_LIST = createRequestTypes('ENCOURAGE_LIST');

// One To One Chat
export const GET_SOCKET_REF = 'GET_SOCKET_REF';
export const GET_USERS = createRequestTypes('GET_USERS');
export const SEARCH_USERS = createRequestTypes('SEARCH_USERS');
export const POST_CHAT_ATTACHMENTS = createRequestTypes('POST_CHAT_ATTACHMENTS');
// start new service here

// Client Side Actions

export const EMPTY = createRequestTypes('EMPTY');
export const SELECT_USER_TYPE = 'SELECT_USER_TYPE';
export const SELECT_SERVICE_TYPE = 'SELECT_SERVICE_TYPE';
export const SELECT_DESTINATION = 'SELECT_DESTINATION';

//Booking Session
export const BOOKING_SESSION = createRequestTypes('BOOKING_SESSION');
export const UPDATE_BOOKING_SESSION = createRequestTypes(
  'UPDATE_BOOKING_SESSION',
);

export const BOOKING_LIST = createRequestTypes('BOOKING_LIST');

// Stripe APIS
export const CREATE_CUSTOMER = createRequestTypes('CREATE_CUSTOMER');
export const CREATE_TOKEN = createRequestTypes('CREATE_TOKEN');
export const CREATE_CARD = createRequestTypes('CREATE_CARD');
export const CARD_LIST = createRequestTypes('CARD_LIST');
export const DELETE_CARD = createRequestTypes('DELETE_CARD');
export const PAYMENT_HISTORY = createRequestTypes('PAYMENT_HISTORY');

//Notification APIS
export const GET_NOTIFICATIONS = createRequestTypes('GET_NOTIFICATIONS');
// Session Apis
export const START_SESSION = createRequestTypes('START_SESSION');
export const REQUEST_TO_START_SESSION = createRequestTypes(
  'REQUEST_TO_START_SESSION',
);

export const REQUEST_TO_END_SESSION = createRequestTypes(
  'REQUEST_TO_END_SESSION',
);

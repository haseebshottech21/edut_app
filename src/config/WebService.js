import _ from 'lodash';
import Util from '../util';

// export const BASE_URL = "http://veteranapp.apps.fomarkmedia.com/api/v1/";

//  const BASE_URL = "http://veteranapp.tk/api/v1/";
export const BASE_URL = 'https://server.appsstaging.com/3048/edut/api/';
export const SESSION_BASE_URL = 'https://server.appsstaging.com:3003/';

export const STRIPE_BASE_URL = 'https://api.stripe.com/v1/';
// export const REDDIT_BASE_URL = 'https://www.reddit.com/';
// export const NEWS_API_BASE_URL = 'https://newsapi.org/v2/';

export const API_TIMEOUT = 30000;
export const NEW_API_KEY = '1d399038bef14b0497d028fc27999696';

export const socket = {
  url: 'https://server.appsstaging.com:3097/',
  event: 'soa_chat',
};
// API USER ROUTES
export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};

export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// API USER ROUTES
export const EMPTY = {
  route: '',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const USER_SIGNIN = {
  route: 'auth/login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const USER_SIGNUP = {
  route: 'auth/signup',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const USER_FORGOT_PASSWORD = {
  route: 'auth/forgot-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_PASSWORD = {
  route: 'change-password',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const RESET_PASSWORD = {
  route: 'auth/reset-forgot-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const USER_SIGNOUT = {
  route: 'logout',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const OTP_VERIFY = {
  route: 'auth/verification',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const RESEND_OTP = {
  route: 'auth/otp/send',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const COMPLETE_PROFILE = {
  route: 'update-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const SOCIAL_LOGIN = {
  route: 'auth/social-login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const USER_CHALLENGE = {
  route: 'challenge/index?',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const TAKE_CHALLENGE = {
  route: 'challenge/accept',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CHALLENGE_STATUS = {
  route: 'challenge/status',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_POSTS = {
  route: 'post/index',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const CREATE_POST = {
  route: 'post/create',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_PEOPLES = {
  route: 'people/index?',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const LIKE_POST = {
  route: 'post/like',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_COMMENTS = {
  route: 'post/comments',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const POST_COMMENTS = {
  route: 'post/comment',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_JOURNALS = {
  route: 'jounral/index',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const POST_JOURNAL = {
  route: 'jounral/create',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_JOURNAL_CATEGORIES = {
  route: '',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const DELETE_JOURNAL = {
  route: 'jounral/delete',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SHARE_JOURNAL = {
  route: 'jounral/share',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const UPDATE_POST = {
  route: 'post/update',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CREATE_GROUP = {
  route: 'prayergroup/create',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const PRAYER_GROUP = {
  route: 'prayergroup/index',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const JOIN_GROUP = {
  route: 'prayergroup/join',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const HELP_FEEDBACK = {
  route: 'feedback',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CONTENT = {
  route: 'content',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const HOTLINES = {
  route: 'hotlines',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const UPLOAD_MEDIA = {
  route: 'people/media',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_MEDIA = {
  route: 'people/gallery',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const FOLLOW = {
  route: 'people/follow',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const VIEW_PROFILE = {
  route: 'people/profile',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SHARE_POST = {
  route: 'post/share',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ENCOURAGE_LIST = {
  route: 'people/follower',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SPECIALTIES = {
  route: 'specialities',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const BOOKING_SESSION = {
  route: 'booking/create',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
// STRIPE ENDS POINTS
export const CREATE_CUSTOMER = {
  route: 'customers',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const CREATE_TOKEN = {
  route: 'tokens',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const CREATE_CARD = {
  route: 'customers',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const CARD_LIST = {
  route: 'customers',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const DELETE_CARD = {
  route: 'customers',
  access_token_required: false,
  type: REQUEST_TYPE.DELETE,
};
export const BOOKING_LIST = {
  route: 'booking/index',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const UPDATE_BOOKING_SESSION = {
  route: 'booking/update',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const PAYMENT_HISTORY = {
  route: 'booking/payment-history',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_NOTIFICATIONS = {
  route: 'notifications',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const START_SESSION = {
  route: 'rtctoken',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const REQUEST_TO_START_SESSION = {
  route: 'booking/start',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const REQUEST_TO_END_SESSION = {
  route: 'booking/finish',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_USERS = {
  route: 'users',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const POST_CHAT_ATTACHMENTS = {
  route: 'upload-chat-media',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const callRequest = function (
  url,
  data,
  parameter,
  header = {},
  ApiSauce,
  baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some errors, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token = Util.getCurrentUserAccessToken();
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`,
        },
      };
    }
  }

  const _url =
    parameter && !_.isEmpty(parameter)
      ? `${url.route}/${parameter}`
      : url.route;

  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};

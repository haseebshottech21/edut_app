import moment from 'moment';
import Util from '../util';
import {Images} from '../theme';

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;
// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;
export const POST_VIEW_TIMEOUT = 2000;
export const IMAGE_QUALITY = 1;
export const IMAGE_MAX_WIDTH = 720;
export const IMAGE_MAX_HEIGHT = 480;
export const IMAGE_COMPRESS_MAX_WIDTH = 720;
export const IMAGE_COMPRESS_MAX_HEIGHT = 480;
export const VERSES_OF_THE_DAY_LIMIT = 10;
export const IMAGE_COMPRESS_FORMAT = 'JPEG';
export const ANDROID_NOTI_CHANNEL = 'VeteranAppChanel';

// date time formats
export const DATE_FORMAT1 = 'dddd, DD MMMM, YYYY';
export const DATE_FORMAT2 = 'DD MMM YYYY';
export const DATE_FORMAT3 = 'YYYY-MM-DD';
export const TIME_FORMAT1 = 'hh:mm A';
export const TIME_FORMAT2 = 'HH:mm ';

export const DATE_FORMAT_TIME1 = 'Do | MMM | HH';
export const DATE_FORMAT4 = 'dddd, DD MMMM YYYY';
export const DATE_FORMAT5 = 'MMM DD, YYYY';

// Messages

export const LOCATION_PERMISSION_DENIED_ERROR2 =
  'Location permission required, please go to app settings to allow access';
export const INVALID_NAME_ERROR = 'Invalid name';
export const INVALID_EMAIL_ERROR = 'Invalid email';
export const INVALID_PASSWORD_ERROR = `Password not valid (Use atleast one UpperCase Letter, one number and one special character)`;
export const INTERNET_ERROR = 'Please connect to the working internet';
export const ARE_U_SURE = 'Are you sure?';
export const WELCOME_NOTE = 'Welcome to the Veteran App!';
export const PROFILE_UPDATE_SUCCESS = 'Profile successfully updated!';
export const SESSION_EXPIRED_ERROR = 'Session expired, Please login again';

export const PLACEHOLDER_IMAGE = 'https://i.imgur.com/yloZmJc.png';
export const CAMERA_ICON =
  'https://cdn-icons-png.flaticon.com/512/45/45010.png';

// Message types
export const MESSAGE_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
};
export const challengeMessage = `A 30 day challenge encourages you to do something daily to reach a goal. What matters is that a consistent action is taken because it’s the small actions each day that build behaviors and habits that last`;
// File Types
export const FILE_TYPES = {VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi'};

// User Types

export const DELTA_LOCATION = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// DUMMY Data

export const Notification = [
  {
    id: 1,
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: 'jan 21,2021',
    time: '12:00',
  },
  {
    id: 1,
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: 'jan 21,2021',
    time: '12:00',
  },
  {
    id: 1,
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: 'jan 21,2021',
    time: '12:00',
  },
  {
    id: 1,
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: 'jan 21,2021',
    time: '12:00',
  },
  {
    id: 1,
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: 'jan 21,2021',
    time: '12:00',
  },
  {
    id: 1,
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: 'jan 21,2021',
    time: '12:00',
  },
];
export const Challenges = [
  {
    id: 1,
    name: 'Mental Health',
  },
  {
    id: 2,
    name: 'Mental Health',
  },
  {
    id: 3,
    name: 'Mental Health',
  },
  {
    id: 4,
    name: 'Mental Health',
  },
  {
    id: 5,
    name: 'Mental Health',
  },
  {
    id: 6,
    name: 'Mental Health',
  },
];
export const ChallengeDetailList = [
  {
    id: 1,
    name: 'Do a deep breathing exercise',
  },
  {
    id: 1,
    name: 'Catch up with a friends',
  },
  {
    id: 1,
    name: 'Schedule something fun',
  },
  {
    id: 1,
    name: 'Do 30 minutes of Yoga',
  },
  {
    id: 1,
    name: 'take 10 minutes of read',
  },
  {
    id: 1,
    name: 'Write down something good',
  },
];
export const MyChallengeDetailList = [
  {
    id: 1,
    name: 'Do a deep breathing exercise',
    done: true,
  },
  {
    id: 1,
    name: 'Catch up with a friends',
    done: true,
  },
  {
    id: 1,
    name: 'Schedule something fun',
    done: false,
  },
  {
    id: 1,
    name: 'Do 30 minutes of Yoga',
    done: true,
  },
  {
    id: 1,
    name: 'take 10 minutes of read',
    done: false,
  },
  {
    id: 1,
    name: 'Write down something good',
    done: true,
  },
];
export const HelpLines = [
  {
    id: 1,
    title: 'Child help',
    number: 911,
  },
  {
    id: 1,
    title: 'National Suicide Prevention Lifeline',
    number: 911,
  },
  {
    id: 1,
    title: 'National Domestic Violence Hotline',
    number: 911,
  },
  {
    id: 1,
    title: 'National Sexual Assault Hotline',
    number: 911,
  },
];
export const FollowingList = [
  {
    id: 1,
    name: 'John Doe',
    isFollow: true,
    profilePicture:
      'https://i.imgur.com/udLAJnO_d.webp?maxwidth=760&fidelity=grand',
    date: '7th july 2021',
    session: true,
  },
  {
    id: 2,
    name: 'John Doe',
    isFollow: false,
    profilePicture:
      'https://i.imgur.com/udLAJnO_d.webp?maxwidth=760&fidelity=grand',
    date: '7th july 2021',
    session: true,
  },
  {
    id: 3,
    name: 'John Doe',
    isFollow: false,
    profilePicture:
      'https://i.imgur.com/udLAJnO_d.webp?maxwidth=760&fidelity=grand',
    date: '7th july 2021',
    session: true,
  },
  {
    id: 4,
    name: 'John Doe',
    isFollow: false,
    profilePicture:
      'https://i.imgur.com/udLAJnO_d.webp?maxwidth=760&fidelity=grand',
    date: '7th july 2021',
    session: true,
  },
];
export const scheduleList = [
  {key: 0, name: 'Mon', selected: false},
  {key: 1, name: 'Tue', selected: false},
  {key: 2, name: 'Wed', selected: false},
  {key: 3, name: 'Thu', selected: false},
  {key: 4, name: 'Fri', selected: false},
  {key: 5, name: 'Sat', selected: false},
];
export const items = [
  {
    id: '92iijs7yta',
    name: 'Ondo',
  },
  {
    id: 'a0s0a8ssbsd',
    name: 'Ogun',
  },
  {
    id: '16hbajsabsd',
    name: 'Calabar',
  },
  {
    id: 'nahs75a5sg',
    name: 'Lagos',
  },
  {
    id: '667atsas',
    name: 'Maiduguri',
  },
  {
    id: 'hsyasajs',
    name: 'Anambra',
  },
  {
    id: 'djsjudksjd',
    name: 'Benue',
  },
  {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  },
  {
    id: 'suudydjsjd',
    name: 'Abuja',
  },
];
export const POST_LIST = [
  {
    userID: 12,
    name: 'John Doe',
    postDate: 'oct 23 2022',
    userImage: PLACEHOLDER_IMAGE,
    userPostImage: 'https://i.imgur.com/dpdnEQv.png',
    isOwnPost: true,
    likes: 200,
    comments: 200,
    postText: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type`,
    related: 'Anxiety',
  },
  {
    userPostImage:
      'https://i.imgur.com/SDus0X3_d.webp?maxwidth=760&fidelity=grand',
    userID: 12,
    name: 'John Doe',
    postDate: 'oct 23 2022',
    userImage: 'https://i.imgur.com/mmmGuux_d.webp?maxwidth=760&fidelity=grand',
    isOwnPost: false,
    likes: 200,
    comments: 200,
    postText: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type`,
    related: 'Depression',
  },
  {
    userPostImage:
      'https://i.imgur.com/d8Rmxx8_d.webp?maxwidth=760&fidelity=grand',
    userID: 12,
    name: 'John Doe',
    postDate: 'oct 23 2022',
    userImage: PLACEHOLDER_IMAGE,
    isOwnPost: true,
    likes: 200,
    comments: 200,
    related: 'Tension',
    postText: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type`,
  },
];
export const TESTINOMIAL_LIST = [
  {
    userID: 12,
    name: 'Alizia',
    postDate: 'oct 23 2022',
    userImage: PLACEHOLDER_IMAGE,
    userPostImage:
      'https://media.istockphoto.com/photos/modern-rehabilitation-physiotherapy-worker-with-woman-client-picture-id1098297826?s=612x612',
    isOwnPost: true,
    likes: 200,
    comments: 200,
    postText: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type`,
    related: 'Anxiety',
  },
];
export const Journal_LIST = [
  {
    userID: 12,
    name: 'John Doe',
    postDate: 'oct 23 ',
    userImage: PLACEHOLDER_IMAGE,
    isOwnPost: true,
    journalImage: require('../assets/icons/journal/eathealthy.png'),
    journalNam: 'healthy',
    Text: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type`,
    feels: 'i m feel angry',
  },
  {
    userID: 12,
    name: 'John Doe',
    postDate: 'oct 23 ',
    userImage: PLACEHOLDER_IMAGE,
    isOwnPost: true,
    journalImage: require('../assets/icons/journal/family.png'),
    journalNam: 'family',
    Text: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type`,
    feels: 'i m feel normal',
  },
  {
    userID: 12,
    name: 'John Doe',
    postDate: 'oct 23 ',
    userImage: PLACEHOLDER_IMAGE,
    isOwnPost: true,
    journalImage: require('../assets/icons/journal/friends.png'),
    journalNam: 'Friends',
    Text: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type`,
    feels: 'i m feel angry',
  },
];
export const EmojisList = [
  {
    id: 1,
    name: 'Sad',
    icon: require('../assets/icons/Emojies/sad.png'),
  },
  {
    id: 2,
    name: 'Tired',
    icon: require('../assets/icons/Emojies/tired.png'),
  },
  {
    id: 3,
    name: 'Angry',
    icon: require('../assets/icons/Emojies/angry.png'),
  },
  {
    id: 4,
    name: 'Normal',
    icon: require('../assets/icons/Emojies/normal.png'),
  },
  {
    id: 5,
    name: 'Calm',
    icon: require('../assets/icons/Emojies/calm.png'),
  },
  {
    id: 6,
    name: 'Crying',
    icon: require('../assets/icons/Emojies/sadCrying.png'),
  },
  {
    id: 7,
    name: 'Excited',
    icon: require('../assets/icons/Emojies/excited.png'),
  },
  {
    id: 7,
    name: 'Unamused',
    icon: require('../assets/icons/Emojies/unamusedFace.png'),
  },
  {
    id: 7,
    name: 'Fearful',
    icon: require('../assets/icons/Emojies/fearful.png'),
  },
];
export const IconsList = [
  {
    key: 1,
    name: 'Family',
    icon: require('../assets/icons/journal/family.png'),
    isSelected: false,
  },
  {
    key: 2,
    name: 'Friends',
    icon: require('../assets/icons/journal/friends.png'),
    isSelected: false,
  },
  {
    key: 3,
    name: 'Heart',
    icon: require('../assets/icons/journal/heart.png'),
    isSelected: false,
  },
  {
    key: 4,
    name: 'Sports ',
    icon: require('../assets/icons/journal/sport.png'),
    isSelected: false,
  },
  {
    key: 5,
    name: 'Eat healthy',
    icon: require('../assets/icons/journal/eathealthy.png'),
    isSelected: false,
  },
  {
    key: 6,
    name: 'Family',
    icon: require('../assets/icons/journal/family.png'),
    isSelected: false,
  },
  {
    key: 7,
    name: 'Friends',
    icon: require('../assets/icons/journal/friends.png'),
    isSelected: false,
  },
  {
    key: 8,
    name: 'Heart',
    icon: require('../assets/icons/journal/heart.png'),
    isSelected: false,
  },
  {
    key: 9,
    name: 'Sports ',
    icon: require('../assets/icons/journal/sport.png'),
    isSelected: false,
  },
  {
    key: 10,
    name: 'Eat healthy',
    icon: require('../assets/icons/journal/eathealthy.png'),
    isSelected: false,
  },
  {
    key: 11,
    name: 'Family',
    icon: require('../assets/icons/journal/family.png'),
    isSelected: false,
  },
  {
    key: 12,
    name: 'Friends',
    icon: require('../assets/icons/journal/friends.png'),
    isSelected: false,
  },
  {
    key: 13,
    name: 'Heart',
    icon: require('../assets/icons/journal/heart.png'),
    isSelected: false,
  },
  {
    key: 14,
    name: 'Sports ',
    icon: require('../assets/icons/journal/sport.png'),
    isSelected: false,
  },
  {
    key: 15,
    name: 'Eat healthy',
    icon: require('../assets/icons/journal/eathealthy.png'),
    isSelected: false,
  },
];
export const documentsList = [
  {
    id: 1,
    image: '',
    link: 'http://www.africau.edu/images/default/sample.pdf',
    name: 'College Degree',
  },
  {
    id: 1,
    image: '',
    link: 'http://www.africau.edu/images/default/sample.pdf',
    name: 'Therapist Certification',
  },

  {
    id: 1,
    image: '',
    link: 'http://www.africau.edu/images/default/sample.pdf',
    name: 'College Degree',
    name: 'Specilization Certification',
  },
];

import {Platform} from 'react-native';
const green = '#188544';
const white = '#FFFFFF';
const white1 = '#E9F2F4';
const sky = '#C4F0FF';
const red = '#FF3E2F';
const blue = '#0059FF';
const black = '#000000';
const black1 = '#2C2C2C';
const gray = '#B6B6B6';
const transparent = 'rgba(0,0,0,0)';

const background = {
  primary: 'transparent',
  secondary: '#000000',
  tertiary: '#FFFFFF',
  quaternary: '#FF3E2F',
  accent: '#0078FF',
};

const text = {
  primary: '#FFFFFF',
  primary: '#198544',
  secondary: '#000000',
  tertiary: '#0078FF',
  quaternary: '#FF3E2F',
  accent: '#0078FF',
  white: '#FFFFFF',
  white1: '#C4C4C4',
  red: '#FF3E2F',
  blue: '#0059FF',
  black: '#000000',
  green: '#198544',
  yellow: 'rgb(236, 190, 55)',
  white2: '#C3C3C3',
  gray: '#B6B6B6',
  darkGray: '#A9A9A9',
};

const presetColors = {
  primary: ['#febb5b', '#f24645'],
  secondary: ['#f24645', '#febb5b'],
  instagram: [
    'rgb(106, 57, 171)',
    'rgb(151, 52, 160)',
    'rgb(197, 57, 92)',
    'rgb(231, 166, 73)',
    'rgb(181, 70, 92)',
  ],
  firefox: [
    'rgb(236, 190, 55)',
    'rgb(215, 110, 51)',
    'rgb(181, 63, 49)',
    'rgb(192, 71, 45)',
  ],
  sunrise: [
    'rgb(92, 160, 186)',
    'rgb(106, 166, 186)',
    'rgb(142, 191, 186)',
    'rgb(172, 211, 186)',
    'rgb(239, 235, 186)',
    'rgb(212, 222, 206)',
    'rgb(187, 216, 200)',
    'rgb(152, 197, 190)',
    'rgb(100, 173, 186)',
  ],
};

const navbar = {
  background: transparent,
  text: text.primary,
};
const dateColors = [];
const border = '#f2f2f2';
const separator = '#f2f2f2';

const windowTint = 'rgba(0, 0, 0, 0.4)';
const windowTintWhite = 'rgba(255, 255, 255, 0.1)';

const colorsArray1 = [green];

export default {
  red,
  green,
  blue,
  white,
  white1,
  black,
  twitter: '#41abe1',
  google: '#e94335',
  facebook: '#3b5998',
  info: '#19bfe5',
  warning: '#feb401',
  danger: '#ed1c4d',
  success: '#b76c94',
  dateColors,
  colorsArray1,
  text,
  background,
  gray,
  sky,
  black1,
};

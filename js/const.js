const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const COUNT_STEP = 5;
const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;
const MAX_COMMENT_LENGTH = 140;
const MAX_EFFECT_LEVEL = 100;
const SCALE_STEP = 0.25;
const REMOVE_MESSAGE_TIMEOUT = 5000;
const TIMEOUT_DELAY = 500;
const MAX_PICTURE_COUNT = 10;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const sliderOptionsObjectChromeSepia = {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
};

const sliderOptionsObjectMarvinDefault = {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
};

const sliderOptionsObjectPhobos = {
  range: {
    min: 0,
    max: 3
  },
  start: 3,
  step: 0.1,
};

const sliderOptionsObjectHeat = {
  range: {
    min: 1,
    max: 3
  },
  start: 3,
  step: 0.1,
};

const Effects = {
  none: sliderOptionsObjectMarvinDefault,
  chrome: sliderOptionsObjectChromeSepia,
  sepia: sliderOptionsObjectChromeSepia,
  marvin: sliderOptionsObjectMarvinDefault,
  phobos: sliderOptionsObjectPhobos,
  heat: sliderOptionsObjectHeat,
};

const getChromeStyleFilter = (value) => `grayscale(${value})`;
const getSepiaStyleFilter = (value) => `sepia(${value})`;
const getMarvinStyleFilter = (value) => `invert(${value})`;
const getPhobosStyleFilter = (value) => `blur(${value})`;
const getHeatStyleFilter = (value) => `brightness(${value})`;

const StyleFilterByEffects = {
  chrome: getChromeStyleFilter,
  sepia: getSepiaStyleFilter,
  marvin: getMarvinStyleFilter,
  phobos: getPhobosStyleFilter,
  heat: getHeatStyleFilter,
};

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте еще раз',
  [Method.POST]: 'Не удалось отправить данные формы',
};

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORT_FUNC = {
  getRandomPhotos: () => 0.5 - Math.random(),
  getDiscussedPhotos: (a, b) => b.comments.length - a.comments.length,
};

export {
  COUNT_STEP,
  MAX_HASHTAGS,
  MAX_SYMBOLS,
  MAX_COMMENT_LENGTH,
  MAX_EFFECT_LEVEL,
  Effects,
  StyleFilterByEffects,
  SCALE_STEP,
  BASE_URL,
  Route,
  Method,
  ErrorText,
  REMOVE_MESSAGE_TIMEOUT,
  FILTER,
  SORT_FUNC,
  MAX_PICTURE_COUNT,
  TIMEOUT_DELAY,
  FILE_TYPES,
};

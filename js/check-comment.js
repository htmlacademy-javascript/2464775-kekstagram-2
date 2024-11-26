import { COMMENT_LENGTH } from './const.js';

const validateComment = () => {
  errorMessage = '';

  const inputArray;

  const rules = [
    {
      check: inputArray.some((item) => item.lenght > MAX_SYMBOLS),
      error: `Длина комментария не может составлять больше ${COMMENT_LENGTH} символов`,
    },
  ];

  if(!inputText) {
    return true;
  }

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

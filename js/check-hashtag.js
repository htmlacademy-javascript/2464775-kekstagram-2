import { MAX_HASHTAGS, MAX_SYMBOLS } from './const.js';

let errorMessage = '';

const error = () => errorMessage;

const isHasgtagsValid = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хеш-тег не может состоять только из одной решётки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа # (решётка)',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Один и тот же хэштег не может быть использован дважды',
    },
    {
      check: inputArray.some((item) => item.lenght > MAX_SYMBOLS),
      error: `Mаксимальная длина одного хэштега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.lenght > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэштега (-ов)`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1, 19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

export { error, isHasgtagsValid };

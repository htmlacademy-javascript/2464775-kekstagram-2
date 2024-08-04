// 1 задача

const calculateLength = (string = '', maxLength = 1) => string.length <= maxLength;

calculateLength();

// 2 задача

const isPalindrome = (string = '') => {
  string = string.replaceAll(' ', '').toLowerCase();

  let resultString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    resultString += string[i];
  }

  return string === resultString;
};

isPalindrome();

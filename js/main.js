const messageSet = ['Всё отлично',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const nameSet = [
  'Василий',
  'Аркадий',
  'Арсений',
  'Анастасия',
  'Яна',
  'Гертруда',
  'Инга',
  'Илона',
  'Филипп',
  'Арнольд',
];

const photoCount = 25;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createComment = () => {
  let id = 1;
  const indexMessage = getRandomInteger(0, messageSet.length - 1);
  const indexName = getRandomInteger(0, nameSet.length - 1);
  return function () {
    const comment = {};
    const idAvatar = getRandomInteger (1, 6);
    comment.id = id;
    comment.avatar = `img/avatar-${idAvatar}.svg`;
    comment.message = `${messageSet[indexMessage]}`;
    comment.name = `${nameSet[indexName]}`;
    id++;
    return comment;
  };
};

const valuesGenerator = createRandomIdFromRangeGenerator(1, 999);

const describePhoto = () => {
  const id = valuesGenerator();
  const photo = {};
  const idPhotoUrl = valuesGenerator(1, 25);
  const idPhotoDescription = valuesGenerator(1, 25);
  const quantityComments = getRandomInteger(0, 30);
  const quantityLikes = getRandomInteger(15, 200);
  photo.id = id;
  photo.url = `photos/{${idPhotoUrl}}.jpg`;
  photo.description = `Крутое фото №${idPhotoDescription}`;
  photo.likes = quantityLikes;
  photo.comments = Array.from({length: quantityComments}, createComment());
  return photo;
};

Array.from({length: photoCount}, describePhoto);

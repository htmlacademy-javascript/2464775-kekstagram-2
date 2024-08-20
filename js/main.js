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
let id = 1;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const quantityComments = getRandomInteger(0, 30);

const createComment = () => {
  id++;
  const indexMessage = getRandomInteger(0, messageSet.length - 1);
  const indexName = getRandomInteger(0, nameSet.length - 1);
  const idAvatar = getRandomInteger(1, 6);
  return {
    id: id,
    avatar: `img/avatar-${idAvatar}.svg`,
    message: `${messageSet[indexMessage]}`,
    name: `${nameSet[indexName]}`,
  };
};

const describePhoto = () => ({
  id,
  url: `photos/{${id}}.jpg`,
  description: `Крутое фото №${id}`,
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: quantityComments}, createComment),
});

const descriptionPhoto = Array.from({length: photoCount}, describePhoto);

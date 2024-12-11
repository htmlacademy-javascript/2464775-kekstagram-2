import { getRandomInteger, createRandomIdFromRangeGenerator, createIdFromRangeGenerator } from './utils.js';
import { messageSet, nameSet } from './data.js';
import { PHOTOCOUNT } from './const.js';

const valuesGenerator = createRandomIdFromRangeGenerator(1, 999);

const createComment = () => {
  const id = valuesGenerator();
  const comment = {};
  const idAvatar = getRandomInteger (1, 6);
  const indexMessage = getRandomInteger(0, messageSet.length - 1);
  const indexName = getRandomInteger(0, nameSet.length - 1);
  comment.id = id;
  comment.avatar = `img/avatar-${idAvatar}.svg`;
  comment.message = `${messageSet[indexMessage]}`;
  comment.name = `${nameSet[indexName]}`;
  return comment;
};

const idPhoto = createIdFromRangeGenerator(1, 25);

const describePhoto = () => {
  const id = idPhoto();
  const photo = {};
  const quantityComments = getRandomInteger(0, 30);
  const quantityLikes = getRandomInteger(15, 200);
  photo.id = id;
  photo.url = `photos/${id}.jpg`;
  photo.description = `Крутое фото №${id}`;
  photo.likes = quantityLikes;
  photo.comments = Array.from({length: quantityComments}, createComment);
  return photo;
};

const postsData = () => Array.from({length: PHOTOCOUNT}, describePhoto);

const postsDataArray = postsData();

export { postsDataArray, describePhoto};

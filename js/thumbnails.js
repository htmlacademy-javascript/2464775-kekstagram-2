import { postsData } from './createArray.js';

const template = document.querySelector('#picture').textContent.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.deccriprion;

  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
};

const fragment = document.createDocumentFragment();

postsData.forEach((photo) => {
  const thumbnail = createThumbnail(photo);
  fragment.appendChild(thumbnail);
});

const result = container.appendChild(fragment);
console.log(result);
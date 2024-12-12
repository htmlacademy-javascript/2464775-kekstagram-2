import { photosData } from './bootstrap.js';
import { container } from './thumbnails.js';
import { clearComments, renderComments } from './render-comments.js';

const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img img');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

const onbigPictureCancelClick = () => {
  closeBigPicture();
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeBigPicture();
  }
};

function closeBigPicture () {
  clearComments();

  bigPictureNode.classList.add('hidden');
  bigPictureCancelNode.removeEventListener('click', onbigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
}

const openBigPicture = (pictureId) => {
  const currentPhoto = photosData.find((photo) => photo.id === Number(pictureId));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImgNode.src = currentPhoto.url;
  likesCountNode.textContent = currentPhoto.likes;
  socialCommentsNode.innerHTML = '';

  socialCommentsNode.appendChild(socialCommentsFragment);
  commentsCaptionNode.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPictureNode.classList.remove('hidden');
  bigPictureCancelNode.addEventListener('click', onbigPictureCancelClick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

container.addEventListener('click', (evt) => {
  const currentContainer = evt.target.closest('.picture');

  if (currentContainer) {
    evt.preventDefault();
    openBigPicture(currentContainer.dataset.id);
  }
});

export { openBigPicture };

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.decsriprion;

  thumbnail.setAttribute('data-id', photo.id);
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
};

const initThumbnailsCreation = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
    clearThumbnails();
  });

  container.appendChild(fragment);
};

function clearThumbnails () {
  container.querySelectorAll('a.picture').forEach((item) => item.remove());
}

export { container, createThumbnail, initThumbnailsCreation };

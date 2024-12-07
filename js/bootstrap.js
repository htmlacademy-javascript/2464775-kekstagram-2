import { openBigPicture } from './render-photo.js';
import { getData } from './api.js';
import { createThumbnail } from './thumbnails.js';
import { showErrorMessage } from './utils.js';

const bootstrap = async () => {
  try {
    const photo = await getData();
    openBigPicture(photo);
    createThumbnail(photo);
  } catch (error) {
    showErrorMessage(error.message);
  }
};

bootstrap();

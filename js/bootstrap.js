import { getData } from './api.js';
import { initThumbnailsCreation } from './thumbnails.js';
import { showErrorMessage } from './utils.js';

const photosData = await getData();

const bootstrap = async () => {
  try {
    initThumbnailsCreation(photosData);
  } catch (error) {
    showErrorMessage(error.message);
  }
};

bootstrap();

export { photosData };

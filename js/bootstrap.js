import { getData } from './api.js';
import { initThumbnailsCreation } from './thumbnails.js';
import { showErrorMessage } from './utils.js';

let photosData;

const bootstrap = async () => {
  try {
    photosData = await getData();
    initThumbnailsCreation(photosData);
  } catch (error) {
    showErrorMessage(error.message);
  }
};

bootstrap();

const getPhotosData = () => photosData;

export { getPhotosData };

import { getData } from './api.js';
import { initThumbnailsCreation } from './thumbnails.js';
import { showErrorMessage } from './utils.js';

const bootstrap = async () => {
  try {
    const photosData = await getData();
    initThumbnailsCreation(photosData);
  } catch (error) {
    showErrorMessage(error.message);
  }
};

const bigPhotos = bootstrap();

export { bigPhotos };

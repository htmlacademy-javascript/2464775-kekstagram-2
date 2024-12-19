import './render-photo.js';
import './effects-slider.js';
import { getData } from './api.js';
import { initThumbnailsCreation } from './thumbnails.js';
import { showErrorMessage } from './utils.js';
import { configFilter } from './filter.js';

let photosData;

const bootstrap = async () => {
  try {
    photosData = await getData();
    initThumbnailsCreation(photosData);
    configFilter(photosData);
  } catch (error) {
    showErrorMessage(error.message);
  }
};

bootstrap();

const getPhotosData = () => photosData;

export { getPhotosData };

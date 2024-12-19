import { initThumbnailsCreation } from './thumbnails.js';
import { debounce } from './utils.js';
import { FILTER, SORT_FUNC, MAX_PICTURE_COUNT } from './const.js';
<<<<<<< HEAD
import { getPhotosData } from './bootstrap.js';
=======
import { getphotosData } from './bootstrap.js';
>>>>>>> f58fe66 (Правки по разделу 2 (после теста))

let currentFilter = FILTER.default;
const filterElement = document.querySelector('.img-filters');
const activeFilterButton = 'img-filters__button--active';

const debounceRender = debounce(initThumbnailsCreation);

const onFilterChange = (evt) => {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${activeFilterButton}`);
  if (!targetButton.closest('button')) {
    return;
  }

  if (activeButton === targetButton) {
    return;
  }

  activeButton.classList.toggle(activeFilterButton);
  targetButton.classList.toggle(activeFilterButton);
  currentFilter = targetButton.getAttribute('id');

  applyFilter ();
};

function applyFilter () {
  let filteredPictures = [];
  const photosArray = getphotosData();
  if (currentFilter === FILTER.default) {
<<<<<<< HEAD
    filteredPictures = getPhotosData;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = getPhotosData.slice().sort(SORT_FUNC.random).slice(0, MAX_PICTURE_COUNT);
  }
  if (currentFilter === FILTER.discussed) {
    filteredPictures = getPhotosData.slice().sort(SORT_FUNC.discussed);
=======
    filteredPictures = photosArray;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = photosArray.slice().sort(SORT_FUNC.random).slice(0, MAX_PICTURE_COUNT);
  }
  if (currentFilter === FILTER.discussed) {
    filteredPictures = photosArray.slice().sort(SORT_FUNC.discussed);
>>>>>>> f58fe66 (Правки по разделу 2 (после теста))
  }
  debounceRender(filteredPictures);
}

const configFilter = () => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
};

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
configFilter(getPhotosData);
=======
configFilter(getphotosData);
>>>>>>> f58fe66 (Правки по разделу 2 (после теста))
=======
// configFilter(getphotosData);
=======
>>>>>>> ebc7dc6 (Удаляет)
export { configFilter };
>>>>>>> f47d800 (Вносит правки в раздел 5 после теста)

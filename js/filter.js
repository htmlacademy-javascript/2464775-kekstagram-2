import { initThumbnailsCreation } from './thumbnails.js';
import { debounce } from './utils.js';
import { FILTER, SORT_FUNC, MAX_PICTURE_COUNT } from './const.js';
import { photosData } from './bootstrap.js';

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
  if (currentFilter === FILTER.default) {
    filteredPictures = photosData;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = photosData.slice().sort(SORT_FUNC.random).slice(0, MAX_PICTURE_COUNT);
  }
  if (currentFilter === FILTER.discussed) {
    filteredPictures = photosData.slice().sort(SORT_FUNC.discussed);
  }
  debounceRender(filteredPictures);
}

const configFilter = () => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
};

configFilter(photosData);

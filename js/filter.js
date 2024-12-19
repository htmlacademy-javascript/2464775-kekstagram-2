import { initThumbnailsCreation } from './thumbnails.js';
import { debounce } from './utils.js';
import { FILTER, SORT_FUNC, MAX_PICTURE_COUNT } from './const.js';
import { getPhotosData } from './main.js';

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
  const photosArray = getPhotosData();
  if (currentFilter === FILTER.default) {
    filteredPictures = photosArray;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = photosArray.slice().sort(SORT_FUNC.random).slice(0, MAX_PICTURE_COUNT);
  }
  if (currentFilter === FILTER.discussed) {
    filteredPictures = photosArray.slice().sort(SORT_FUNC.discussed);
  }
  debounceRender(filteredPictures);
}

const configFilter = () => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
};

export { configFilter };

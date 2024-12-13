import { openBigPicture } from './render-photo.js';
import { debounce } from './utils.js';
import { FILTER, SORT_FUNC, MAX_PICTURE_COUNT } from './const.js';
import { photosData } from './bootstrap.js';

let currentFilter = FILTER.default;
let pictures = [];
const filterElement = document.querySelector('.img-filters');
const activeFilterButton = 'img-filters__button--active';

const debounceRender = debounce(openBigPicture);

const onFilterChange = (evt) => {
  const targetButton = evt.target;
  const activeButton = activeFilterButton;
  if (!targetButton.closest('button')) {
    return;
  }

  if (activeButton === targetButton) {
    return;
  }

  activeButton.classList.toggle(activeFilterButton);
  targetButton.classList.toggle(activeFilterButton);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
};

function applyFilter () {
  let filteredPictures = [];
  if (currentFilter === FILTER.default) {
    filteredPictures = pictures;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = pictures.sort(SORT_FUNC.random).slice(0, MAX_PICTURE_COUNT);
  }
  if (currentFilter === FILTER.discussed) {
    filteredPictures = pictures.sort(SORT_FUNC.discussed);
  }
  debounceRender(filteredPictures);
}

const configFilter = (picturedData) => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
  pictures = picturedData;
};

configFilter(photosData);

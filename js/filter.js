import { openBigPicture } from './render-photo.js';
import { debounce } from './utils.js';
import { FILTER, SORT_FUNC, MAX_PICTURE_COUNT } from './const.js';

let currentFilter = FILTER.default;
let pictures = [];
const filterElement = document.querySelector('.img-filters');
const activeButtonClass = document.querySelector('.img-filters__button--active');

const debounceRender = debounce(openBigPicture);

const onFilterChange = (evt) => {
  const targetButton = evt.target;
  const activeButton = activeButtonClass;
  if (!targetButton.match('button')) {
    return;
  }

  if (activeButton === targetButton) {
    return;
  }

  activeButton.classList.toggle(activeButtonClass);
  targetButton.classList.toggle(activeButtonClass);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
};

function applyFilter () {
  let filteredPictures = [];
  if (currentFilter === FILTER.default) {
    filteredPictures = pictures;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = pictures.toSorted(SORT_FUNC.random).slice(0, MAX_PICTURE_COUNT);
  }
  if (currentFilter === FILTER.discussed) {
    filteredPictures = pictures.toSorted(SORT_FUNC.discussed);
  }
  debounceRender(filteredPictures);
}

const configFilter = (picturedData) => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
  pictures = picturedData;
};

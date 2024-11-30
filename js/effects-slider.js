import { uploadForm } from './form.js';
import { MAX_EFFECT_LEVEL, Effects, StyleFilterByEffects } from './const.js';

const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const slider = imgUploadWrapper.querySelector('.effect-level__slider');
const effectLevel = imgUploadWrapper.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadWrapper.querySelector('.effect-level__value');
effectLevelValue.value = MAX_EFFECT_LEVEL;
const photoPreview = uploadForm.querySelector('.img-upload__preview');
const imgPreview = photoPreview.firstElementChild;
const selectorImg = imgPreview.classList;
const effectRadioBtn = uploadForm.querySelectorAll('.effects__radio');

const getUpdateSliderOptions = (effect, sliderElement) => {
  sliderElement.noUiSlider.updateOptions(Effects[effect]);
};

const resetFilter = () => {
  imgPreview.style.removeProperty('filter');
  effectLevel.classList.add('hidden');
  imgPreview.classList.replace(selectorImg, 'effects__preview--none');
};

const getEffectSelector = (currentInputId) => {
  const selectors = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat',
  };
  return selectors[currentInputId];
};

const onEffectRadioBtnClick = (evt) => {
  const currentRadioBtn = evt.target.closest('.effects__radio');
  if (currentRadioBtn) {
    const effectBtnValue = currentRadioBtn.value;
    imgPreview.classList.replace(selectorImg, getEffectSelector(effectBtnValue));
    getUpdateSliderOptions(effectBtnValue, slider);
  }
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
  effectRadioBtn.forEach((item) => {
    if(item.checked) {
      if (item.value !== 'none') {
        effectLevel.classList.remove('hidden');
        imgPreview.style.filter = StyleFilterByEffects[item.value](effectLevelValue.value);
      } else {
        resetFilter();
      }
    }
  });
});

export { onEffectRadioBtnClick, resetFilter };

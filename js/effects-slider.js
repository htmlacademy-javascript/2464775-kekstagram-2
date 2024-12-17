import { uploadForm, img, preview } from './form.js';
import { MAX_EFFECT_LEVEL, Effects, StyleFilterByEffects } from './const.js';

const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const slider = imgUploadWrapper.querySelector('.effect-level__slider');
const effectLevel = imgUploadWrapper.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadWrapper.querySelector('.effect-level__value');
effectLevelValue.value = MAX_EFFECT_LEVEL;
const effectRadioBtn = uploadForm.querySelectorAll('.effects__radio');
const effectRadioBtnList = uploadForm.querySelector('.effects__list');

const updateSliderOptions = (effect, sliderElement) => {
  sliderElement.noUiSlider.updateOptions(Effects[effect]);
};

const resetFilter = () => {
  preview.style.removeProperty('filter');
  effectLevel.classList.add('hidden');
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

const onEffectRadioBtn = (evt) => {
  const currentRadioBtn = evt.target.closest('.effects__radio');
  if (currentRadioBtn) {
    const effectBtnValue = currentRadioBtn.value;
    img.classList.add(getEffectSelector(effectBtnValue));
    updateSliderOptions(effectBtnValue, slider);
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
});

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
  effectRadioBtn.forEach((item) => {
    if(item.checked) {
      if (item.value !== 'none') {
        effectLevel.classList.remove('hidden');
        let value;

        switch(item.value) {
          case 'phobos':
            value = `${effectLevelValue.value}px`;
            break;
          case 'marvin':
            value = `${effectLevelValue.value}%`;
            break;
          default:
            value = effectLevelValue.value;
        }
        preview.style.filter = StyleFilterByEffects[item.value](value);
      } else {
        resetFilter();
      }
    }
  });
});

effectRadioBtnList.addEventListener('change', onEffectRadioBtn);

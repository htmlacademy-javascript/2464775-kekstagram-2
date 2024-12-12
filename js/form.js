import { error, validateHashtags } from './check-hashtag.js';
import { errorComment, validateComment } from './check-comment.js';
import { SCALE_STEP } from './const.js';
import { sendData } from './api.js';
import { appendNotification } from './notification.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const smaller = uploadForm.querySelector('.scale__control--smaller');
const bigger = uploadForm.querySelector('.scale__control--bigger');
const img = uploadForm.querySelector('.img-upload__preview');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const formSubmitButton = uploadForm.querySelector('.img-upload__submit');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

let scale = 1;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};

const disabledButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = SubmitButtonText.SENDING;
};

const enableButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = SubmitButtonText.IDLE;
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


const onImgUploadClose = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadForm.reset();
  document.removeEventListener('keydown', onEscapeKeydown);
};

function onEscapeKeydown (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      onImgUploadClose();
    }
  }
}

const reset = () => {
  img.style.removeProperty('filter');
  effectLevel.classList.add('hidden');
};

const onPhotoSelect = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  imgUploadCancel.addEventListener('click', onImgUploadClose);
  reset();
  document.addEventListener('keydown', onEscapeKeydown);
};

const onHashtagInput = () => {
  validateHashtags(hashtagInput.value);
};

const sendFormData = async (formElement) => {
  const isValid = pristine.validate();
  if (isValid) {
    disabledButton();
    try {
      await sendData(new FormData(formElement));
      appendNotification(templateSuccess);
    } catch {
      appendNotification(templateError);
    } finally {
      enableButton();
      onImgUploadClose();
      reset();
    }
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

const onSmallerClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    img.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onBiggerClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    img.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

pristine.addValidator(hashtagInput, validateHashtags, error, 2, false);

pristine.addValidator(commentInput, validateComment, errorComment, 2, false);

uploadFile.addEventListener('change', onPhotoSelect);

hashtagInput.addEventListener('input', onHashtagInput);

uploadForm.addEventListener('submit', onFormSubmit);

smaller.addEventListener('click', onSmallerClick);

bigger.addEventListener('click', onBiggerClick);

export { uploadForm, img };

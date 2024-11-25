import { error, isHasgtagsValid } from './check-hashtag.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

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

const onEscapeKeydown = (evt) => {
  if (evt.key === 'Escape') {
    onImgUploadClose();
  }
};

const onPhotoSelect = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  imgUploadCancel.addEventListener('click', onImgUploadClose);
  document.addEventListener('keydown', onEscapeKeydown);
};

const onHashtagInput = () => {
  isHasgtagsValid(hashtagInput.value);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if(pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    uploadForm.submit();
  }
};

pristine.addValidator(hashtagInput, isHasgtagsValid, error, 2, false);

uploadFile.addEventListener('change', onPhotoSelect);

hashtagInput.addEventListener('input', onHashtagInput);

uploadForm.addEventListener('submit', onFormSubmit);

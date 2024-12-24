const body = document.body;

const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const closeNotification = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  existElement.remove();
  body.removeEventListener('click', onBodyClick);
  body.removeEventListener('keydown', onEscPressed);
};

const appendNotification = (template) => {
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', onBodyClick);
  body.addEventListener('keydown', onEscPressed);
};

function onEscPressed (evt) {
  if (isEscPressed(evt)) {
    closeNotification(evt);
  }
}

function onBodyClick (evt) {
  if (evt.target.closest('button') || !evt.target.closest('.success') || !evt.target.closest('.error')) {
    closeNotification(evt);
  }
}

export { appendNotification };

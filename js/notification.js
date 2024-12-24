const body = document.body;

const isEscPressed = (event) => event.key === 'Escape' || event.key === 'Esc';

const closeNotification = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');

  if (isEscPressed(evt) || evt.target.closest('button') || !evt.target.closest('.success') || !evt.target.closest('.error')) {
    existElement.remove();
    body.removeEventListener('click', closeNotification);
    body.removeEventListener('keydown', isEscPressed);
  }
};

const appendNotification = (template) => {
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', closeNotification);
  body.addEventListener('keydown', isEscPressed);
};

export { appendNotification };

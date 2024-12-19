const body = document.body;

const closeNotification = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');

  const onEscKeydown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      existElement.remove();
      body.removeEventListener('keydown', onEscKeydown);
    }
  };

  if (evt.target === existElement || evt.target === closeButton || onEscKeydown(evt)) {
    existElement.remove();
    body.removeEventListener('click', closeNotification);
    body.removeEventListener('keydown', closeNotification);
  }
};

const appendNotification = (template) => {
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', closeNotification);
  body.addEventListener('keydown', closeNotification);
};

export { appendNotification };

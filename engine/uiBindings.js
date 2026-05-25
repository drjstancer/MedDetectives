export function bindButtonAction(selector, callback) {
  const element = document.querySelector(selector);

  if (!element) {
    console.warn(`Missing UI element: ${selector}`);
    return;
  }

  element.addEventListener('click', callback);
}

export function bindFormSubmission(selector, callback) {
  const form = document.querySelector(selector);

  if (!form) {
    console.warn(`Missing form element: ${selector}`);
    return;
  }

  form.addEventListener('submit', callback);
}

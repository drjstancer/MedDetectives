const storagePrefix = 'meddetectives';

export function saveItem(key, value) {
  localStorage.setItem(`${storagePrefix}-${key}`, JSON.stringify(value));
}

export function loadItem(key) {
  const storedValue = localStorage.getItem(`${storagePrefix}-${key}`);

  if (!storedValue) {
    return null;
  }

  return JSON.parse(storedValue);
}

export function removeItem(key) {
  localStorage.removeItem(`${storagePrefix}-${key}`);
}

export function clearStorage() {
  Object.keys(localStorage)
    .filter(key => key.startsWith(storagePrefix))
    .forEach(key => localStorage.removeItem(key));
}

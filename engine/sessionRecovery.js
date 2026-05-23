import { loadItem, saveItem } from './storageManager.js';

const sessionKey = 'runtime-session';

export function saveRuntimeSession(sessionData) {
  saveItem(sessionKey, sessionData);
}

export function restoreRuntimeSession() {
  return loadItem(sessionKey);
}

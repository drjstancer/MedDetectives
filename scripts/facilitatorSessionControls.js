import {
  initializeSharedSessionTimer,
  activateSharedSession
} from './sharedSessionTimer.js';

const activateButton = document.getElementById('activate-session-button');
const timerDisplayId = 'session-timer-display';

initializeSharedSessionTimer(timerDisplayId);

activateButton?.addEventListener('click', () => {
  activateSharedSession();
  window.location.reload();
});

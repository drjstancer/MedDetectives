import {
  initializeSharedSessionTimer,
  activateSharedSession,
  getSharedSessionCode
} from './sharedSessionTimer.js';

const activateButton = document.getElementById('activate-session-button');
const timerDisplayId = 'session-timer-display';
const sessionCodeDisplay = document.getElementById('session-access-code-display');

initializeSharedSessionTimer(timerDisplayId);

if (sessionCodeDisplay) {
  sessionCodeDisplay.textContent = getSharedSessionCode();
}

activateButton?.addEventListener('click', () => {
  const sessionCode = activateSharedSession();

  if (sessionCodeDisplay) {
    sessionCodeDisplay.textContent = sessionCode;
  }
});

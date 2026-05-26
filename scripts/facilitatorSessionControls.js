import {
  initializeSharedSessionTimer,
  activateSharedSession,
  stopSharedSession,
  resetSharedSession,
  advanceSharedSessionStage,
  getCurrentSharedSessionStage,
  getSharedSessionCode,
  getRegisteredSessions
} from './sharedSessionTimer.js';

const activateButton = document.getElementById('activate-session-button');
const stopButton = document.getElementById('stop-session-button');
const resetButton = document.getElementById('reset-session-button');
const advanceButton = document.getElementById('advance-stage-button');

const timerDisplayId = 'session-timer-display';
const sessionCodeDisplay = document.getElementById('session-access-code-display');
const currentStageDisplay = document.getElementById('current-stage-display');
const multiSessionDisplay = document.getElementById('multi-session-display');

initializeSharedSessionTimer(timerDisplayId);

function syncDashboardState() {
  if (sessionCodeDisplay) {
    sessionCodeDisplay.textContent = getSharedSessionCode();
  }

  if (currentStageDisplay) {
    currentStageDisplay.textContent = getCurrentSharedSessionStage();
  }

  if (multiSessionDisplay) {
    const sessions = getRegisteredSessions();

    multiSessionDisplay.innerHTML = sessions.map(session => `
      <div style="margin-bottom:.75rem;padding-bottom:.75rem;border-bottom:1px solid rgba(255,255,255,.15);">
        <strong>Session ${session.code}</strong><br />
        Stage: ${session.stage || 'orientation'}
      </div>
    `).join('');
  }
}

syncDashboardState();

activateButton?.addEventListener('click', () => {
  activateSharedSession();
  syncDashboardState();
});

stopButton?.addEventListener('click', () => {
  stopSharedSession();
});

resetButton?.addEventListener('click', () => {
  resetSharedSession();
  syncDashboardState();
});

advanceButton?.addEventListener('click', () => {
  advanceSharedSessionStage();
  syncDashboardState();
});

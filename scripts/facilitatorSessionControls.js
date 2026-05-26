import {
  initializeSharedSessionTimer,
  activateSharedSession,
  stopSharedSession,
  resumeSharedSession,
  resetSharedSession,
  advanceSharedSessionStage,
  getCurrentSharedSessionStage,
  getSharedSessionCode,
  getRegisteredSessions,
  setActiveSession,
  getActiveSession
} from './sharedSessionTimer.js';

const activateButton = document.getElementById('activate-session-button');
const stopButton = document.getElementById('stop-session-button');
const resumeButton = document.getElementById('resume-session-button');
const resetButton = document.getElementById('reset-session-button');
const advanceButton = document.getElementById('advance-stage-button');

const timerDisplayId = 'session-timer-display';
const sessionCodeDisplay = document.getElementById('session-access-code-display');
const currentStageDisplay = document.getElementById('current-stage-display');
const multiSessionDisplay = document.getElementById('multi-session-display');
const activeSessionDisplay = document.getElementById('active-session-display');

initializeSharedSessionTimer(timerDisplayId);

function syncDashboardState() {
  const activeSession = getActiveSession();

  if (sessionCodeDisplay) {
    sessionCodeDisplay.textContent = getSharedSessionCode();
  }

  if (currentStageDisplay) {
    currentStageDisplay.textContent = getCurrentSharedSessionStage();
  }

  if (activeSessionDisplay) {
    activeSessionDisplay.textContent = activeSession
      ? `Session ${activeSession.code}`
      : 'No Active Session';
  }

  if (multiSessionDisplay) {
    const sessions = getRegisteredSessions();

    multiSessionDisplay.innerHTML = sessions.map(session => `
      <button
        class="secondary-button session-switcher"
        data-session="${session.code}"
        style="display:block;width:100%;margin-bottom:.75rem;text-align:left;"
      >
        <strong>Session ${session.code}</strong><br />
        Stage: ${session.stage}<br />
        Status: ${session.active ? 'Active' : 'Paused'}
      </button>
    `).join('');

    document.querySelectorAll('.session-switcher').forEach(button => {
      button.addEventListener('click', () => {
        const code = button.dataset.session;

        setActiveSession(code);
        syncDashboardState();
      });
    });
  }
}

syncDashboardState();

activateButton?.addEventListener('click', () => {
  activateSharedSession();
  syncDashboardState();
});

stopButton?.addEventListener('click', () => {
  stopSharedSession();
  syncDashboardState();
});

resumeButton?.addEventListener('click', () => {
  resumeSharedSession();
  syncDashboardState();
});

resetButton?.addEventListener('click', () => {
  resetSharedSession();
  syncDashboardState();
});

advanceButton?.addEventListener('click', () => {
  advanceSharedSessionStage();
  syncDashboardState();
});
import { getState, resetState } from '../engine/state.js';
import {
  createFacilitatorSession,
  sendClue,
  formatRemainingTime
} from '../engine/sessionRuntime.js';
import {
  bindButtonAction
} from '../engine/uiBindings.js';

const sessionTimer = document.querySelector('.timer');
const sessionCodeDisplay = document.getElementById('session-code-display');
const guidancePanels = document.querySelectorAll('.snapshot-card');

function refreshFacilitatorView() {
  const state = getState();

  if (sessionTimer && state.sessionStatus === 'active') {
    sessionTimer.textContent = formatRemainingTime();
  }

  if (sessionCodeDisplay && state.sessionCode) {
    sessionCodeDisplay.textContent = state.sessionCode;
  }

  const cluePanel = Array.from(guidancePanels)
    .find((panel) => panel.textContent.includes('Clue Requests'));

  if (cluePanel) {
    const requests = state.clueRequests || [];
    const button = cluePanel.querySelector('button');

    if (button) {
      button.textContent = requests.length
        ? `Send Clue (${requests.length})`
        : 'Send Clue';
    }
  }
}

bindButtonAction('#print-prep-btn', () => {
  alert('Prepare printed evidence packets, QR markers, clue envelopes, and evidence board materials.');
});

bindButtonAction('#activate-session-btn', () => {
  const state = createFacilitatorSession();

  alert(`Scenario Activated: ${state.sessionCode}`);

  refreshFacilitatorView();
});

bindButtonAction('#send-clue-btn', () => {
  sendClue();

  alert('Clue sent to participants.');

  refreshFacilitatorView();
});

window.addEventListener('beforeunload', () => {
  resetState();
});

refreshFacilitatorView();
setInterval(refreshFacilitatorView, 1000);

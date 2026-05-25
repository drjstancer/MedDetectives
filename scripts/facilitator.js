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
const guidancePanels = document.querySelectorAll('.snapshot-card');

function refreshFacilitatorView() {
  const state = getState();

  if (sessionTimer && state.sessionStatus === 'active') {
    sessionTimer.textContent = formatRemainingTime();
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

bindButtonAction('.primary-button', () => {
  const state = createFacilitatorSession();

  alert(`Scenario Activated: ${state.sessionCode}`);

  refreshFacilitatorView();
});

bindButtonAction('.secondary-button', () => {
  sendClue();

  alert('Clue sent to participants.');

  refreshFacilitatorView();
});

window.addEventListener('beforeunload', () => {
  resetState();
});

refreshFacilitatorView();
setInterval(refreshFacilitatorView, 1000);

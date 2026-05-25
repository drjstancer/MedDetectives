import { getState, resetState } from '../engine/state.js';
import {
  createFacilitatorSession,
  sendClue,
  formatRemainingTime
} from '../engine/sessionRuntime.js';

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

    cluePanel.querySelector('button').textContent =
      requests.length
        ? `Send Clue (${requests.length})`
        : 'Send Clue';
  }
}

document.querySelector('.primary-button')?.addEventListener('click', () => {
  const state = createFacilitatorSession();

  alert(`Scenario Activated: ${state.sessionCode}`);

  refreshFacilitatorView();
});

document.querySelector('.secondary-button')?.addEventListener('click', () => {
  sendClue();

  alert('Clue sent to participants.');

  refreshFacilitatorView();
});

window.addEventListener('beforeunload', () => {
  resetState();
});

refreshFacilitatorView();
setInterval(refreshFacilitatorView, 1000);

import { getState, resetState } from '../engine/state.js';
import {
  createFacilitatorSession,
  sendClue,
  formatRemainingTime
} from '../engine/sessionRuntime.js';
import {
  bindButtonAction
} from '../engine/uiBindings.js';

const facilitatorTimer = document.getElementById('facilitator-timer');
const sessionCodeDisplay = document.getElementById('session-code-display');
const currentStageDisplay = document.getElementById('current-stage-display');
const usedCluesPanel = document.getElementById('used-clues');
const clueSelect = document.getElementById('clue-select');

function refreshFacilitatorView() {
  const state = getState();

  if (facilitatorTimer && state.sessionStatus === 'active') {
    facilitatorTimer.textContent = formatRemainingTime();
  }

  if (sessionCodeDisplay && state.sessionCode) {
    sessionCodeDisplay.textContent = state.sessionCode;
  }

  if (currentStageDisplay && state.currentStage) {
    currentStageDisplay.textContent = state.currentStage;
  }

  if (usedCluesPanel) {
    const clues = state.usedClues || [];

    usedCluesPanel.innerHTML = clues.length
      ? clues.map((clue) => `<div>${clue}</div>`).join('')
      : 'No clues sent.';
  }
}

bindButtonAction('#activate-session-btn', () => {
  const state = createFacilitatorSession();

  alert(`Scenario Activated: ${state.sessionCode}`);

  refreshFacilitatorView();
});

bindButtonAction('#send-clue-btn', () => {
  const state = getState();
  const selectedClue = clueSelect?.value || 'timeline';

  sendClue(selectedClue);

  const usedClues = state.usedClues || [];

  usedClues.push(selectedClue);

  state.usedClues = usedClues;

  alert('Clue sent to participants.');

  refreshFacilitatorView();
});

window.addEventListener('beforeunload', () => {
  resetState();
});

refreshFacilitatorView();
setInterval(refreshFacilitatorView, 1000);

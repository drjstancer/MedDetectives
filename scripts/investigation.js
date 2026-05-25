import { getState, updateState } from '../engine/state.js';
import {
  activateParticipantSession,
  formatRemainingTime,
  getRemainingMilliseconds,
  requestClue,
  markForfeit
} from '../engine/sessionRuntime.js';
import { ProgressionMap } from '../engine/progressionMap.js';

const timerElement = document.getElementById('countdown-timer');
const clueCounter = document.getElementById('clue-counter');
const activationForm = document.getElementById('activation-form');
const clueButton = document.getElementById('clue-btn');
const reasoningButton = document.getElementById('reasoning-btn');

function updateTimer() {
  if (!timerElement) {
    return;
  }

  const remaining = getRemainingMilliseconds();

  timerElement.textContent = formatRemainingTime(remaining);

  if (remaining <= 10 * 60 * 1000) {
    timerElement.style.color = '#ff9d7a';
  }

  if (remaining <= 0) {
    timerElement.textContent = '00:00';
    markForfeit('Time expired before scenario completion.');
    alert('Investigation time has expired.');
  }
}

function updateClueCounter() {
  const state = getState();
  const remaining = 3 - (state.cluesUsed || 0);

  clueCounter.textContent = `Clues Remaining: ${remaining}`;
}

function advanceScenarioStage() {
  const state = getState();
  const currentStage = state.currentStage || 'stage-01-activation';

  const progression = ProgressionMap[currentStage];

  if (!progression || !progression.unlocks.length) {
    alert('Continue investigating unresolved evidence.');
    return;
  }

  const nextStage = progression.unlocks[0];

  updateState({
    currentStage: nextStage
  });

  alert(`Stage Updated: ${nextStage}`);
}

activationForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const teamName = document.getElementById('teamName').value;
  const sessionCode = document.getElementById('sessionCode').value;

  activateParticipantSession({
    teamName,
    sessionCode
  });

  updateState({
    currentStage: 'stage-01-activation'
  });

  updateTimer();

  alert('Scenario Activated');
});

clueButton?.addEventListener('click', () => {
  const result = requestClue();

  if (!result.accepted) {
    alert(result.message);
    return;
  }

  updateClueCounter();

  alert('Facilitator has been notified of your clue request.');
});

reasoningButton?.addEventListener('click', () => {
  advanceScenarioStage();
});

window.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    markForfeit('Participant session left active investigation screen.');
  }
});

updateClueCounter();
updateTimer();
setInterval(updateTimer, 1000);

console.log('investigation', getState());

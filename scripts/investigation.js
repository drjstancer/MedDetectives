import { getState } from '../engine/state.js';
import {
  activateParticipantSession,
  formatRemainingTime,
  getRemainingMilliseconds,
  requestClue,
  markForfeit
} from '../engine/sessionRuntime.js';

const timerElement = document.getElementById('countdown-timer');
const clueCounter = document.getElementById('clue-counter');
const activationForm = document.getElementById('activation-form');
const clueButton = document.getElementById('clue-btn');

function updateTimer() {
  if (!timerElement) {
    return;
  }

  timerElement.textContent = formatRemainingTime();

  if (getRemainingMilliseconds() <= 0) {
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

activationForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const teamName = document.getElementById('teamName').value;
  const sessionCode = document.getElementById('sessionCode').value;

  activateParticipantSession({
    teamName,
    sessionCode
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

window.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    markForfeit('Participant session left active investigation screen.');
  }
});

updateClueCounter();
updateTimer();
setInterval(updateTimer, 1000);

console.log('investigation', getState());

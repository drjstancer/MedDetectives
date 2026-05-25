import { getState, updateState } from '../engine/state.js';
import { subscribe } from '../engine/eventBus.js';
import {
  activateParticipantSession,
  formatRemainingTime,
  getRemainingMilliseconds,
  requestClue,
  markForfeit
} from '../engine/sessionRuntime.js';
import { ProgressionMap } from '../engine/progressionMap.js';
import { getDiscoveryById } from '../engine/discoveryRegistry.js';
import { validateInvestigationPin } from '../engine/pinValidator.js';
import {
  bindButtonAction,
  bindFormSubmission
} from '../engine/uiBindings.js';

const timerElement = document.getElementById('countdown-timer');
const clueCounter = document.getElementById('clue-counter');
const completionPanel = document.getElementById('completion-panel');
const clueFeed = document.getElementById('participant-clue-feed');
const discoveryFeed = document.getElementById('discovery-feed');

function renderDiscovery(discovery) {
  if (!discoveryFeed || !discovery) return;

  discoveryFeed.innerHTML += `
    <article class="participant-discovery-card">
      <span>${discovery.category}</span>
      <h3>${discovery.title}</h3>
      <p>${discovery.content}</p>
    </article>
  `;
}

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
  }
}

function updateClueCounter() {
  const state = getState();
  const remaining = 3 - (state.cluesUsed || 0);

  clueCounter.textContent = `Clues Remaining: ${remaining}`;
}

function renderParticipantClues() {
  if (!clueFeed) return;

  const state = getState();
  const clues = state.sentClues || [];

  clueFeed.innerHTML = clues.length
    ? clues.map((clue) => `
      <article class="participant-clue-card">
        <h3>Facilitator Clue</h3>
        <p>${clue.message}</p>
      </article>
    `).join('')
    : '<p>No facilitator clues received yet.</p>';
}

subscribe('CLUE_SENT', (clue) => {
  const state = getState();

  updateState({
    sentClues: [...(state.sentClues || []), clue]
  });

  renderParticipantClues();
});

function completeScenario() {
  updateState({
    sessionStatus: 'completed'
  });

  if (completionPanel) {
    completionPanel.style.display = 'block';
  }
}

function advanceScenarioStage() {
  const state = getState();
  const currentStage = state.currentStage || 'stage-01-activation';

  const progression = ProgressionMap[currentStage];

  if (!progression || !progression.unlocks.length) {
    completeScenario();
    return;
  }

  const nextStage = progression.unlocks[0];

  if (nextStage === 'final-synthesis') {
    completeScenario();
    return;
  }

  updateState({
    currentStage: nextStage
  });

  console.log(`Stage Updated: ${nextStage}`);
}

bindFormSubmission('#activation-form', (event) => {
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
});

bindButtonAction('#scan-qr-btn', () => {
  const discovery = getDiscoveryById('qr-01');

  renderDiscovery(discovery);
});

bindButtonAction('#pin-submit-btn', () => {
  const pinInput = document.getElementById('access-pin-input');

  const result = validateInvestigationPin(pinInput?.value || '');

  if (!result.valid) {
    console.log(result.message);
    return;
  }

  const discovery = getDiscoveryById(result.discoveryId);

  renderDiscovery(discovery);
});

bindButtonAction('#reasoning-btn', (event) => {
  event.preventDefault();
  advanceScenarioStage();
});

window.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    markForfeit('Participant session left active investigation screen.');
  }
});

updateClueCounter();
updateTimer();
renderParticipantClues();
setInterval(updateTimer, 1000);

console.log('investigation', getState());

import { getState, updateState } from '../engine/state.js';
import { subscribe } from '../engine/eventBus.js';
import {
  activateParticipantSession,
  formatRemainingTime,
  getRemainingMilliseconds,
  markForfeit
} from '../engine/sessionRuntime.js';
import { ProgressionMap } from '../engine/progressionMap.js';
import { getDiscoveryById } from '../engine/discoveryRegistry.js';
import { validateInvestigationPin } from '../engine/pinValidator.js';
import { startQrScanner } from '../engine/qrScanner.js';
import {
  bindButtonAction,
  bindFormSubmission
} from '../engine/uiBindings.js';

const timerElement = document.getElementById('countdown-timer');
const clueCounter = document.getElementById('clue-counter');
const completionPanel = document.getElementById('completion-panel');
const clueFeed = document.getElementById('participant-clue-feed');
const discoveryFeed = document.getElementById('discovery-feed');
const activationCard = document.getElementById('activation-card');
const activationStatus = document.getElementById('activation-status');
const activationTeamName = document.getElementById('activation-team-name');
const qrVideo = document.getElementById('qr-video');
const qrShell = document.getElementById('qr-scanner-shell');
let timerLoop = null;

function renderDiscovery(discovery) {
  if (!discoveryFeed || !discovery) return;

  const state = getState();
  const discoveries = state.discoveries || [];

  if (!discoveries.includes(discovery.type)) {
    updateState({
      discoveries: [...discoveries, discovery.type]
    });
  }

  discoveryFeed.innerHTML += `
    <article class="participant-discovery-card">
      <span>${discovery.category}</span>
      <h3>${discovery.title}</h3>
      <p>${discovery.content}</p>
    </article>
  `;
}

function activateLiveInvestigationCard(teamName) {
  if (!activationCard) return;

  activationCard.classList.add('live');

  if (activationStatus) {
    activationStatus.textContent = 'INVESTIGATION ACTIVE';
  }

  if (activationTeamName) {
    activationTeamName.textContent = teamName;
  }
}

function updateTimer() {
  if (!timerElement) return;

  const remaining = getRemainingMilliseconds();

  timerElement.textContent = formatRemainingTime(remaining);

  if (remaining <= 10 * 60 * 1000) {
    timerElement.style.color = '#ff9d7a';
  }

  if (remaining <= 0) {
    timerElement.textContent = '00:00';
    markForfeit('Time expired before scenario completion.');
    clearInterval(timerLoop);
  }
}

function startTimerLoop() {
  clearInterval(timerLoop);
  updateTimer();
  timerLoop = setInterval(updateTimer, 1000);
}

function updateClueCounter() {
  if (!clueCounter) return;

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

  if (!progression) return;

  const discoveries = state.discoveries || [];
  const ready = (progression.requiredDiscoveries || []).every((required) =>
    discoveries.includes(required)
  );

  if (!ready) {
    if (discoveryFeed) {
      discoveryFeed.innerHTML += `
        <article class="participant-discovery-card">
          <span>Reasoning Checkpoint</span>
          <h3>More Evidence Needed</h3>
          <p>Your team should gather and interpret more evidence before advancing.</p>
        </article>
      `;
    }
    return;
  }

  if (!progression.unlocks.length) {
    completeScenario();
    return;
  }

  const nextStage = progression.unlocks[0];

  updateState({
    currentStage: nextStage
  });

  if (discoveryFeed) {
    discoveryFeed.innerHTML += `
      <article class="participant-discovery-card">
        <span>Investigation Progression</span>
        <h3>New Stage Unlocked</h3>
        <p>${nextStage}</p>
      </article>
    `;
  }
}

bindFormSubmission('#activation-form', (event) => {
  event.preventDefault();

  const teamNameInput = document.getElementById('teamName');
  const sessionCodeInput = document.getElementById('sessionCode');

  const teamName = teamNameInput.value;
  const sessionCode = sessionCodeInput.value;

  activateParticipantSession({
    teamName,
    sessionCode
  });

  updateState({
    currentStage: 'stage-01-activation'
  });

  teamNameInput.setAttribute('disabled', true);
  sessionCodeInput.setAttribute('disabled', true);

  activateLiveInvestigationCard(teamName);
  startTimerLoop();
});

bindButtonAction('#scan-qr-btn', async () => {
  if (qrShell) {
    qrShell.style.display = 'block';
  }

  await startQrScanner({
    videoElement: qrVideo,
    onDiscovery: (value) => {
      const discovery = getDiscoveryById(value);

      renderDiscovery(discovery);

      if (qrShell) {
        qrShell.style.display = 'none';
      }
    }
  });
});

bindButtonAction('#pin-submit-btn', () => {
  const pinInput = document.getElementById('access-pin-input');
  const result = validateInvestigationPin(pinInput?.value || '');

  if (!result.valid) {
    if (discoveryFeed) {
      discoveryFeed.innerHTML += `
        <article class="participant-discovery-card">
          <span>Access PIN</span>
          <h3>Evidence Still Incomplete</h3>
          <p>${result.message}</p>
        </article>
      `;
    }
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

console.log('investigation', getState());

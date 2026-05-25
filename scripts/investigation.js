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
import { qrDiscoveryMap } from '../content/qr/qrDiscoveryMap.js';
import { canAccessDiscovery } from '../engine/progressionLocks.js';
import {
  bindButtonAction,
  bindFormSubmission
} from '../engine/uiBindings.js';

const timerElement = document.getElementById('countdown-timer');
const completionPanel = document.getElementById('completion-panel');
const discoveryFeed = document.getElementById('discovery-feed');
const activationCard = document.getElementById('activation-card');
const activationStatus = document.getElementById('activation-status');
const activationTeamName = document.getElementById('activation-team-name');
const qrVideo = document.getElementById('qr-video');
const qrShell = document.getElementById('qr-scanner-shell');
let timerLoop = null;

function renderFeedCard({ category, title, content }) {
  discoveryFeed.innerHTML += `
    <article class="participant-discovery-card">
      <span>${category}</span>
      <h3>${title}</h3>
      <p>${content}</p>
    </article>
  `;
}

function renderDiscovery(discovery) {
  if (!discoveryFeed || !discovery) return;

  const state = getState();
  const discoveries = state.discoveries || [];

  if (discoveries.includes(discovery.id)) {
    renderFeedCard({
      category: 'Duplicate Discovery',
      title: 'Evidence Already Reviewed',
      content: 'Your team has already analyzed this artifact.'
    });

    return;
  }

  updateState({
    discoveries: [...discoveries, discovery.id]
  });

  renderFeedCard({
    category: discovery.category,
    title: discovery.title,
    content: discovery.content
  });
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
    renderFeedCard({
      category: 'Reasoning Checkpoint',
      title: 'Additional Evidence Required',
      content: 'Your team must locate more physical evidence before progressing.'
    });

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

  renderFeedCard({
    category: 'Stage Progression',
    title: 'New Investigation Phase',
    content: nextStage
  });
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
    currentStage: 'stage-01-activation',
    discoveries: []
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
      const currentStage = getState().currentStage;

      const allowed = canAccessDiscovery({
        currentStage,
        uri: value
      });

      if (!allowed) {
        renderFeedCard({
          category: 'Locked Evidence',
          title: 'Discovery Not Yet Available',
          content: 'Your team has not progressed far enough to interpret this artifact.'
        });

        if (qrShell) {
          qrShell.style.display = 'none';
        }

        return;
      }

      const discoveryId = qrDiscoveryMap[value] || value;
      const discovery = getDiscoveryById(discoveryId);

      if (!discovery) {
        renderFeedCard({
          category: 'Scan Error',
          title: 'Unknown Artifact',
          content: 'The scanned QR code does not match an investigation artifact.'
        });

        if (qrShell) {
          qrShell.style.display = 'none';
        }

        return;
      }

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
    renderFeedCard({
      category: 'Access PIN',
      title: 'Evidence Still Incomplete',
      content: result.message
    });

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

updateTimer();

console.log('investigation', getState());

import { getState, updateState } from '../engine/state.js';
import { subscribe } from '../engine/eventBus.js';
import {
  activateParticipantSession,
  formatRemainingTime,
  markForfeit
} from '../engine/sessionRuntime.js';
import {
  bindParticipantToSession,
  getParticipantStage,
  getParticipantTimerMilliseconds,
  isParticipantSessionActive
} from '../engine/liveSessionSync.js';
import { ProgressionMap } from '../engine/progressionMap.js';
import { getDiscoveryById } from '../engine/discoveryRegistry.js';
import { validateInvestigationPin } from '../engine/pinValidator.js';
import { startQrScanner } from '../engine/qrScanner.js';
import { qrDiscoveryMap } from '../content/qr/qrDiscoveryMap.js';
import { canAccessDiscovery } from '../engine/progressionLocks.js';
import { getConnectedEvidence } from '../engine/evidenceConnections.js';
import { getReinterpretationTrigger } from '../engine/reinterpretationEngine.js';
import { getInsufficientEvidenceMessage } from '../engine/insufficientEvidenceEngine.js';
import {
  initializeSessionTelemetry,
  updateSessionTelemetry
} from '../engine/sessionTelemetry.js';
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
let activeSessionCode = null;

function renderFeedCard({ category, title, content }) {
  discoveryFeed.innerHTML += `
    <article class="participant-discovery-card">
      <span>${category}</span>
      <h3>${title}</h3>
      <p>${content}</p>
    </article>
  `;
}

function syncTelemetry() {
  if (!activeSessionCode) return;

  const state = getState();

  updateSessionTelemetry(activeSessionCode, {
    currentStage: getParticipantStage(),
    discoveries: state.discoveries || []
  });
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

  syncTelemetry();

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
    activationStatus.textContent = 'LIVE INVESTIGATION ACTIVE';
  }

  if (activationTeamName) {
    activationTeamName.textContent = teamName;
  }
}

function updateTimer() {
  if (!timerElement) return;

  if (!isParticipantSessionActive()) {
    timerElement.textContent = 'SESSION PAUSED';
    return;
  }

  const elapsed = getParticipantTimerMilliseconds();

  timerElement.textContent = formatRemainingTime(
    Math.max(0, 3600000 - elapsed)
  );
}

function startTimerLoop() {
  clearInterval(timerLoop);

  updateTimer();

  timerLoop = setInterval(updateTimer, 1000);
}

bindFormSubmission('#activation-form', (event) => {
  event.preventDefault();

  const teamNameInput = document.getElementById('teamName');
  const sessionCodeInput = document.getElementById('sessionCode');

  const teamName = teamNameInput.value;
  const sessionCode = sessionCodeInput.value;

  const session = bindParticipantToSession(sessionCode);

  if (!session) {
    activationStatus.textContent = 'INVALID SESSION CODE';
    return;
  }

  activeSessionCode = sessionCode;

  initializeSessionTelemetry({
    sessionCode,
    teamName
  });

  activateParticipantSession({
    teamName,
    sessionCode
  });

  updateState({
    currentStage: session.stage,
    discoveries: []
  });

  syncTelemetry();

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
      const currentStage = getParticipantStage();

      const allowed = canAccessDiscovery({
        currentStage,
        uri: value
      });

      if (!allowed) {
        renderFeedCard({
          category: 'Locked Evidence',
          title: 'Discovery Not Yet Available',
          content: 'Your investigation has not progressed far enough to interpret this artifact.'
        });

        return;
      }

      const discoveryId = qrDiscoveryMap[value] || value;
      const discovery = getDiscoveryById(discoveryId);

      if (!discovery) {
        renderFeedCard({
          category: 'Scan Error',
          title: 'Unknown Artifact',
          content: 'The scanned evidence does not match a registered investigation artifact.'
        });

        return;
      }

      renderDiscovery(discovery);
    }
  });
});

bindButtonAction('#pin-submit-btn', () => {
  const pinInput = document.getElementById('access-pin-input');
  const result = validateInvestigationPin(pinInput?.value || '');

  if (!result.valid) {
    renderFeedCard({
      category: 'Access PIN',
      title: 'Evidence Access Denied',
      content: result.message
    });

    return;
  }

  const discovery = getDiscoveryById(result.discoveryId);
  renderDiscovery(discovery);
});

window.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    markForfeit('Participant session left active investigation screen.');
  }
});

updateTimer();

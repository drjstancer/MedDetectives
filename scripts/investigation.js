/**
 * scripts/investigation.js — Investigation Stage Controller
 *
 * Page controller for the Investigation stage.
 * Wires engine modules to the investigation UI:
 *   - Loads and displays patient status data
 *   - Renders discovered evidence (including QR URL params)
 *   - Manages challenge unlock and submission
 *   - Displays facilitator-triggered escalation updates
 *   - Runs session timer
 */

import { getState, updateState } from '../engine/state.js';
import { subscribe, publish } from '../engine/eventBus.js';
import { discoverClue, completeChallenge } from '../engine/challengeEngine.js';
import { unlockStage, advanceToNextStage, increaseEscalation } from '../engine/progression.js';
import { parseQRFromURL } from '../engine/qrCoordinator.js';

// ─── Session Guard ────────────────────────────────────────────────────────────
// Redirect to activation if no session exists
const _initialState = getState();
if (!_initialState.sessionStarted) {
  window.location.href = '../index.html';
}

// ─── DOM References ───────────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

const vitalsGrid = $('vitals-grid');
const statusNotes = $('status-notes');
const clueList = $('clue-list');
const clueEmpty = $('clue-empty-state');
const clueCounter = $('clue-counter');
const footerClueCount = $('footer-clue-count');
const objectivesList = $('objectives-list');
const manualClueInput = $('manual-clue-input');
const logEvidenceBtn = $('log-evidence-btn');
const challengeLocked = $('challenge-locked');
const challengeActive = $('challenge-active');
const submitChallengeBtn = $('submit-challenge-btn');
const escalationPanel = $('escalation-panel');
const escalationText = $('escalation-text');
const escalationIndicator = $('escalation-indicator');
const timerDisplay = $('timer-display');
const groupNameDisplay = $('group-name-display');
const qrBanner = $('qr-banner');
const qrBannerText = $('qr-banner-text');
const qrBannerClose = $('qr-banner-close');

const pips = [$('pip-0'), $('pip-1'), $('pip-2')];

// ─── QR URL Parameter Processing ──────────────────────────────────────────────
// Must happen before rendering so discovered state is current
const qrResult = parseQRFromURL();
if (qrResult) {
  qrBannerText.textContent = `🔍 Evidence logged from QR marker: ${qrResult.id}`;
  qrBanner.hidden = false;
}

qrBannerClose.addEventListener('click', () => { qrBanner.hidden = true; });

// ─── Group Name Display ──────────────────────────────────────────────────────────
groupNameDisplay.textContent = `Team: ${getState().groupName}`;

// ─── Patient Vitals ──────────────────────────────────────────────────────────────
async function renderPatientStatus() {
  const res = await fetch('../data/patient.json');
  const data = await res.json();
  const v = data.statusReadings;
  const notes = data.assessmentNotes;

  vitalsGrid.innerHTML = `
    <div class="vital">
      <span class="vital-label">Pulse</span>
      <strong class="vital-value ${v.pulse > 120 ? 'vital-warn' : ''}">${v.pulse} bpm</strong>
    </div>
    <div class="vital">
      <span class="vital-label">Blood Pressure</span>
      <strong class="vital-value ${v.pressure === '92/58' ? 'vital-warn' : ''}">${v.pressure}</strong>
    </div>
    <div class="vital">
      <span class="vital-label">Temperature</span>
      <strong class="vital-value ${v.temperatureF > 100 ? 'vital-warn' : ''}">${v.temperatureF}&deg;F</strong>
    </div>
    <div class="vital">
      <span class="vital-label">O₂ Saturation</span>
      <strong class="vital-value">${v.oxygenLevel}%</strong>
    </div>
    <div class="vital">
      <span class="vital-label">Resp. Rate</span>
      <strong class="vital-value ${v.breathing > 20 ? 'vital-warn' : ''}">${v.breathing}/min</strong>
    </div>
    <div class="vital vital-pending">
      <span class="vital-label">Glucose</span>
      <strong class="vital-value vital-pending-val">⚠️ Pending</strong>
    </div>
  `;

  // Appearance notes as a subtle contextual note
  if (notes && notes.appearance) {
    statusNotes.innerHTML = `
      <div class="appearance-note">
        <strong>On Arrival:</strong> ${notes.appearance.join(' &middot; ')}
      </div>
    `;
  }
}

// ─── Objectives Panel ─────────────────────────────────────────────────────────────
async function renderObjectives() {
  const res = await fetch('../data/objectives.json');
  const data = await res.json();
  const items = data.objectives || data.learningObjectives || [];

  if (!items.length) {
    objectivesList.innerHTML = '<li>Discover all evidence in the physical room.</li><li>Build a reasoning chain with your team.</li><li>Identify the primary situation affecting Jordan.</li>';
    return;
  }

  objectivesList.innerHTML = items
    .map(obj => `<li>${obj.description || obj.text || obj}</li>`)
    .join('');
}

// ─── Discovery Board ─────────────────────────────────────────────────────────────
async function renderDiscoveryBoard() {
  const res = await fetch('../data/clues.json');
  const { challengeClues } = await res.json();
  const discovered = getState().discoveredClues;
  const total = challengeClues.length;
  const found = challengeClues.filter(c => discovered.includes(c.clueId));

  // Update counters
  clueCounter.textContent = `Evidence: ${found.length} of ${total} found`;
  footerClueCount.textContent = `Evidence: ${found.length} / ${total}`;

  // Update progress pips
  pips.forEach((pip, i) => {
    pip.classList.toggle('pip-active', i < found.length);
  });

  // Render clue cards
  if (found.length === 0) {
    clueEmpty.hidden = false;
    clueList.innerHTML = '';
    clueList.appendChild(clueEmpty);
  } else {
    clueEmpty.hidden = true;
    clueList.innerHTML = found.map(c => `
      <li class="clue-card clue-${c.importanceLevel}">
        <div class="clue-header">
          <strong class="clue-title">${c.title}</strong>
          <span class="clue-badge clue-badge-${c.importanceLevel}">${c.importanceLevel}</span>
        </div>
        <span class="clue-category">${c.category}</span>
        <p class="clue-description">${c.description}</p>
        <div class="clue-connections">
          <span class="connections-label">Possible connections:</span>
          <ul>${c.possibleConnections.map(x => `<li>${x}</li>`).join('')}</ul>
        </div>
      </li>
    `).join('');
  }

  // Unlock challenge when all clues found
  if (found.length >= total) {
    challengeLocked.hidden = true;
    challengeActive.hidden = false;
    unlockStage('interpretation');
  }
}

// ─── Evidence Logging (Manual Entry) ─────────────────────────────────────────────
logEvidenceBtn.addEventListener('click', () => {
  const raw = manualClueInput.value.trim().toUpperCase();
  if (!raw) return;

  if (!raw.startsWith('CLUE-')) {
    manualClueInput.style.borderColor = '#ff6b6b';
    manualClueInput.placeholder = 'Use format: CLUE-001';
    return;
  }

  manualClueInput.style.borderColor = '';
  discoverClue(raw);
  manualClueInput.value = '';
  renderDiscoveryBoard();
});

manualClueInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') logEvidenceBtn.click();
});

// ─── EventBus Listeners ───────────────────────────────────────────────────────────
subscribe('discovery:clue-found', () => {
  renderDiscoveryBoard();
});

subscribe('escalation:triggered', ({ level }) => {
  renderEscalation(level);
});

// ─── Challenge Submission ─────────────────────────────────────────────────────────
submitChallengeBtn.addEventListener('click', () => {
  const reasoning = document.getElementById('team-reasoning').value.trim();

  if (!reasoning) {
    document.getElementById('team-reasoning').focus();
    document.getElementById('team-reasoning').style.borderColor = '#ff6b6b';
    return;
  }

  // Save the team's reasoning to state for the interpretation stage
  updateState({ investigationReasoning: reasoning });
  completeChallenge('timeline-sequence');
  publish('stage:complete', { stage: 'investigation' });

  submitChallengeBtn.textContent = 'Advancing to Interpretation…';
  submitChallengeBtn.disabled = true;

  setTimeout(() => {
    advanceToNextStage();
  }, 800);
});

// ─── Escalation Display ──────────────────────────────────────────────────────────
async function renderEscalation(level) {
  if (!level || level === 0) return;

  const res = await fetch('../data/escalationStages.json');
  const { escalationStages } = await res.json();
  const stage = escalationStages.find(s => s.level === level);

  if (stage) {
    escalationPanel.classList.remove('escalation-hidden');
    escalationText.innerHTML = `<strong>${stage.title}:</strong> ${stage.description}`;
    escalationIndicator.hidden = false;
  }
}

// ─── Session Timer ──────────────────────────────────────────────────────────────
function startTimer() {
  const state = getState();
  const startTime = state.sessionStartTime
    ? new Date(state.sessionStartTime).getTime()
    : Date.now();

  setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    timerDisplay.textContent = `⏱ ${mins}:${secs}`;
    updateState({ elapsedMinutes: Math.floor(elapsed / 60) });
  }, 1000);
}

// ─── Initialize Page ─────────────────────────────────────────────────────────────
(async function init() {
  updateState({ currentStage: 'investigation' });

  await renderPatientStatus();
  await renderObjectives();
  await renderDiscoveryBoard();

  const state = getState();
  if (state.escalationLevel > 0) {
    renderEscalation(state.escalationLevel);
  }

  startTimer();

  console.log('[Investigation] Stage initialized. Team:', state.groupName);
})();

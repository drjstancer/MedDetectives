/**
 * app.js — MedDetectives Session Bootstrap
 *
 * Entry point for the activation screen.
 * Handles team registration, access code validation,
 * state initialization, and handoff to the investigation stage.
 */

import { resetState, updateState } from './engine/state.js';
import { publish } from './engine/eventBus.js';

// ─── Access Code ─────────────────────────────────────────────────────────────
// Facilitators set this code before each session.
// Future: load from runtimeConfig.json for per-session customization.
const ACTIVATION_CODE = 'MEDDET2026';

// ─── DOM References ───────────────────────────────────────────────────────────
const form = document.getElementById('activation-form');
const teamNameInput = document.getElementById('teamName');
const accessCodeInput = document.getElementById('accessCode');
const errorNotice = document.getElementById('activation-error');
const beginBtn = document.getElementById('begin-btn');

// ─── Form Submission ──────────────────────────────────────────────────────────
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const groupName = teamNameInput.value.trim();
  const code = accessCodeInput.value.trim();

  // Validate access code
  if (code !== ACTIVATION_CODE) {
    errorNotice.hidden = false;
    accessCodeInput.value = '';
    accessCodeInput.focus();
    return;
  }

  // Validate team name
  if (!groupName) {
    teamNameInput.focus();
    return;
  }

  errorNotice.hidden = true;
  beginBtn.textContent = 'Launching...';
  beginBtn.disabled = true;

  // Initialize fresh session state
  resetState();
  updateState({ groupName, sessionStarted: true });

  // Signal session activation to any listeners
  publish('session:activated', { groupName });

  // Navigate to the investigation stage
  window.location.href = './pages/investigation.html';
});

// ─── Clear error on re-entry ─────────────────────────────────────────────────
accessCodeInput.addEventListener('input', () => {
  errorNotice.hidden = true;
});

console.log('[MedDetectives] Activation screen ready.');

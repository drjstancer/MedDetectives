import { getState } from '../engine/state.js';

export function renderProgressTracker(targetId) {
  const state = getState();

  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  target.innerHTML = `
    <div class="tracker-card">
      <p>Current Scene: ${state.currentScene}</p>
      <p>Escalation Level: ${state.escalationLevel}</p>
      <p>Attempts Remaining: ${state.remainingAttempts}</p>
      <p>Clues Found: ${state.discoveredClues.length}</p>
    </div>
  `;
}

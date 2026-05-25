import { getState } from '../engine/state.js';
import { evaluateCollaborativeMomentum } from '../engine/runtime/pacingRuntime.js';

function renderSnapshot() {
  const state = getState();

  const momentum = evaluateCollaborativeMomentum();

  document.getElementById('current-stage').textContent =
    state.currentStage || 'Not Started';

  document.getElementById('discovery-count').textContent =
    `${(state.discoveries || []).length} discoveries explored`;

  document.getElementById('hypothesis-count').textContent =
    `${(state.hypotheses || []).length} emerging interpretations`;

  document.getElementById('facilitator-guidance').textContent =
    momentum.suggestedFacilitatorAction;
}

renderSnapshot();

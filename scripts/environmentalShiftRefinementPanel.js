import { getEnvironmentalShiftRefinement } from '../engine/environmentalShiftRefinement.js';

const panel = document.getElementById('environmental-shift-refinement-panel');

export function renderEnvironmentalShiftRefinement(stage = 'orientation') {
  if (!panel) return;

  const refinement = getEnvironmentalShiftRefinement(stage);

  if (!refinement) return;

  panel.innerHTML = `
    <article class="participant-discovery-card">
      <span>Environmental Shift Guidance</span>

      <h3>${stage}</h3>

      <p><strong>Visual Cue:</strong> ${refinement.visualCue}</p>
      <p><strong>Facilitator Action:</strong> ${refinement.facilitatorAction}</p>
    </article>
  `;
}

renderEnvironmentalShiftRefinement();

import { getInterventionGuidance } from '../engine/facilitatorInterventionGuidance.js';

const panel = document.getElementById('facilitator-intervention-panel');

export function renderInterventionGuidance(state = 'overconfident') {
  if (!panel) return;

  const guidance = getInterventionGuidance(state);

  if (!guidance) return;

  panel.innerHTML = `
    <article class="participant-discovery-card">
      <span>Facilitator Guidance</span>

      <h3>${state}</h3>

      <p>${guidance.recommendation}</p>
    </article>
  `;
}

renderInterventionGuidance();

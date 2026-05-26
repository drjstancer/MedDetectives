import { getAudioEscalation } from '../engine/audioEscalationStages.js';

const panel = document.getElementById('audio-escalation-panel');

export function renderAudioEscalation(stage = 'orientation') {
  if (!panel) return;

  const escalation = getAudioEscalation(stage);

  if (!escalation) return;

  panel.innerHTML = `
    <article class="participant-discovery-card">
      <span>Audio Escalation Guidance</span>

      <h3>${stage}</h3>

      <p>${escalation.recommendation}</p>
    </article>
  `;
}

renderAudioEscalation();

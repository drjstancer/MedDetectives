import { getCompletionSequence } from '../engine/investigationCompletionSequence.js';

const completionPanel = document.getElementById('completion-panel');

export function playCompletionSequence() {
  if (!completionPanel) return;

  const sequence = getCompletionSequence();

  completionPanel.style.display = 'block';

  completionPanel.innerHTML = Object.values(sequence).map((phase) => `
    <article class="participant-discovery-card">
      <span>Investigation Resolution</span>
      <h3>${phase.title}</h3>
      <p>${phase.narrative}</p>
    </article>
  `).join('');
}

window.playCompletionSequence = playCompletionSequence;

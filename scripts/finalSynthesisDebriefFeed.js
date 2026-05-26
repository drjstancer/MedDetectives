import { getFinalDebriefPrompts } from '../engine/finalSynthesisDebrief.js';

const completionPanel = document.getElementById('completion-panel');

export function renderFinalDebrief() {
  if (!completionPanel) return;

  const prompts = getFinalDebriefPrompts();

  const promptMarkup = prompts.map((item) => `
    <article class="participant-discovery-card">
      <span>${item.category}</span>
      <h3>Debrief Reflection</h3>
      <p>${item.prompt}</p>
    </article>
  `).join('');

  completionPanel.innerHTML += `
    <div class="evidence-board-grid" style="margin-top:2rem;">
      ${promptMarkup}
    </div>
  `;
}

window.renderFinalDebrief = renderFinalDebrief;

import { getCognitiveBiasMoments } from '../engine/cognitiveBiasEngine.js';

const biasBoard = document.getElementById('bias-awareness-board');

export function renderBiasBoard() {
  if (!biasBoard) return;

  const moments = getCognitiveBiasMoments();

  biasBoard.innerHTML = moments.map((moment) => `
    <article class="participant-discovery-card">
      <span>${moment.bias}</span>
      <h3>Reasoning Challenge</h3>
      <p>${moment.scenario}</p>
      <p><strong>Reflection:</strong> ${moment.educationalPrompt}</p>
    </article>
  `).join('');
}

renderBiasBoard();

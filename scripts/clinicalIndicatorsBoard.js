import { getClinicalIndicators } from '../engine/clinicalIndicators.js';

const indicatorBoard = document.getElementById('clinical-indicators-board');

export function renderClinicalIndicators() {
  if (!indicatorBoard) return;

  const indicators = getClinicalIndicators();

  indicatorBoard.innerHTML = indicators.map((indicator) => `
    <article class="participant-discovery-card">
      <span>${indicator.category}</span>
      <h3>${indicator.id}</h3>
      <p>${indicator.finding}</p>
      <p><strong>Reasoning Impact:</strong> ${indicator.reasoningImpact}</p>
    </article>
  `).join('');
}

renderClinicalIndicators();

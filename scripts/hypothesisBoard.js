import {
  hypothesisTemplates,
  getEvidenceWeight
} from '../engine/clinicalReasoningEngine.js';

const hypothesisBoard = document.getElementById('hypothesis-board');

export function renderHypothesisBoard() {
  if (!hypothesisBoard) return;

  hypothesisBoard.innerHTML = hypothesisTemplates.map((hypothesis) => `
    <article class="participant-discovery-card">
      <span>Confidence: ${hypothesis.confidence}%</span>
      <h3>${hypothesis.title}</h3>
      <p><strong>Uncertainty:</strong> ${hypothesis.uncertainty}</p>
    </article>
  `).join('');
}

renderHypothesisBoard();

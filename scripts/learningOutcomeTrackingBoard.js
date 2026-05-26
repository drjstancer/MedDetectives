import { getTrackedLearningOutcomes } from '../engine/learningOutcomeTracking.js';

const trackingBoard = document.getElementById('learning-outcome-tracking-board');

export function renderLearningOutcomeTrackingBoard() {
  if (!trackingBoard) return;

  const outcomes = getTrackedLearningOutcomes();

  trackingBoard.innerHTML = Object.entries(outcomes).map(([key, outcome]) => `
    <article class="participant-discovery-card">
      <span>Tracked Competency</span>
      <h3>${outcome.competency}</h3>
      <p><strong>Demonstrated Through:</strong></p>
      <ul>
        ${outcome.achievedBy.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </article>
  `).join('');
}

renderLearningOutcomeTrackingBoard();

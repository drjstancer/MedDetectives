import { getLearningOutcomes } from '../engine/learningOutcomesEngine.js';

const outcomesBoard = document.getElementById('learning-outcomes-board');

export function renderLearningOutcomesBoard() {
  if (!outcomesBoard) return;

  const outcomes = getLearningOutcomes();

  outcomesBoard.innerHTML = outcomes.map((outcome) => `
    <article class="participant-discovery-card">
      <span>${outcome.competency}</span>
      <h3>Learning Outcome</h3>
      <p>${outcome.description}</p>
    </article>
  `).join('');
}

renderLearningOutcomesBoard();

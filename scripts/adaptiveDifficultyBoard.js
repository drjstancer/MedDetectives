import { getAdaptiveDifficultyLevels } from '../engine/adaptiveDifficultyEngine.js';

const difficultyBoard = document.getElementById('adaptive-difficulty-board');

export function renderAdaptiveDifficultyBoard() {
  if (!difficultyBoard) return;

  const levels = getAdaptiveDifficultyLevels();

  difficultyBoard.innerHTML = levels.map((level) => `
    <article class="participant-discovery-card">
      <span>Difficulty Scaling</span>
      <h3>${level.level}</h3>
      <p>${level.description}</p>
    </article>
  `).join('');
}

renderAdaptiveDifficultyBoard();

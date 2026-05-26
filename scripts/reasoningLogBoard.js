import { getCollaborativeReasoningPrompts } from '../engine/collaborativeReasoningLog.js';

const reasoningBoard = document.getElementById('reasoning-log-board');

export function renderReasoningLogBoard() {
  if (!reasoningBoard) return;

  const prompts = getCollaborativeReasoningPrompts();

  reasoningBoard.innerHTML = prompts.map((prompt) => `
    <article class="participant-discovery-card">
      <span>${prompt.category}</span>
      <h3>Collaborative Reflection</h3>
      <p>${prompt.prompt}</p>
      <textarea
        rows="4"
        placeholder="Document your team reasoning here..."
      ></textarea>
    </article>
  `).join('');
}

renderReasoningLogBoard();

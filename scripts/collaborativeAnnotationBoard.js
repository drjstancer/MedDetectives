import { getAnnotationPrompts } from '../engine/collaborativeAnnotationEngine.js';

const annotationBoard = document.getElementById('annotation-board');

export function renderAnnotationBoard() {
  if (!annotationBoard) return;

  const prompts = getAnnotationPrompts();

  annotationBoard.innerHTML = prompts.map((prompt) => `
    <article class="participant-discovery-card">
      <span>${prompt.category}</span>
      <h3>Collaborative Annotation</h3>
      <p>${prompt.instruction}</p>
      <textarea
        rows="4"
        placeholder="Document team annotations and evolving interpretations..."
      ></textarea>
    </article>
  `).join('');
}

renderAnnotationBoard();

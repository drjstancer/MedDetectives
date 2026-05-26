import { getDebriefQuestions } from '../engine/debriefToolkit.js';

const debriefBoard = document.getElementById('debrief-toolkit-board');

export function renderDebriefToolkit() {
  if (!debriefBoard) return;

  const questions = getDebriefQuestions();

  debriefBoard.innerHTML = questions.map((item) => `
    <article class="participant-discovery-card">
      <span>${item.category}</span>
      <h3>Facilitator Debrief Prompt</h3>
      <p>${item.question}</p>
    </article>
  `).join('');
}

renderDebriefToolkit();

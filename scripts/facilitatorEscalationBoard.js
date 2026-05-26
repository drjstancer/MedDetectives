import { getEscalationEvents } from '../engine/facilitatorEscalationEngine.js';

const escalationBoard = document.getElementById('facilitator-escalation-board');

export function renderEscalationBoard() {
  if (!escalationBoard) return;

  const events = getEscalationEvents();

  escalationBoard.innerHTML = events.map((event) => `
    <article class="participant-discovery-card">
      <span>Educational Escalation</span>
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      <p><strong>Instructional Goal:</strong> ${event.educationalPurpose}</p>
      <button class="secondary-button">
        Trigger Escalation Event
      </button>
    </article>
  `).join('');
}

renderEscalationBoard();

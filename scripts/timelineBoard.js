import { getTimelineEvents } from '../engine/timelineEngine.js';

const timelineBoard = document.getElementById('timeline-board');

export function renderTimelineBoard() {
  if (!timelineBoard) return;

  const events = getTimelineEvents();

  timelineBoard.innerHTML = events.map((event) => `
    <article class="participant-discovery-card">
      <span>${event.timestamp}</span>
      <h3>${event.id}</h3>
      <p>${event.summary}</p>
    </article>
  `).join('');
}

renderTimelineBoard();

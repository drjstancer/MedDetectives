import { checkRoomTimeline, timelineRoomInstructions } from '../engine/timelineEngine.js';

const timelineBoard = document.getElementById('timeline-board');

export function renderTimelineBoard() {
  if (!timelineBoard) return;

  timelineBoard.innerHTML = `
    <article class="participant-discovery-card">
      <span>Physical Room Challenge</span>
      <h3>${timelineRoomInstructions.title}</h3>

      <p>
        ${timelineRoomInstructions.instruction}
      </p>

      <form id="timeline-check-form">
        <input id="timeline-input" placeholder="Example: CARD-A,CARD-B,CARD-C" />

        <button type="submit" class="secondary-button">
          Validate Timeline Sequence
        </button>
      </form>

      <div id="timeline-result"></div>
    </article>
  `;

  const form = document.getElementById('timeline-check-form');

  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = document.getElementById('timeline-input');
    const result = document.getElementById('timeline-result');

    const submitted = input.value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const check = checkRoomTimeline(submitted);

    result.innerHTML = `
      <p>${check.message}</p>
    `;
  });
}

renderTimelineBoard();

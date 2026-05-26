import { getRoomStateTransition } from '../engine/liveRoomStateTransitions.js';

const panel = document.getElementById('live-room-state-panel');

export function renderRoomState(stage = 'orientation') {
  if (!panel) return;

  const state = getRoomStateTransition(stage);

  if (!state) return;

  panel.innerHTML = `
    <article class="participant-discovery-card">
      <span>Live Room State</span>

      <h3>${stage}</h3>

      <p><strong>Lighting:</strong> ${state.lighting}</p>
      <p><strong>Room State:</strong> ${state.roomState}</p>
    </article>
  `;
}

renderRoomState();

import { getFacilitatorLiveState } from '../engine/facilitatorLiveMonitorState.js';

const monitor = document.getElementById('facilitator-live-monitor');

export function renderFacilitatorLiveMonitor() {
  if (!monitor) return;

  const state = getFacilitatorLiveState();

  monitor.innerHTML = state.activeTeams.map((team) => `
    <article class="participant-discovery-card">
      <span>Live Investigation Team</span>

      <h3>${team.team}</h3>

      <p><strong>Stage:</strong> ${team.stage}</p>
      <p><strong>Confidence State:</strong> ${team.confidenceState}</p>
      <p><strong>Unresolved Contradictions:</strong> ${team.unresolvedContradictions}</p>

      <p>
        ${team.facilitatorAttention
          ? 'Facilitator attention recommended.'
          : 'No immediate intervention required.'}
      </p>
    </article>
  `).join('');
}

renderFacilitatorLiveMonitor();

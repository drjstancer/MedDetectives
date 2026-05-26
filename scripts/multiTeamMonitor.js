import { getMultiTeamState } from '../engine/multiTeamSessionState.js';

const liveMonitor = document.getElementById('facilitator-live-monitor');

export function renderMultiTeamMonitor() {
  if (!liveMonitor) return;

  const sessions = getMultiTeamState();

  liveMonitor.innerHTML = sessions.map((session) => `
    <article class="participant-discovery-card">
      <span>Live Session</span>

      <h3>${session.teamName}</h3>

      <p><strong>Session:</strong> ${session.sessionCode}</p>
      <p><strong>Stage:</strong> ${session.currentStage}</p>
      <p><strong>Contradictions Active:</strong> ${session.contradictionsActive}</p>
      <p><strong>Escalation:</strong> ${session.escalationLevel}</p>

      <p>
        ${session.facilitatorAttention
          ? 'Facilitator intervention recommended.'
          : 'Team progressing without immediate intervention.'}
      </p>
    </article>
  `).join('');
}

renderMultiTeamMonitor();

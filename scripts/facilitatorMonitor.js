import { getAllSessionTelemetry } from '../engine/sessionTelemetry.js';

const sessionGrid = document.getElementById('live-session-grid');

function renderTelemetryCards() {
  const sessions = getAllSessionTelemetry();

  if (!sessions.length) {
    sessionGrid.innerHTML = `
      <article class="portal-card">
        <p class="eyebrow">No Active Teams</p>
        <h2>Waiting for Investigation Activation</h2>
      </article>
    `;

    return;
  }

  sessionGrid.innerHTML = sessions.map((session) => `
    <article class="portal-card">
      <p class="eyebrow">${session.sessionCode}</p>
      <h2>${session.teamName}</h2>

      <p><strong>Stage:</strong> ${session.currentStage}</p>
      <p><strong>Status:</strong> ${session.status}</p>
      <p><strong>Discoveries:</strong> ${session.discoveries.length}</p>
      <p><strong>Updated:</strong> ${session.lastUpdated}</p>
    </article>
  `).join('');
}

renderTelemetryCards();
setInterval(renderTelemetryCards, 2000);

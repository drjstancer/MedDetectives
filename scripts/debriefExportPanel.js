import { buildDebriefExport } from '../engine/debriefSynthesisExport.js';
import { getMultiTeamState } from '../engine/multiTeamSessionState.js';

const panel = document.getElementById('debrief-export-panel');

export function renderDebriefExport() {
  if (!panel) return;

  const sessions = getMultiTeamState();

  panel.innerHTML = sessions.map((session) => {
    const exportData = buildDebriefExport(session);

    return `
      <article class="participant-discovery-card">
        <span>Debrief Export</span>

        <h3>${exportData.teamName}</h3>

        <p><strong>Session:</strong> ${exportData.sessionCode}</p>
        <p><strong>Final Stage:</strong> ${exportData.finalStage}</p>
        <p><strong>Contradictions Encountered:</strong> ${exportData.contradictionsEncountered}</p>

        <p>${exportData.reasoningSummary.join(' ')}</p>

        <p>
          <strong>Facilitator Reflection:</strong>
          ${exportData.facilitatorReflection}
        </p>
      </article>
    `;
  }).join('');
}

renderDebriefExport();

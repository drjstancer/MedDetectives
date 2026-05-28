import { generateFacilitatorCommandCenter } from '../services/facilitatorCommandCenterService.js';
import { getRegisteredSessions, getActiveSession } from './sharedSessionTimer.js';

function renderOperationalAwareness() {
  const activeSession = getActiveSession();

  if (!activeSession) {
    return;
  }

  const commandCenter = generateFacilitatorCommandCenter({
    session: activeSession,
    telemetry: [],
    presence: [],
    integrityReport: {
      valid: true
    },
    insights: []
  });

  const continuityDisplay = document.getElementById('continuity-status-display');
  const continuityRecommendation = document.getElementById('continuity-recommendation-display');
  const synchronizationDisplay = document.getElementById('synchronization-status-display');
  const escalationDisplay = document.getElementById('escalation-readiness-display');
  const recommendationDisplay = document.getElementById('facilitator-recommendations-display');

  if (continuityDisplay) {
    continuityDisplay.textContent =
      commandCenter.diagnostics.integrityStatus || 'stable';
  }

  if (continuityRecommendation) {
    continuityRecommendation.textContent =
      commandCenter.diagnostics.facilitatorRecommendation ||
      'Continue facilitator-led orchestration.';
  }

  if (synchronizationDisplay) {
    synchronizationDisplay.textContent =
      commandCenter.hud.synchronizationState || 'stable';
  }

  if (escalationDisplay) {
    escalationDisplay.textContent =
      commandCenter.escalationAnalytics.escalationReadiness ||
      'facilitator-judgment-required';
  }

  if (recommendationDisplay) {
    recommendationDisplay.innerHTML =
      commandCenter.recommendations.length > 0
        ? commandCenter.recommendations
            .map(rec => `<p>${rec.recommendation}</p>`)
            .join('')
        : '<p>No recommendations surfaced.</p>';
  }
}

window.addEventListener('load', renderOperationalAwareness);
window.addEventListener('storage', renderOperationalAwareness);

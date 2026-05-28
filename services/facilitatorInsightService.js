import {
  evaluateSessionStagnation
} from './stagnationDetectionService.js';

export function generateFacilitatorInsights({
  session,
  telemetry,
  presence
}) {
  const insights = [];

  const stagnation = evaluateSessionStagnation(session, telemetry);

  if (stagnation.stagnant) {
    insights.push({
      type: 'stagnation',
      recommendation: stagnation.recommendation
    });
  }

  if ((presence || []).length <= 1) {
    insights.push({
      type: 'collaboration-risk',
      recommendation: 'Encourage collaborative synthesis and shared interpretation.'
    });
  }

  if (telemetry?.contradictionsIgnored) {
    insights.push({
      type: 'interpretation-pattern',
      recommendation: 'Consider redirecting attention toward unresolved contradictions.'
    });
  }

  return insights;
}

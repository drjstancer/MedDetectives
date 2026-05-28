export function generateInterventionRecommendations({
  session,
  telemetry,
  insights
}) {
  const recommendations = [];

  if (insights.some(i => i.type === 'stagnation')) {
    recommendations.push({
      type: 'synthesis-redirection',
      recommendation: 'Encourage participants to revisit conflicting witness interpretations.'
    });
  }

  if ((telemetry?.contradictionsViewed || 0) === 0) {
    recommendations.push({
      type: 'contradiction-release',
      recommendation: 'Consider introducing a contradiction-linked artifact or prompt.'
    });
  }

  if (session?.stage === 'timeline-instability') {
    recommendations.push({
      type: 'timeline-synthesis',
      recommendation: 'Encourage participants to physically reconstruct the BREAK sequence collaboratively.'
    });
  }

  return recommendations;
}

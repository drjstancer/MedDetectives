const STAGNATION_THRESHOLD_MINUTES = 12;

export function evaluateSessionStagnation(session, telemetry = {}) {
  const lastMeaningfulAction = telemetry.lastMeaningfulActionAt;

  if (!lastMeaningfulAction) {
    return {
      stagnant: false,
      recommendation: null
    };
  }

  const minutesInactive = (
    Date.now() - new Date(lastMeaningfulAction).getTime()
  ) / (1000 * 60);

  if (minutesInactive < STAGNATION_THRESHOLD_MINUTES) {
    return {
      stagnant: false,
      recommendation: null
    };
  }

  return {
    stagnant: true,
    recommendation: generateRecommendation(session)
  };
}

function generateRecommendation(session) {
  switch (session.stage) {
    case 'orientation':
      return 'Consider redirecting participants toward overlooked relational evidence.';

    case 'timeline-instability':
      return 'Consider encouraging reinterpretation of conflicting timeline fragments.';

    case 'emotional-escalation':
      return 'Consider releasing a contradiction or emotional-context artifact.';

    default:
      return 'Consider facilitator-guided synthesis questioning.';
  }
}

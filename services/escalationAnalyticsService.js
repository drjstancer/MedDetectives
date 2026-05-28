export function generateEscalationAnalytics({
  session,
  telemetry = []
}) {
  const stageEvents = telemetry.filter(
    event => event.type === 'stage-update'
  );

  const interventionEvents = telemetry.filter(
    event => event.type === 'facilitator-intervention'
  );

  const contradictionEvents = telemetry.filter(
    event => event.type === 'contradiction-viewed'
  );

  return {
    sessionCode: session?.code || null,
    currentStage: session?.stage || null,
    stageChanges: stageEvents.length,
    facilitatorInterventions: interventionEvents.length,
    contradictionsViewed: contradictionEvents.length,
    escalationReadiness: determineEscalationReadiness({
      session,
      contradictionEvents,
      interventionEvents
    })
  };
}

function determineEscalationReadiness({
  session,
  contradictionEvents,
  interventionEvents
}) {
  if (!session) {
    return 'unknown';
  }

  if (session.stage === 'orientation') {
    return 'not-ready';
  }

  if (contradictionEvents.length === 0) {
    return 'needs-contradiction-engagement';
  }

  if (interventionEvents.length > 3) {
    return 'monitor-for-over-facilitation';
  }

  return 'ready-for-facilitator-judgment';
}

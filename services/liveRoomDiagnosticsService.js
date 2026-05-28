export function generateLiveRoomDiagnostics({
  session,
  telemetry = [],
  presence = [],
  integrityReport = null
}) {
  return {
    sessionCode: session?.code || null,
    stage: session?.stage || 'unknown',
    activeParticipants: presence.length,
    telemetryEvents: telemetry.length,
    integrityStatus: integrityReport?.valid
      ? 'stable'
      : 'attention-needed',
    continuityRisk: determineContinuityRisk({
      telemetry,
      presence,
      integrityReport
    }),
    facilitatorRecommendation: determineRecommendation({
      telemetry,
      presence,
      integrityReport
    }),
    generatedAt: new Date().toISOString()
  };
}

function determineContinuityRisk({
  telemetry,
  presence,
  integrityReport
}) {
  if (!integrityReport?.valid) {
    return 'high';
  }

  if (presence.length === 0) {
    return 'moderate';
  }

  if (telemetry.length === 0) {
    return 'low-visibility';
  }

  return 'stable';
}

function determineRecommendation({
  telemetry,
  presence,
  integrityReport
}) {
  if (!integrityReport?.valid) {
    return 'Stabilize orchestration continuity before escalating the investigation.';
  }

  if (presence.length === 0) {
    return 'Verify participant continuity in the physical room before relying on digital synchronization.';
  }

  if (telemetry.length === 0) {
    return 'Continue facilitator-led physical investigation while monitoring synchronization visibility.';
  }

  return 'Room diagnostics appear stable. Continue facilitator-guided escalation pacing.';
}

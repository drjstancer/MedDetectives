import {
  validateSessionIntegrity
} from './serverReconciliationService.js';

export function generateOrchestrationIntegrityReport({
  session,
  telemetry = [],
  presence = []
}) {
  const integrity = validateSessionIntegrity(session);

  return {
    sessionCode: session?.code || null,
    valid: integrity.valid,
    issues: integrity.issues,
    telemetryEvents: telemetry.length,
    participantCount: presence.length,
    generatedAt: new Date().toISOString(),
    recommendedAction: generateRecommendedAction({
      integrity,
      telemetry,
      presence
    })
  };
}

function generateRecommendedAction({
  integrity,
  telemetry,
  presence
}) {
  if (!integrity.valid) {
    return 'Pause escalation and restore session state before advancing the investigation.';
  }

  if (presence.length === 0) {
    return 'Confirm participants are physically present and connected before relying on digital synchronization.';
  }

  if (telemetry.length === 0) {
    return 'Continue physical-room facilitation; digital telemetry has not yet recorded meaningful activity.';
  }

  return 'Session integrity appears stable. Continue facilitator-led orchestration.';
}

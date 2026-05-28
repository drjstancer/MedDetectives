export function generateParticipantReconnectExperience({
  session,
  recoveryStatus,
  diagnostics
}) {
  return {
    title: generateReconnectTitle(session),
    narrativeMessage: generateNarrativeMessage(session),
    continuityMessage: generateContinuityMessage(recoveryStatus),
    facilitatorGuidance: generateFacilitatorGuidance(diagnostics),
    generatedAt: new Date().toISOString()
  };
}

function generateReconnectTitle(session) {
  if (!session) {
    return 'Investigation Connection Interrupted';
  }

  return 'Investigation Continuity Restored';
}

function generateNarrativeMessage(session) {
  if (!session) {
    return 'Reconnect with your facilitator to restore investigation continuity.';
  }

  return `Your team has re-entered the investigation during the ${session.stage} phase.`;
}

function generateContinuityMessage(recoveryStatus) {
  if (!recoveryStatus?.recovered) {
    return 'The room remains the primary investigation environment.';
  }

  return 'Collaborative investigation continuity has been restored.';
}

function generateFacilitatorGuidance(diagnostics) {
  if (!diagnostics) {
    return 'Continue facilitator-led investigation pacing.';
  }

  return diagnostics.facilitatorRecommendation ||
    'Maintain collaborative interpretation and pacing continuity.';
}

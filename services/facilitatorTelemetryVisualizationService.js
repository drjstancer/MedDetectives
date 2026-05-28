export function generateFacilitatorTelemetryVisualization({
  telemetry = []
}) {
  const grouped = groupTelemetryByType(telemetry);

  return {
    qrScans: grouped['qr-scan'] || 0,
    pinUnlocks: grouped['pin-unlock'] || 0,
    contradictionsViewed: grouped['contradiction-viewed'] || 0,
    facilitatorInterventions: grouped['facilitator-intervention'] || 0,
    stageChanges: grouped['stage-update'] || 0,
    interpretationSignals: generateInterpretationSignals(grouped)
  };
}

function groupTelemetryByType(telemetry) {
  return telemetry.reduce((accumulator, event) => {
    accumulator[event.type] = (accumulator[event.type] || 0) + 1;
    return accumulator;
  }, {});
}

function generateInterpretationSignals(grouped) {
  const signals = [];

  if ((grouped['contradiction-viewed'] || 0) === 0) {
    signals.push('Participants may not yet be engaging contradictory evidence.');
  }

  if ((grouped['pin-unlock'] || 0) < 1) {
    signals.push('Consider redirecting attention toward hidden relational evidence.');
  }

  if ((grouped['facilitator-intervention'] || 0) > 4) {
    signals.push('Monitor pacing for possible over-facilitation.');
  }

  return signals;
}

const telemetryStore = new Map();

export function initializeSessionTelemetry({
  sessionCode,
  teamName
}) {
  telemetryStore.set(sessionCode, {
    sessionCode,
    teamName,
    currentStage: 'stage-01-activation',
    discoveries: [],
    lastUpdated: new Date().toISOString(),
    status: 'active'
  });
}

export function updateSessionTelemetry(sessionCode, updates) {
  const existing = telemetryStore.get(sessionCode);

  if (!existing) return;

  telemetryStore.set(sessionCode, {
    ...existing,
    ...updates,
    lastUpdated: new Date().toISOString()
  });
}

export function getAllSessionTelemetry() {
  return Array.from(telemetryStore.values());
}

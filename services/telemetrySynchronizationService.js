const TELEMETRY_KEY = 'meddetectives-session-telemetry';

export function recordTelemetryEvent({
  sessionCode,
  type,
  metadata = {}
}) {
  const telemetry = getTelemetryState();

  telemetry.push({
    sessionCode,
    type,
    metadata,
    timestamp: new Date().toISOString()
  });

  localStorage.setItem(
    TELEMETRY_KEY,
    JSON.stringify(telemetry)
  );
}

export function getSessionTelemetry(sessionCode) {
  return getTelemetryState().filter(
    event => event.sessionCode === sessionCode
  );
}

export function generateTelemetrySummary(sessionCode) {
  const telemetry = getSessionTelemetry(sessionCode);

  return {
    totalEvents: telemetry.length,
    qrScans: telemetry.filter(e => e.type === 'qr-scan').length,
    pinUnlocks: telemetry.filter(e => e.type === 'pin-unlock').length,
    contradictionsViewed: telemetry.filter(e => e.type === 'contradiction-viewed').length,
    lastEventAt: telemetry.at(-1)?.timestamp || null
  };
}

function getTelemetryState() {
  return JSON.parse(localStorage.getItem(TELEMETRY_KEY) || '[]');
}

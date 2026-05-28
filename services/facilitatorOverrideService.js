const OVERRIDE_KEY = 'meddetectives-facilitator-overrides';

export function createFacilitatorOverride({
  sessionCode,
  type,
  reason,
  initiatedBy
}) {
  const overrides = getOverrides();

  overrides.push({
    sessionCode,
    type,
    reason,
    initiatedBy,
    createdAt: new Date().toISOString()
  });

  localStorage.setItem(
    OVERRIDE_KEY,
    JSON.stringify(overrides)
  );
}

export function getSessionOverrides(sessionCode) {
  return getOverrides().filter(
    override => override.sessionCode === sessionCode
  );
}

function getOverrides() {
  return JSON.parse(localStorage.getItem(OVERRIDE_KEY) || '[]');
}

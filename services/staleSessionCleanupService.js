const SESSION_REGISTRY_KEY = 'meddetectives-live-session-registry';
const MAX_SESSION_AGE_HOURS = 12;

export function cleanupStaleSessions() {
  const sessions = JSON.parse(
    localStorage.getItem(SESSION_REGISTRY_KEY) || '[]'
  );

  const now = Date.now();

  const filtered = sessions.filter(session => {
    const updatedTime = new Date(
      session.recoveredAt || session.createdAt || now
    ).getTime();

    const ageHours = (now - updatedTime) / (1000 * 60 * 60);

    return ageHours < MAX_SESSION_AGE_HOURS;
  });

  localStorage.setItem(
    SESSION_REGISTRY_KEY,
    JSON.stringify(filtered)
  );

  return filtered;
}

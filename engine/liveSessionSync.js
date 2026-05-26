const SESSION_REGISTRY_KEY = 'meddetectives-live-session-registry';
const PARTICIPANT_SESSION_KEY = 'meddetectives-participant-session';

let listeners = [];

export function bindParticipantToSession(sessionCode) {
  const session = getSessionByCode(sessionCode);

  if (!session) return null;

  localStorage.setItem(PARTICIPANT_SESSION_KEY, sessionCode);

  return session;
}

export function getBoundParticipantSession() {
  const sessionCode = localStorage.getItem(PARTICIPANT_SESSION_KEY);

  if (!sessionCode) return null;

  return getSessionByCode(sessionCode);
}

export function getSessionByCode(code) {
  const sessions = JSON.parse(localStorage.getItem(SESSION_REGISTRY_KEY) || '[]');

  return sessions.find(session => session.code === code) || null;
}

export function getParticipantStage() {
  return getBoundParticipantSession()?.stage || 'orientation';
}

export function getParticipantTimerMilliseconds() {
  const session = getBoundParticipantSession();

  if (!session?.startTime) return 0;

  return Date.now() - session.startTime;
}

export function isParticipantSessionActive() {
  return !!getBoundParticipantSession()?.active;
}

export function subscribeToSessionUpdates(callback) {
  listeners.push(callback);
}

window.addEventListener('storage', (event) => {
  if (event.key !== SESSION_REGISTRY_KEY) return;

  const session = getBoundParticipantSession();

  if (!session) return;

  listeners.forEach(listener => listener(session));
});
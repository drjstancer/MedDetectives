const SESSION_REGISTRY_KEY = 'meddetectives-live-session-registry';
const PARTICIPANT_SESSION_KEY = 'meddetectives-participant-session';

let listeners = [];

export function bindParticipantToSession(sessionCode) {
  const normalizedCode = normalizeSessionCode(sessionCode);

  if (!isValidSessionCode(normalizedCode)) {
    return null;
  }

  const existingSession = getSessionByCode(normalizedCode);

  const session = existingSession || createParticipantLocalSession(normalizedCode);

  localStorage.setItem(PARTICIPANT_SESSION_KEY, normalizedCode);

  return session;
}

export function getBoundParticipantSession() {
  const sessionCode = localStorage.getItem(PARTICIPANT_SESSION_KEY);

  if (!sessionCode) return null;

  return getSessionByCode(sessionCode);
}

export function getSessionByCode(code) {
  const sessions = JSON.parse(localStorage.getItem(SESSION_REGISTRY_KEY) || '[]');

  return sessions.find(session => session.code === normalizeSessionCode(code)) || null;
}

export function getParticipantStage() {
  return getBoundParticipantSession()?.stage || 'orientation';
}

export function getParticipantTimerMilliseconds() {
  const session = getBoundParticipantSession();

  if (!session?.startTime) return 0;

  const pausedDuration = session.totalPausedDuration || 0;

  if (!session.active && session.pausedAt) {
    return session.pausedAt - session.startTime - pausedDuration;
  }

  return Date.now() - session.startTime - pausedDuration;
}

export function isParticipantSessionActive() {
  const session = getBoundParticipantSession();

  return session ? session.active !== false : false;
}

export function subscribeToSessionUpdates(callback) {
  listeners.push(callback);
}

function createParticipantLocalSession(code) {
  const sessions = JSON.parse(localStorage.getItem(SESSION_REGISTRY_KEY) || '[]');

  const session = {
    code,
    startTime: Date.now(),
    active: true,
    pausedAt: null,
    totalPausedDuration: 0,
    stage: 'orientation',
    createdAt: new Date().toISOString(),
    source: 'participant-local-fallback'
  };

  sessions.push(session);

  localStorage.setItem(SESSION_REGISTRY_KEY, JSON.stringify(sessions));

  return session;
}

function normalizeSessionCode(code) {
  return String(code || '').trim();
}

function isValidSessionCode(code) {
  return /^\d{4}$/.test(code);
}

window.addEventListener('storage', (event) => {
  if (event.key !== SESSION_REGISTRY_KEY) return;

  const session = getBoundParticipantSession();

  if (!session) return;

  listeners.forEach(listener => listener(session));
});
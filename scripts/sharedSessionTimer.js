const SESSION_REGISTRY_KEY = 'meddetectives-live-session-registry';
const ACTIVE_SESSION_KEY = 'meddetectives-active-session';

const STAGES = [
  'orientation',
  'emerging-contradictions',
  'timeline-instability',
  'emotional-escalation',
  'reflective-synthesis'
];

let interval;

export function initializeSharedSessionTimer(displayElementId) {
  const display = document.getElementById(displayElementId);

  if (!display) return;

  syncDisplay(display);

  clearInterval(interval);

  interval = setInterval(() => {
    syncDisplay(display);
  }, 1000);
}

export function activateSharedSession() {
  const sessions = getRegisteredSessions();

  const session = {
    code: generateSessionCode(),
    startTime: Date.now(),
    active: true,
    stage: STAGES[0],
    createdAt: new Date().toISOString()
  };

  sessions.push(session);

  localStorage.setItem(SESSION_REGISTRY_KEY, JSON.stringify(sessions));
  localStorage.setItem(ACTIVE_SESSION_KEY, session.code);

  return session.code;
}

export function setActiveSession(code) {
  localStorage.setItem(ACTIVE_SESSION_KEY, code);
}

export function getActiveSession() {
  const activeCode = localStorage.getItem(ACTIVE_SESSION_KEY);

  return getRegisteredSessions().find(
    session => session.code === activeCode
  ) || null;
}

export function stopSharedSession() {
  mutateActiveSession(session => {
    session.active = false;
  });
}

export function resetSharedSession() {
  const activeSession = getActiveSession();

  if (!activeSession) return;

  const remainingSessions = getRegisteredSessions().filter(
    session => session.code !== activeSession.code
  );

  localStorage.setItem(
    SESSION_REGISTRY_KEY,
    JSON.stringify(remainingSessions)
  );

  if (remainingSessions.length) {
    localStorage.setItem(
      ACTIVE_SESSION_KEY,
      remainingSessions[0].code
    );
  } else {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
  }
}

export function advanceSharedSessionStage() {
  let nextStage = STAGES[0];

  mutateActiveSession(session => {
    const currentIndex = STAGES.indexOf(session.stage);
    const nextIndex = Math.min(currentIndex + 1, STAGES.length - 1);

    session.stage = STAGES[nextIndex];
    nextStage = session.stage;
  });

  return nextStage;
}

export function getCurrentSharedSessionStage() {
  return getActiveSession()?.stage || STAGES[0];
}

export function getSharedSessionCode() {
  return getActiveSession()?.code || '----';
}

export function getRegisteredSessions() {
  return JSON.parse(
    localStorage.getItem(SESSION_REGISTRY_KEY) || '[]'
  );
}

function mutateActiveSession(mutator) {
  const activeCode = localStorage.getItem(ACTIVE_SESSION_KEY);

  const updatedSessions = getRegisteredSessions().map(session => {
    if (session.code === activeCode) {
      mutator(session);
    }

    return session;
  });

  localStorage.setItem(
    SESSION_REGISTRY_KEY,
    JSON.stringify(updatedSessions)
  );
}

function generateSessionCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function syncDisplay(display) {
  const activeSession = getActiveSession();

  if (!activeSession || !activeSession.startTime) {
    display.textContent = '00:00:00';
    return;
  }

  const elapsed = Math.floor(
    (Date.now() - activeSession.startTime) / 1000
  );

  const hours = String(Math.floor(elapsed / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');

  display.textContent = `${hours}:${minutes}:${seconds}`;
}

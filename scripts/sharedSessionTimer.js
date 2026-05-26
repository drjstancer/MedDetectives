const SESSION_TIMER_KEY = 'meddetectives-live-session-timer';
const SESSION_TIMER_ACTIVE_KEY = 'meddetectives-live-session-active';
const SESSION_ACCESS_CODE_KEY = 'meddetectives-live-session-code';
const SESSION_STAGE_KEY = 'meddetectives-live-session-stage';
const SESSION_REGISTRY_KEY = 'meddetectives-live-session-registry';

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

  window.addEventListener('storage', () => {
    syncDisplay(display);
  });

  if (localStorage.getItem(SESSION_TIMER_ACTIVE_KEY) === 'true') {
    startInterval(display);
  }
}

export function activateSharedSession() {
  const sessionCode = generateSessionCode();

  localStorage.setItem(SESSION_TIMER_KEY, Date.now().toString());
  localStorage.setItem(SESSION_TIMER_ACTIVE_KEY, 'true');
  localStorage.setItem(SESSION_ACCESS_CODE_KEY, sessionCode);
  localStorage.setItem(SESSION_STAGE_KEY, STAGES[0]);

  registerSession(sessionCode);

  return sessionCode;
}

export function stopSharedSession() {
  localStorage.setItem(SESSION_TIMER_ACTIVE_KEY, 'false');
  clearInterval(interval);
}

export function resetSharedSession() {
  localStorage.removeItem(SESSION_TIMER_KEY);
  localStorage.removeItem(SESSION_TIMER_ACTIVE_KEY);
  localStorage.removeItem(SESSION_ACCESS_CODE_KEY);
  localStorage.removeItem(SESSION_STAGE_KEY);

  clearInterval(interval);
}

export function advanceSharedSessionStage() {
  const currentStage = localStorage.getItem(SESSION_STAGE_KEY) || STAGES[0];

  const currentIndex = STAGES.indexOf(currentStage);
  const nextIndex = Math.min(currentIndex + 1, STAGES.length - 1);

  const nextStage = STAGES[nextIndex];

  localStorage.setItem(SESSION_STAGE_KEY, nextStage);

  return nextStage;
}

export function getCurrentSharedSessionStage() {
  return localStorage.getItem(SESSION_STAGE_KEY) || STAGES[0];
}

export function getSharedSessionCode() {
  return localStorage.getItem(SESSION_ACCESS_CODE_KEY) || '----';
}

export function getRegisteredSessions() {
  return JSON.parse(localStorage.getItem(SESSION_REGISTRY_KEY) || '[]');
}

function registerSession(code) {
  const existing = getRegisteredSessions();

  existing.push({
    code,
    createdAt: new Date().toISOString(),
    stage: STAGES[0]
  });

  localStorage.setItem(SESSION_REGISTRY_KEY, JSON.stringify(existing));
}

function generateSessionCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function startInterval(display) {
  clearInterval(interval);

  interval = setInterval(() => {
    syncDisplay(display);
  }, 1000);
}

function syncDisplay(display) {
  const startTime = Number(localStorage.getItem(SESSION_TIMER_KEY));

  if (!startTime) {
    display.textContent = '00:00:00';
    return;
  }

  const elapsed = Math.floor((Date.now() - startTime) / 1000);

  const hours = String(Math.floor(elapsed / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');

  display.textContent = `${hours}:${minutes}:${seconds}`;

  if (localStorage.getItem(SESSION_TIMER_ACTIVE_KEY) === 'true' && !interval) {
    startInterval(display);
  }
}

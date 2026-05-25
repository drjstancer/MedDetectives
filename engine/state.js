const key = 'meddetectives-state';

const defaultState = {
  sessionId: '',
  groupName: '',
  sessionCode: '',
  currentScene: 'activation',
  discoveredClues: [],
  completedChallenges: [],
  unlockedScenes: ['activation'],
  escalationLevel: 0,
  remainingAttempts: 5,
  elapsedMinutes: 0,
  lastEventAt: null
};

export function getState() {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultState));
    return structuredClone(defaultState);
  }
  return JSON.parse(stored);
}

export function updateState(values) {
  const next = {
    ...getState(),
    ...values,
    lastEventAt: new Date().toISOString()
  };
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}

export function resetState() {
  localStorage.setItem(key, JSON.stringify(defaultState));
  return structuredClone(defaultState);
}

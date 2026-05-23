const defaultState = {
  currentScene: 'activation',
  activeScenario: 'case-001',
  groupName: '',
  discoveredClues: [],
  completedChallenges: [],
  unlockedScenes: ['activation'],
  escalationLevel: 0,
  remainingAttempts: 5,
  elapsedMinutes: 0
};

const storageKey = 'meddetectives-state';

export function getState() {
  const storedState = localStorage.getItem(storageKey);

  if (!storedState) {
    localStorage.setItem(storageKey, JSON.stringify(defaultState));
    return defaultState;
  }

  return JSON.parse(storedState);
}

export function updateState(updatedValues) {
  const currentState = getState();

  const nextState = {
    ...currentState,
    ...updatedValues
  };

  localStorage.setItem(storageKey, JSON.stringify(nextState));

  return nextState;
}

export function resetState() {
  localStorage.setItem(storageKey, JSON.stringify(defaultState));
}

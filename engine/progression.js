import { getState, updateState } from './state.js';

export function unlockScene(sceneName) {
  const currentState = getState();

  if (!currentState.unlockedScenes.includes(sceneName)) {
    currentState.unlockedScenes.push(sceneName);
  }

  updateState({
    unlockedScenes: currentState.unlockedScenes
  });
}

export function moveToScene(sceneName) {
  updateState({
    currentScene: sceneName
  });

  window.location.href = `../pages/${sceneName}.html`;
}

export function increaseEscalation() {
  const currentState = getState();

  updateState({
    escalationLevel: currentState.escalationLevel + 1
  });
}

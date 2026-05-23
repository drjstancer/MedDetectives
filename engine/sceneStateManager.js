import { getState, updateState } from './state.js';

export function setSceneState(sceneName) {
  updateState({
    currentScene: sceneName
  });
}

export function getSceneState() {
  const currentState = getState();

  return currentState.currentScene;
}

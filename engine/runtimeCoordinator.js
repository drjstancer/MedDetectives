import { getState } from './state.js';
import { publish } from './eventBus.js';

export function initializeRuntime() {
  const currentState = getState();

  publish('runtimeInitialized', {
    currentScene: currentState.currentScene,
    escalationLevel: currentState.escalationLevel
  });
}

export function synchronizeRuntime(payload) {
  publish('runtimeSynchronized', payload);
}

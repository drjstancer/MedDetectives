import { getState, updateState } from './state.js';
import { publish } from './eventBus.js';

export function escalateScenario(levelIncrease = 1) {
  const currentState = getState();

  const nextLevel = currentState.escalationLevel + levelIncrease;

  updateState({
    escalationLevel: nextLevel
  });

  publish('scenarioEscalated', {
    escalationLevel: nextLevel
  });
}

import { getState, updateState } from './state.js';

export function completeChallenge(challengeId) {
  const currentState = getState();

  if (!currentState.completedChallenges.includes(challengeId)) {
    currentState.completedChallenges.push(challengeId);
  }

  updateState({
    completedChallenges: currentState.completedChallenges
  });
}

export function discoverClue(clueId) {
  const currentState = getState();

  if (!currentState.discoveredClues.includes(clueId)) {
    currentState.discoveredClues.push(clueId);
  }

  updateState({
    discoveredClues: currentState.discoveredClues
  });
}

export function reduceAttempts() {
  const currentState = getState();

  updateState({
    remainingAttempts: currentState.remainingAttempts - 1
  });
}

/**
 * engine/challengeEngine.js — Discovery & Challenge Tracking
 *
 * Records evidence discoveries and challenge completions
 * into session state. Publishes events so the UI and
 * facilitator dashboard stay synchronized.
 *
 * Does NOT contain UI logic — only state mutations and events.
 */

import { getState, updateState } from './state.js';
import { publish } from './eventBus.js';

/**
 * Record a completed challenge by ID.
 * Idempotent — safe to call multiple times.
 */
export function completeChallenge(challengeId) {
  const state = getState();

  if (state.completedChallenges.includes(challengeId)) {
    return; // Already recorded
  }

  const updated = [...state.completedChallenges, challengeId];
  updateState({ completedChallenges: updated });
  publish('challenge:complete', { challengeId });
  console.log(`[Challenge] Completed: ${challengeId}`);
}

/**
 * Record a discovered clue by ID.
 * Idempotent — safe to call multiple times.
 */
export function discoverClue(clueId) {
  const state = getState();

  if (state.discoveredClues.includes(clueId)) {
    return; // Already recorded
  }

  const updated = [...state.discoveredClues, clueId];
  updateState({ discoveredClues: updated });
  publish('discovery:clue-found', { clueId });
  console.log(`[Challenge] Clue discovered: ${clueId}`);
}

/**
 * Returns all clue IDs discovered in this session.
 */
export function getDiscoveredClues() {
  return getState().discoveredClues;
}

/**
 * Returns all completed challenge IDs.
 */
export function getCompletedChallenges() {
  return getState().completedChallenges;
}

/**
 * Decrement remaining attempts (used for incorrect hypothesis submissions).
 * Publishes 'challenge:attempt-used' with remaining count.
 */
export function useAttempt() {
  const state = getState();
  const remaining = Math.max(0, state.remainingAttempts - 1);
  updateState({ remainingAttempts: remaining });
  publish('challenge:attempt-used', { remaining });
  return remaining;
}

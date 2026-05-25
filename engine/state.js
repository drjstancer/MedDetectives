/**
 * engine/state.js — Centralized Session State
 *
 * Single source of truth for the active learning session.
 * Persisted to localStorage so the experience survives page
 * transitions within a session (investigation → interpretation → debrief).
 *
 * State is intentionally flat and minimal.
 * Do not store presentation logic here — only session facts.
 */

const STATE_KEY = 'meddetectives-state';

const DEFAULT_STATE = {
  // Session identity
  groupName: '',
  sessionStarted: false,
  sessionStartTime: null,

  // Learning journey position
  currentStage: 'activation',
  unlockedStages: ['activation'],

  // Scenario
  activeScenario: 'case-001',

  // Discovery tracking
  discoveredClues: [],
  completedChallenges: [],

  // Urgency progression (facilitator-controlled)
  escalationLevel: 0,

  // Attempt tracking
  remainingAttempts: 5,

  // Elapsed time in minutes (updated by timekeeper)
  elapsedMinutes: 0
};

/**
 * Returns the current session state.
 * Initializes from defaults if no state exists.
 */
export function getState() {
  try {
    const stored = localStorage.getItem(STATE_KEY);
    if (!stored) {
      localStorage.setItem(STATE_KEY, JSON.stringify(DEFAULT_STATE));
      return { ...DEFAULT_STATE };
    }
    return JSON.parse(stored);
  } catch (err) {
    console.warn('[State] Could not read state from storage. Using defaults.', err);
    return { ...DEFAULT_STATE };
  }
}

/**
 * Merges partial updates into the current state and persists.
 * Returns the new full state.
 */
export function updateState(partial) {
  try {
    const current = getState();
    const next = { ...current, ...partial };
    localStorage.setItem(STATE_KEY, JSON.stringify(next));
    return next;
  } catch (err) {
    console.error('[State] Could not persist state update.', err);
    return getState();
  }
}

/**
 * Resets state to defaults.
 * Called at the start of each new session.
 */
export function resetState() {
  try {
    const fresh = {
      ...DEFAULT_STATE,
      sessionStartTime: new Date().toISOString()
    };
    localStorage.setItem(STATE_KEY, JSON.stringify(fresh));
    return fresh;
  } catch (err) {
    console.error('[State] Could not reset state.', err);
  }
}

/**
 * Returns a display-safe snapshot (no sensitive fields).
 * Used by facilitator dashboard.
 */
export function getStateSnapshot() {
  const s = getState();
  return {
    groupName: s.groupName,
    currentStage: s.currentStage,
    unlockedStages: s.unlockedStages,
    discoveredClues: s.discoveredClues,
    completedChallenges: s.completedChallenges,
    escalationLevel: s.escalationLevel,
    elapsedMinutes: s.elapsedMinutes,
    remainingAttempts: s.remainingAttempts
  };
}

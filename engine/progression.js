/**
 * engine/progression.js — Learning Journey Progression
 *
 * Manages stage-to-stage advancement through the experience.
 * Controls which stages are unlocked and navigates the group
 * to the correct page when a stage is entered.
 *
 * Stage order:
 *   activation → investigation → interpretation → debrief
 */

import { getState, updateState } from './state.js';
import { publish } from './eventBus.js';

const STAGE_PAGES = {
  activation: '../index.html',
  investigation: './investigation.html',
  interpretation: './interpretation.html',
  debrief: './debrief.html',
  facilitator: './facilitator.html'
};

const STAGE_ORDER = ['activation', 'investigation', 'interpretation', 'debrief'];

/**
 * Unlock a stage so it becomes accessible.
 * Publishes a 'stage:unlocked' event.
 */
export function unlockStage(stageName) {
  const state = getState();

  if (!state.unlockedStages.includes(stageName)) {
    const updated = [...state.unlockedStages, stageName];
    updateState({ unlockedStages: updated });
    publish('stage:unlocked', { stage: stageName });
    console.log(`[Progression] Stage unlocked: ${stageName}`);
  }
}

/**
 * Navigate to a stage by name.
 * Validates the stage is unlocked before allowing navigation.
 * Facilitator can force navigation by passing force=true.
 */
export function moveToStage(stageName, { force = false } = {}) {
  const state = getState();

  if (!force && !state.unlockedStages.includes(stageName)) {
    console.warn(`[Progression] Stage '${stageName}' is not yet unlocked.`);
    return false;
  }

  if (!STAGE_PAGES[stageName]) {
    console.error(`[Progression] Unknown stage: '${stageName}'`);
    return false;
  }

  updateState({ currentStage: stageName });
  publish('stage:entered', { stage: stageName });

  window.location.href = STAGE_PAGES[stageName];
  return true;
}

/**
 * Advance to the next stage in the learning journey.
 * Automatically determines what comes next.
 */
export function advanceToNextStage() {
  const state = getState();
  const currentIndex = STAGE_ORDER.indexOf(state.currentStage);

  if (currentIndex === -1 || currentIndex >= STAGE_ORDER.length - 1) {
    console.warn('[Progression] No next stage available.');
    return false;
  }

  const nextStage = STAGE_ORDER[currentIndex + 1];
  unlockStage(nextStage);
  return moveToStage(nextStage);
}

/**
 * Increase the urgency/escalation level.
 * Typically called by the facilitator dashboard.
 */
export function increaseEscalation() {
  const state = getState();
  const newLevel = Math.min(state.escalationLevel + 1, 3);
  updateState({ escalationLevel: newLevel });
  publish('escalation:triggered', { level: newLevel });
  console.log(`[Progression] Escalation level: ${newLevel}`);
  return newLevel;
}

/**
 * Returns true if the session has met the conditions to advance
 * from investigation to interpretation.
 */
export function canAdvanceFromInvestigation() {
  const state = getState();
  return (
    state.discoveredClues.length >= 3 &&
    state.completedChallenges.includes('timeline-sequence')
  );
}

// Legacy aliases (backwards compatibility during refactor)
export const unlockScene = unlockStage;
export const moveToScene = (name) => moveToStage(name, { force: true });

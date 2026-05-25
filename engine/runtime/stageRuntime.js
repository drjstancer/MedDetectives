import { getState, updateState } from '../state.js';
import { publish } from '../eventBus.js';
import { LearningJourneyEvents } from '../events.js';

async function loadStageDefinition(stageId) {
  const response = await fetch(`../content/stages/${stageId}.json`);

  if (!response.ok) {
    throw new Error(`Unable to load stage definition: ${stageId}`);
  }

  return response.json();
}

export async function getCurrentStageDefinition() {
  const state = getState();
  return loadStageDefinition(state.currentStage);
}

export async function unlockStage(stageId) {
  const state = getState();

  const unlockedStages = [...new Set([
    ...(state.unlockedStages || []),
    stageId
  ])];

  const nextState = updateState({ unlockedStages });

  publish(LearningJourneyEvents.STAGE_UNLOCKED, {
    stageId,
    sessionId: nextState.sessionId
  });

  return nextState;
}

export async function transitionToStage(stageId) {
  const definition = await loadStageDefinition(stageId);

  const nextState = updateState({
    currentStage: stageId
  });

  publish(LearningJourneyEvents.STAGE_TRANSITIONED, {
    stageId,
    title: definition.title,
    sessionId: nextState.sessionId
  });

  return {
    state: nextState,
    stage: definition
  };
}

export async function evaluateStageProgression(stageId) {
  const definition = await loadStageDefinition(stageId);

  const state = getState();

  const discoveries = state.discoveries || [];

  const unlockConditions = definition.unlockConditions || {};

  if (unlockConditions.type === 'discovery-threshold') {
    return discoveries.length >= unlockConditions.minimumDiscoveries;
  }

  return false;
}

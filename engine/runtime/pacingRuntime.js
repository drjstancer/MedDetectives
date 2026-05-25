import { getState, updateState } from '../state.js';

export function evaluateCollaborativeMomentum() {
  const state = getState();

  const discoveries = state.discoveries || [];
  const hypotheses = state.hypotheses || [];
  const reflections = state.reflectionArtifacts || [];

  return {
    discoveryMomentum: discoveries.length,
    synthesisMomentum: hypotheses.length,
    reflectionMomentum: reflections.length,
    suggestedFacilitatorAction: determineFacilitatorAction({
      discoveries,
      hypotheses,
      reflections
    })
  };
}

function determineFacilitatorAction({
  discoveries,
  hypotheses,
  reflections
}) {
  if (discoveries.length > 0 && hypotheses.length === 0) {
    return 'Encourage collaborative interpretation of discovered evidence.';
  }

  if (hypotheses.length > 0 && reflections.length === 0) {
    return 'Introduce reflective discussion around uncertainty and evolving reasoning.';
  }

  if (discoveries.length === 0) {
    return 'Provide gentle guidance toward physical evidence exploration.';
  }

  return 'Continue observing collaborative reasoning progression.';
}

export function recordStageCheckpoint(notes) {
  const state = getState();

  const checkpoints = state.stageCheckpoints || [];

  return updateState({
    stageCheckpoints: [
      ...checkpoints,
      {
        notes,
        currentStage: state.currentStage,
        createdAt: new Date().toISOString()
      }
    ]
  });
}

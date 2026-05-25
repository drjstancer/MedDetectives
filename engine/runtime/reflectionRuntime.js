import { getState, updateState } from '../state.js';
import { publish } from '../eventBus.js';
import { LearningJourneyEvents } from '../events.js';

function createReflectionId() {
  return `reflection-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function recordReflectionArtifact({
  prompt,
  response,
  stageId,
  participantPerspective = 'group'
}) {
  const state = getState();

  const artifacts = state.reflectionArtifacts || [];

  const artifact = {
    id: createReflectionId(),
    prompt,
    response,
    stageId,
    participantPerspective,
    createdAt: new Date().toISOString()
  };

  const nextState = updateState({
    reflectionArtifacts: [...artifacts, artifact]
  });

  publish(LearningJourneyEvents.REFLECTION_PROMPT_TRIGGERED, {
    stageId,
    artifactId: artifact.id,
    sessionId: nextState.sessionId
  });

  return artifact;
}

export function getReflectionSummary() {
  const state = getState();

  return {
    artifactCount: (state.reflectionArtifacts || []).length,
    currentStage: state.currentStage,
    recentReflections: (state.reflectionArtifacts || []).slice(-3)
  };
}

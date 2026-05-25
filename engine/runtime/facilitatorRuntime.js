import { getState, updateState } from '../state.js';
import { publish } from '../eventBus.js';
import { LearningJourneyEvents } from '../events.js';

export function releaseGuidance({
  message,
  type = 'reflection',
  stageId = null
}) {
  const state = getState();

  const guidance = {
    id: crypto.randomUUID(),
    type,
    stageId,
    message,
    releasedAt: new Date().toISOString()
  };

  const history = state.facilitatorGuidanceHistory || [];

  const nextState = updateState({
    facilitatorGuidanceHistory: [...history, guidance]
  });

  publish(LearningJourneyEvents.FACILITATOR_GUIDANCE_RELEASED, guidance);

  return nextState;
}

export function triggerReflectionPrompt(prompt) {
  publish(LearningJourneyEvents.REFLECTION_PROMPT_TRIGGERED, {
    prompt,
    triggeredAt: new Date().toISOString()
  });
}

export function getFacilitatorSnapshot() {
  const state = getState();

  return {
    sessionId: state.sessionId,
    currentStage: state.currentStage,
    discoveryCount: (state.discoveries || []).length,
    evidenceConnections: (state.evidenceConnections || []).length,
    escalationLevel: state.escalationLevel,
    reflectionArtifacts: (state.reflectionArtifacts || []).length
  };
}

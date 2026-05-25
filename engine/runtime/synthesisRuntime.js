import { getState, updateState } from '../state.js';
import { publish } from '../eventBus.js';
import { LearningJourneyEvents } from '../events.js';

function createId() {
  return `hypothesis-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function createHypothesis({
  title,
  rationale,
  supportingEvidence = [],
  conflictingEvidence = [],
  unresolvedQuestions = []
}) {
  const state = getState();

  const hypotheses = state.hypotheses || [];

  const hypothesis = {
    id: createId(),
    title,
    rationale,
    supportingEvidence,
    conflictingEvidence,
    unresolvedQuestions,
    confidenceLevel: 'emerging',
    createdAt: new Date().toISOString()
  };

  const nextState = updateState({
    hypotheses: [...hypotheses, hypothesis]
  });

  publish(LearningJourneyEvents.SYNTHESIS_SUBMITTED, {
    hypothesisId: hypothesis.id,
    sessionId: nextState.sessionId
  });

  return hypothesis;
}

export function reviseHypothesis(hypothesisId, updates) {
  const state = getState();

  const nextHypotheses = (state.hypotheses || []).map((hypothesis) => {
    if (hypothesis.id !== hypothesisId) {
      return hypothesis;
    }

    return {
      ...hypothesis,
      ...updates,
      revisedAt: new Date().toISOString()
    };
  });

  return updateState({
    hypotheses: nextHypotheses
  });
}

export function getSynthesisSnapshot() {
  const state = getState();

  return {
    totalHypotheses: (state.hypotheses || []).length,
    evidenceConnections: (state.evidenceConnections || []).length,
    unresolvedQuestions: (state.hypotheses || [])
      .flatMap((hypothesis) => hypothesis.unresolvedQuestions || [])
      .length
  };
}

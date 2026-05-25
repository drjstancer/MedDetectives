import { getState, updateState } from '../state.js';
import { publish } from '../eventBus.js';
import { LearningJourneyEvents } from '../events.js';

export async function recordDiscovery(discovery) {
  const state = getState();

  const existing = state.discoveries || [];

  const alreadyRecorded = existing.some((item) => item.id === discovery.id);

  if (alreadyRecorded) {
    return state;
  }

  const nextDiscoveries = [
    ...existing,
    {
      ...discovery,
      discoveredAt: new Date().toISOString()
    }
  ];

  const nextState = updateState({
    discoveries: nextDiscoveries
  });

  publish(LearningJourneyEvents.DISCOVERY_RECORDED, {
    discovery,
    sessionId: nextState.sessionId
  });

  return nextState;
}

export function getDiscoveriesByCategory(category) {
  const state = getState();
  return (state.discoveries || []).filter(
    (discovery) => discovery.category === category
  );
}

export function connectEvidence(sourceId, targetId, rationale) {
  const state = getState();

  const evidenceConnections = state.evidenceConnections || [];

  const connection = {
    sourceId,
    targetId,
    rationale,
    connectedAt: new Date().toISOString()
  };

  const nextState = updateState({
    evidenceConnections: [...evidenceConnections, connection]
  });

  publish(LearningJourneyEvents.EVIDENCE_CONNECTED, connection);

  return nextState;
}

import { completeDiscovery } from '../engine/realStageProgression.js';

export function processDiscovery(discoveryKey) {
  const progression = completeDiscovery(discoveryKey);

  if (window.revealDiscovery) {
    window.revealDiscovery(discoveryKey);
  }

  if (window.revealEvidenceRelationships) {
    window.revealEvidenceRelationships(discoveryKey);
  }

  if (window.triggerEnvironmentalShift) {
    window.triggerEnvironmentalShift(progression.currentStage);
  }

  return progression;
}

window.processDiscovery = processDiscovery;

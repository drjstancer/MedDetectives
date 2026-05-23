import { publish } from './eventBus.js';

export function synchronizePhysicalAction(actionData) {
  publish('physicalActionSynchronized', actionData);
}

export function synchronizeEvidence(evidenceData) {
  publish('evidenceSynchronized', evidenceData);
}

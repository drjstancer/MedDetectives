import { unlockContent } from './unlockManager.js';
import { publish } from './eventBus.js';

export function processPhysicalInteraction(interactionData) {
  unlockContent(interactionData.digitalReward);

  publish('physicalInteractionCompleted', {
    interactionId: interactionData.interactionId,
    reward: interactionData.digitalReward
  });
}

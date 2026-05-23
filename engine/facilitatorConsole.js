import { publish } from './eventBus.js';

export function releaseFacilitatorPrompt(promptData) {
  publish('facilitatorPromptReleased', promptData);
}

export function triggerFacilitatorEvent(eventData) {
  publish('facilitatorEventTriggered', eventData);
}

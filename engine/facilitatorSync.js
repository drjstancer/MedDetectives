import { publish } from './eventBus.js';

export function synchronizeFacilitatorAction(actionData) {
  publish('facilitatorActionSynchronized', actionData);
}

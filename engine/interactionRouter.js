import { publish } from './eventBus.js';

export function routeInteraction(interactionType, payload) {
  publish(`interaction:${interactionType}`, payload);
}

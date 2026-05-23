import { publish } from './eventBus.js';

export function revealDiscovery(discoveryData) {
  publish('discoveryRevealed', discoveryData);
}

export function synchronizeDiscoveryTimeline(timelineData) {
  publish('discoveryTimelineSynchronized', timelineData);
}

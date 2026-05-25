import { jordanCarterDiscoveries } from '../content/discoveries/jordanCarterDiscoveries.js';

export function getDiscoveryById(id) {
  return jordanCarterDiscoveries.find(
    (discovery) => discovery.id === id
  );
}

export function getAllDiscoveries() {
  return jordanCarterDiscoveries;
}

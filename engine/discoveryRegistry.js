import discoveries from '../content/discoveries/jordan-carter-discoveries.json' assert { type: 'json' };

export function getDiscoveryById(id) {
  return discoveries.discoveries.find(
    (discovery) => discovery.id === id
  );
}

export function getAllDiscoveries() {
  return discoveries.discoveries;
}

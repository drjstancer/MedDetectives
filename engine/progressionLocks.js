export const progressionLocks = {
  'meddetectives://scenario/jordan-carter/timeline/01': {
    requiredStage: 'stage-01-activation'
  },

  'meddetectives://scenario/jordan-carter/journal/02': {
    requiredStage: 'stage-02-conflicting-narratives'
  },

  'meddetectives://scenario/jordan-carter/escalation/03': {
    requiredStage: 'stage-03-escalation-evidence'
  },

  'meddetectives://scenario/jordan-carter/witness/04': {
    requiredStage: 'stage-02-conflicting-narratives'
  }
};

export function canAccessDiscovery({
  currentStage,
  uri
}) {
  const config = progressionLocks[uri];

  if (!config) {
    return true;
  }

  return currentStage === config.requiredStage;
}

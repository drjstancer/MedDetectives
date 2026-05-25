export const ProgressionMap = {
  'stage-01-activation': {
    requiredDiscoveries: [
      'participant-journal'
    ],
    unlocks: [
      'stage-02-conflicting-narratives'
    ]
  },

  'stage-02-conflicting-narratives': {
    requiredDiscoveries: [
      'timeline-fragment',
      'contradictory-observation'
    ],
    unlocks: [
      'final-synthesis'
    ]
  }
};

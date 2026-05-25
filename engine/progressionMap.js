export const ProgressionMap = {
  'stage-01-activation': {
    requiredDiscoveries: [
      'timeline-fragment'
    ],
    unlocks: [
      'stage-02-conflicting-narratives'
    ]
  },

  'stage-02-conflicting-narratives': {
    requiredDiscoveries: [
      'journal-fragment'
    ],
    unlocks: [
      'stage-03-escalation-evidence'
    ]
  },

  'stage-03-escalation-evidence': {
    requiredDiscoveries: [
      'escalation-evidence'
    ],
    unlocks: [
      'stage-04-collaborative-synthesis'
    ]
  },

  'stage-04-collaborative-synthesis': {
    requiredDiscoveries: [
      'final-reflection'
    ],
    unlocks: []
  }
};

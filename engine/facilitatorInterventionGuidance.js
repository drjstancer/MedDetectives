export const facilitatorInterventionGuidance = {
  overconfident: {
    recommendation: 'Introduce contradiction evidence without directly challenging the team. Let the tension emerge naturally.'
  },

  stalled: {
    recommendation: 'Release subtle interpretive clues that encourage re-engagement without solving the investigation.'
  },

  fragmented: {
    recommendation: 'Encourage collaborative synthesis by redirecting attention toward shared evidence connections.'
  },

  overwhelmed: {
    recommendation: 'Reduce environmental intensity briefly and create reflective processing space.'
  }
};

export function getInterventionGuidance(state) {
  return facilitatorInterventionGuidance[state];
}

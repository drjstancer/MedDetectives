export const investigationCompletionSequence = {
  phaseOne: {
    title: 'Evidence Stabilization',
    narrative: 'The room falls briefly quiet as the final contradictions settle into a coherent investigative picture.'
  },

  phaseTwo: {
    title: 'Interpretation Reflection',
    narrative: 'Teams recognize that certainty shifted repeatedly throughout the investigation.'
  },

  phaseThree: {
    title: 'Collaborative Synthesis',
    narrative: 'Participants prepare to defend not just conclusions, but the reasoning journey that produced them.'
  }
};

export function getCompletionSequence() {
  return investigationCompletionSequence;
}

export const collaborativeTensionMoments = {
  timeline_conflict: {
    prompt: 'Your team now has conflicting interpretations of the timeline. Consensus may require revisiting earlier assumptions.'
  },

  witness_contradiction: {
    prompt: 'Two witness accounts appear emotionally truthful but factually inconsistent.'
  },

  confidence_collapse: {
    prompt: 'A previously trusted interpretation may no longer fit the recovered evidence.'
  }
};

export function getCollaborativeTensionMoment(key) {
  return collaborativeTensionMoments[key];
}

export const branchingConsequences = {
  stress_response: {
    consequence: 'Your team may be overlooking evidence suggesting earlier emotional strain and masking behaviors.'
  },

  physiological_event: {
    consequence: 'Your interpretation may underweight interpersonal and environmental stressors.'
  },

  incomplete_evidence: {
    consequence: 'Your team delayed commitment appropriately, but unresolved ambiguity remains.'
  }
};

export function getBranchingConsequence(key) {
  return branchingConsequences[key];
}

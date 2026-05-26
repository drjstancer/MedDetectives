export const cognitiveBiasMoments = [
  {
    id: 'bias-01',
    bias: 'Anchoring Bias',
    scenario: 'An early witness strongly insists Jordan was simply overwhelmed by stress.',
    educationalPrompt: 'Has your team become overly committed to the first explanation encountered?'
  },
  {
    id: 'bias-02',
    bias: 'Confirmation Bias',
    scenario: 'Teams may selectively prioritize evidence supporting emotional explanations while minimizing physiological findings.',
    educationalPrompt: 'What evidence contradicts your preferred interpretation?'
  },
  {
    id: 'bias-03',
    bias: 'Premature Closure',
    scenario: 'Incomplete evidence may tempt teams to finalize conclusions before evaluating conflicting information.',
    educationalPrompt: 'What uncertainty still remains unresolved?'
  }
];

export function getCognitiveBiasMoments() {
  return cognitiveBiasMoments;
}

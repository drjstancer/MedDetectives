export const finalSynthesisDebriefPrompts = [
  {
    category: 'Assumption Revision',
    prompt: 'Which interpretation changed most dramatically during the investigation, and why?'
  },

  {
    category: 'Evidence Weighting',
    prompt: 'Which physical artifact most significantly shifted your team’s understanding of Jordan’s escalation?'
  },

  {
    category: 'Collaborative Reasoning',
    prompt: 'Where did your team experience disagreement or uncertainty during the investigation?'
  },

  {
    category: 'Interpretation Reflection',
    prompt: 'Which early assumptions proved incomplete or misleading after later discoveries emerged?'
  },

  {
    category: 'Human Complexity',
    prompt: 'What aspects of Jordan’s experience became more emotionally or psychologically complex as evidence accumulated?'
  }
];

export function getFinalDebriefPrompts() {
  return finalSynthesisDebriefPrompts;
}

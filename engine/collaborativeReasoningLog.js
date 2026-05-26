export const collaborativeReasoningPrompts = [
  {
    id: 'log-01',
    category: 'Interpretation Shift',
    prompt: 'What evidence most changed your team\'s interpretation?'
  },
  {
    id: 'log-02',
    category: 'Uncertainty Reflection',
    prompt: 'What important uncertainty still remains unresolved?'
  },
  {
    id: 'log-03',
    category: 'Evidence Evaluation',
    prompt: 'Which evidence currently feels strongest and why?'
  },
  {
    id: 'log-04',
    category: 'Bias Awareness',
    prompt: 'Did your team initially overvalue or undervalue any evidence?'
  }
];

export function getCollaborativeReasoningPrompts() {
  return collaborativeReasoningPrompts;
}

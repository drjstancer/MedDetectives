export const metacognitionPrompts = [
  {
    stage: 'stage-01-activation',
    prompt: 'What assumptions is your team making right now?'
  },
  {
    stage: 'stage-02-conflicting-narratives',
    prompt: 'Which evidence currently feels least reliable?'
  },
  {
    stage: 'stage-03-escalation-evidence',
    prompt: 'What information would most improve your confidence?'
  }
];

export function getPromptForStage(stage) {
  return metacognitionPrompts.find((entry) => entry.stage === stage);
}

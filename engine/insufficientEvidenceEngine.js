export const insufficientEvidenceMoments = [
  {
    stage: 'stage-01-activation',
    message: 'Your team does not yet possess enough evidence to responsibly finalize a conclusion.'
  },
  {
    stage: 'stage-02-conflicting-narratives',
    message: 'Conflicting witness observations require additional evidence before narrowing interpretations.'
  }
];

export function getInsufficientEvidenceMessage(stage) {
  return insufficientEvidenceMoments.find((entry) => entry.stage === stage);
}

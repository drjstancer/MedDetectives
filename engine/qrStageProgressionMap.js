export const qrStageProgressionMap = {
  qr_01: {
    reveal: 'qr_01',
    environmentalShift: 'uncertainty-rise',
    nextStage: 'timeline-conflict'
  },

  timeline_checkpoint: {
    reveal: 'timeline_checkpoint',
    environmentalShift: 'contradiction-detected',
    nextStage: 'hidden-reflection'
  },

  qr_02: {
    reveal: 'qr_02',
    environmentalShift: 'emotional-destabilization',
    nextStage: 'escalation-evidence'
  },

  pin_unlock: {
    reveal: 'pin_unlock',
    environmentalShift: 'confidence-collapse',
    nextStage: 'collaborative-synthesis'
  }
};

export function getStageProgression(key) {
  return qrStageProgressionMap[key];
}

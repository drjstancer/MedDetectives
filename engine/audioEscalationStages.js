export const audioEscalationStages = {
  orientation: {
    recommendation: 'Low ambient investigative room tone with subtle environmental texture.'
  },

  'timeline-conflict': {
    recommendation: 'Introduce low rhythmic tension pulses and distant environmental movement.'
  },

  'hidden-reflection': {
    recommendation: 'Reduce ambient warmth and increase emotional unease through sparse atmospheric layers.'
  },

  'escalation-evidence': {
    recommendation: 'Increase sustained tension texture and intermittent tonal instability.'
  },

  'collaborative-synthesis': {
    recommendation: 'Shift toward reflective emotional resolution while maintaining uncertainty.'
  }
};

export function getAudioEscalation(stage) {
  return audioEscalationStages[stage];
}

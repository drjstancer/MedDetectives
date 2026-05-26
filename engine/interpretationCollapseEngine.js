export const interpretationCollapseEvents = {
  stress_response: {
    trigger: 'timeline_checkpoint',
    collapseMessage: 'Recovered timestamps conflict with the assumption that the escalation emerged suddenly.'
  },

  physiological_event: {
    trigger: 'qr_02',
    collapseMessage: 'New emotional-context evidence complicates a purely physiological interpretation.'
  },

  incomplete_evidence: {
    trigger: 'pin_unlock',
    collapseMessage: 'The investigation now contains enough evidence to require interpretive commitment.'
  }
};

export function getInterpretationCollapse(reasoningKey, triggerKey) {
  const match = interpretationCollapseEvents[reasoningKey];

  if (!match) return null;

  return match.trigger === triggerKey
    ? match.collapseMessage
    : null;
}

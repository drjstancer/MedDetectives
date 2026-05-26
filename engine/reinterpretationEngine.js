export const reinterpretationTriggers = {
  'qr-02': {
    destabilizes: ['stress-overload'],
    message: 'New physiological evidence weakens the assumption that stress alone explains the escalation.'
  },

  'pin-01': {
    destabilizes: ['panic-escalation'],
    message: 'Contradictory witness observations complicate the anxiety-escalation interpretation.'
  }
};

export function getReinterpretationTrigger(discoveryId) {
  return reinterpretationTriggers[discoveryId] || null;
}

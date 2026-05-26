export const urgencyEscalationStages = {
  orientation: {
    banner: 'Initial observations remain incomplete.',
    urgencyLevel: 'low'
  },

  'timeline-conflict': {
    banner: 'Contradictions emerging. Reassess assumptions carefully.',
    urgencyLevel: 'moderate'
  },

  'hidden-reflection': {
    banner: 'New emotional-context evidence destabilizing prior interpretations.',
    urgencyLevel: 'high'
  },

  'escalation-evidence': {
    banner: 'Escalation signals now appear more interconnected than initially believed.',
    urgencyLevel: 'critical'
  },

  'collaborative-synthesis': {
    banner: 'Prepare collaborative interpretation and evidence-supported synthesis.',
    urgencyLevel: 'resolution'
  }
};

export function getUrgencyEscalation(stage) {
  return urgencyEscalationStages[stage];
}

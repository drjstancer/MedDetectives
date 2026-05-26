export const escalationEvents = [
  {
    id: 'escalation-01',
    title: 'Late Witness Clarification',
    description: 'A witness revises their earlier interpretation after reflecting on Jordan\'s visible exhaustion.',
    educationalPurpose: 'Challenges anchoring bias and encourages reinterpretation.'
  },
  {
    id: 'escalation-02',
    title: 'Emerging Physiological Concern',
    description: 'Additional evidence suggests Jordan experienced tremors and dizziness earlier in the day.',
    educationalPurpose: 'Introduces competing physiological explanations.'
  },
  {
    id: 'escalation-03',
    title: 'Conflicting Timeline Artifact',
    description: 'Timestamp discrepancies create uncertainty regarding the escalation sequence.',
    educationalPurpose: 'Encourages temporal reasoning and uncertainty management.'
  }
];

export function getEscalationEvents() {
  return escalationEvents;
}

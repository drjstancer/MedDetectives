export const clinicalIndicators = [
  {
    id: 'indicator-01',
    category: 'Sleep Pattern',
    finding: 'Smartwatch data suggests Jordan averaged 3.8 hours of sleep over 4 consecutive nights.',
    reasoningImpact: 'Supports fatigue-related escalation hypotheses.'
  },
  {
    id: 'indicator-02',
    category: 'Nutrition',
    finding: 'Meal tracking records suggest inconsistent food intake on the day of the incident.',
    reasoningImpact: 'May support blood sugar instability interpretation.'
  },
  {
    id: 'indicator-03',
    category: 'Stress Physiology',
    finding: 'Witness described visible hand tremors and shallow breathing before escalation.',
    reasoningImpact: 'Could indicate anxiety escalation or physiological strain.'
  }
];

export function getClinicalIndicators() {
  return clinicalIndicators;
}

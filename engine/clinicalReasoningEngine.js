export const hypothesisTemplates = [
  {
    id: 'stress-overload',
    title: 'Stress Overload Response',
    confidence: 40,
    supportingEvidence: [],
    contradictingEvidence: []
  },
  {
    id: 'nutrition-imbalance',
    title: 'Nutrition / Blood Sugar Imbalance',
    confidence: 20,
    supportingEvidence: [],
    contradictingEvidence: []
  },
  {
    id: 'sleep-deprivation',
    title: 'Sleep Deprivation Escalation',
    confidence: 15,
    supportingEvidence: [],
    contradictingEvidence: []
  },
  {
    id: 'panic-escalation',
    title: 'Panic / Anxiety Escalation',
    confidence: 25,
    supportingEvidence: [],
    contradictingEvidence: []
  }
];

export const evidenceWeights = {
  'qr-01': 'moderate',
  'qr-02': 'strong',
  'pin-01': 'conflicting'
};

export function getEvidenceWeight(discoveryId) {
  return evidenceWeights[discoveryId] || 'uncertain';
}

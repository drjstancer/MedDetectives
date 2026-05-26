export const hypothesisTemplates = [
  {
    id: 'stress-overload',
    title: 'Stress Overload Response',
    confidence: 40,
    supportingEvidence: [],
    contradictingEvidence: [],
    uncertainty: 'Missing physiological evidence.'
  },
  {
    id: 'nutrition-imbalance',
    title: 'Nutrition / Blood Sugar Imbalance',
    confidence: 20,
    supportingEvidence: [],
    contradictingEvidence: [],
    uncertainty: 'Limited timeline data available.'
  },
  {
    id: 'sleep-deprivation',
    title: 'Sleep Deprivation Escalation',
    confidence: 15,
    supportingEvidence: [],
    contradictingEvidence: [],
    uncertainty: 'Behavioral indicators remain incomplete.'
  },
  {
    id: 'panic-escalation',
    title: 'Panic / Anxiety Escalation',
    confidence: 25,
    supportingEvidence: [],
    contradictingEvidence: [],
    uncertainty: 'Conflicting witness observations exist.'
  }
];

export const evidenceWeights = {
  'qr-01': {
    reliability: 'moderate',
    interpretationRisk: 'anchoring'
  },
  'qr-02': {
    reliability: 'strong',
    interpretationRisk: 'confirmation'
  },
  'pin-01': {
    reliability: 'conflicting',
    interpretationRisk: 'premature-closure'
  }
};

export const reflectivePrompts = [
  'What evidence most changed your thinking?',
  'Which interpretation currently feels weakest?',
  'What assumptions may be shaping your reasoning?',
  'What additional information would improve confidence?'
];

export function getEvidenceWeight(discoveryId) {
  return evidenceWeights[discoveryId] || {
    reliability: 'uncertain',
    interpretationRisk: 'unknown'
  };
}

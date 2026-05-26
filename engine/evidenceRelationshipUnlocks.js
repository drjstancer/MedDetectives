export const evidenceRelationshipUnlocks = {
  qr_01: [
    {
      relationship: 'Emotional Withdrawal ↔ Reduced Participation',
      implication: 'Behavioral changes may have emerged earlier than initially assumed.'
    }
  ],

  timeline_checkpoint: [
    {
      relationship: 'Witness Memory ↔ Timestamp Conflict',
      implication: 'Confidence and accuracy may not align.'
    }
  ],

  qr_02: [
    {
      relationship: 'Performative Wellness ↔ Internal Distress',
      implication: 'Jordan may have masked escalating emotional strain.'
    }
  ],

  pin_unlock: [
    {
      relationship: 'Indirect Outreach ↔ Misinterpreted Signals',
      implication: 'Support attempts may have gone unrecognized.'
    }
  ]
};

export function getEvidenceRelationships(key) {
  return evidenceRelationshipUnlocks[key] || [];
}

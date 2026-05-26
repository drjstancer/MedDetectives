export const physicalEvidenceUnlocks = {
  qr_01: {
    roomAction: 'Recover the witness interpretation envelope hidden beneath the evidence board.',
    escalation: 'Participants now realize emotional withdrawal emerged earlier than assumed.'
  },

  timeline_checkpoint: {
    roomAction: 'Facilitator releases timestamp contradiction packet.',
    escalation: 'Participants must reassess confidence in witness memory.'
  },

  qr_02: {
    roomAction: 'Reveal hidden journal fragment from locked drawer.',
    escalation: 'Interpretations shift from sudden escalation toward accumulating emotional strain.'
  },

  pin_unlock: {
    roomAction: 'Unlock fragmented outreach communications binder.',
    escalation: 'Participants discover indirect requests for support may have been overlooked.'
  }
};

export function getPhysicalEvidenceUnlock(key) {
  return physicalEvidenceUnlocks[key];
}

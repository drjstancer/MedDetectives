export const sessionResetChecklist = {
  evidence: [
    'Restore timeline cards to randomized investigation state.',
    'Return witness packets to original placements.',
    'Reset contradiction envelopes.',
    'Verify hidden artifacts remain concealed.'
  ],

  digital: [
    'Reset QR progression states.',
    'Clear escalation triggers.',
    'Reset session timers.',
    'Clear live facilitator monitoring state.'
  ],

  environment: [
    'Restore orientation lighting.',
    'Reset audio environment.',
    'Clear collaborative synthesis surfaces.',
    'Prepare escalation pacing defaults.'
  ]
};

export function getSessionResetChecklist() {
  return sessionResetChecklist;
}

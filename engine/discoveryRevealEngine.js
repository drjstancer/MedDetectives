export const stagedReveals = {
  qr_01: {
    title: 'Shift in Emotional Presentation',
    type: 'Witness Conflict',
    content: 'Jordan showed subtle emotional withdrawal weeks before the escalation event.'
  },

  timeline_checkpoint: {
    title: 'Timeline Contradiction Detected',
    type: 'Sequence Conflict',
    content: 'Witness memories conflict with timestamp evidence recovered in the room.'
  },

  qr_02: {
    title: 'Hidden Reflection Fragment',
    type: 'Recovered Journal Fragment',
    content: '"I feel like everyone only notices me when I’m useful."'
  },

  pin_unlock: {
    title: 'Escalation Evidence Recovered',
    type: 'Contradictory Communication Evidence',
    content: 'Jordan attempted indirect outreach, but the signals were interpreted differently by different people.'
  }
};

export function getReveal(key) {
  return stagedReveals[key];
}

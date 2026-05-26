export const facilitatorDestabilizationEvents = [
  {
    id: 'memory-conflict',
    title: 'Witness Memory Conflict',
    effect: 'A highly confident witness may have remembered the sequence incorrectly.'
  },

  {
    id: 'timestamp-contradiction',
    title: 'Timestamp Contradiction',
    effect: 'Recovered timestamps conflict with one participant narrative.'
  },

  {
    id: 'overlooked-signal',
    title: 'Overlooked Outreach Signal',
    effect: 'A previously ignored communication attempt changes interpretation of the escalation.'
  }
];

export function getDestabilizationEvents() {
  return facilitatorDestabilizationEvents;
}
